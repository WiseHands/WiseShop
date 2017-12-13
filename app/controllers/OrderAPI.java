package controllers;

import enums.OrderState;
import models.*;
import org.apache.commons.codec.binary.Base64;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import play.Play;
import play.db.jpa.JPA;
import play.i18n.Lang;
import play.i18n.Messages;
import play.mvc.Http;
import services.LiqPayService;
import services.MailSender;
import services.SmsSender;
import services.WebPushService;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

public class OrderAPI extends AuthController {
    private  static final Double WISEHANDS_COMISSION = -0.0725;
    private  static final int PAGE_SIZE = 12;

    private class DeliveryType {
        private static final String COURIER = "COURIER";
    }

    @Inject
    static SmsSender smsSender;

    @Inject
    static MailSender mailSender;

    @Inject
    static LiqPayService liqPay;

    public static void create(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }

        String locale = "en_US";
        if(shop != null && shop.locale != null) {
            locale = shop.locale;
        }
        Lang.change(locale);

        //TODO: add validation
        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));
        String deliveryType = (String) jsonBody.get("deliveryType");
        String name = (String) jsonBody.get("name");
        String phone = (String) jsonBody.get("phone");
        String address = (String) jsonBody.get("address");
        String comment = (String) jsonBody.get("comment");
        String couponId = (String) jsonBody.get("coupon");
        String addressLat = (String) jsonBody.get("addressLat");
        String addressLng = (String) jsonBody.get("addressLng");
        String agent = request.headers.get("user-agent").value();
        Http.Header xforwardedHeader = request.headers.get("x-forwarded-for");
        String ip = "";
        if (xforwardedHeader != null){
            ip = xforwardedHeader.value();
        }
        String newPostDepartment = (String) jsonBody.get("newPostDepartment");
        JSONArray jsonArray = (JSONArray) jsonBody.get("selectedItems");

        double totalCost = 0;

        OrderDTO order = new OrderDTO(name, phone, address, deliveryType, newPostDepartment, comment, shop, addressLat, addressLng, agent, ip);
        if(shop.orders == null){
            shop.orders = new ArrayList<OrderDTO>();
        }
        shop.orders.add(order);
        order = order.save();
        shop = shop.save();

        List<OrderItemDTO> orders = new ArrayList<OrderItemDTO>();

        for (ListIterator iter = jsonArray.listIterator(); iter.hasNext(); ) {
            JSONObject element = (JSONObject) iter.next();

            int quantity = Integer.parseInt(element.get("quantity").toString());
            OrderItemDTO orderItem = new OrderItemDTO();
            ProductDTO product = ProductDTO.find("byUuid", element.get("uuid")).first();
            orderItem.orderUuid = order.uuid;
            orderItem.name = product.name;
            orderItem.description = product.description;
            orderItem.price = product.price;
            orderItem.fileName = product.fileName;
            orderItem.quantity = quantity;


            List<PropertyTagDTO> chosenProperties = new ArrayList<PropertyTagDTO>();
            JSONArray properties = (JSONArray) element.get("chosenProperties");
            System.out.println("CHOSEN PROPERTIES" + properties);

            if(properties != null) {
                for (ListIterator iterator = properties.listIterator(); iterator.hasNext(); ) {
                    JSONObject property = (JSONObject) iterator.next();
                    PropertyTagDTO foundProperty = PropertyTagDTO.find("byUuid", property.get("uuid")).first();
                    PropertyTagDTO newProperty = new PropertyTagDTO();
                    newProperty.value = foundProperty.value;
                    newProperty.additionalPrice = foundProperty.additionalPrice;
                    newProperty = newProperty.save();
                    chosenProperties.add(newProperty);
                    totalCost += newProperty.additionalPrice;
                }
                orderItem.tags = chosenProperties;
            }

            orderItem.save();
            orders.add(orderItem);

            totalCost += product.price * orderItem.quantity;
        }
        order.items = orders;

        DeliveryDTO delivery = shop.delivery;
        if (deliveryType.equals(DeliveryType.COURIER)){
            if (totalCost < delivery.courierFreeDeliveryLimit){
                totalCost += delivery.courierPrice;
            }
        }


        if(couponId != null) {
            CouponId coupon = CouponId.find("byCouponId", couponId).first();
            if(coupon == null || (coupon.used != null && coupon.used == true)) {
                System.out.println("coupon is null or used");
            } else {
                CouponDTO couponDTO = CouponDTO.findById(coupon.couponUuid);
                List<CouponPlan> plans = new ArrayList<CouponPlan>();
                for (CouponPlan plan: couponDTO.plans) {
                    if(plan.minimalOrderTotal <= totalCost) {
                        plans.add(plan);
                    }
                }

                CouponPlan correctDiscount = null;
                for (CouponPlan plan : plans) {
                    if (correctDiscount == null) {
                        correctDiscount = plan;
                        continue;
                    }
                    if(plan.minimalOrderTotal > correctDiscount.minimalOrderTotal) {
                        correctDiscount = plan;
                    }
                }
                totalCost = totalCost - totalCost * correctDiscount.percentDiscount/100;
                order.couponId = coupon.couponId;
            }
        }

        order.total = totalCost;
        order = order.save();

        if(couponId != null) {
            CouponId coupon = CouponId.find("byCouponId", couponId).first();
            if(coupon != null) {
                coupon.used = true;
                coupon = coupon.save();
                CouponDTO couponDTO = CouponDTO.findById(coupon.couponUuid);
                couponDTO.couponIds.remove(coupon);
                couponDTO.save();
                coupon.delete();
            }
        }

        final ShopDTO shopLink = shop;
        final OrderDTO orderLink = order;
        new Thread(new Runnable() {
            public void run() {
                try {
                    if (JPA.local.get() == null) {
                        EntityManager em = JPA.newEntityManager();
                        final JPA jpa = new JPA();
                        jpa.entityManager = em;
                        JPA.local.set(jpa);
                    }

                    JPA.em().getTransaction().begin();

                    System.out.println("OrderDTO.find(byUuid" + orderLink.uuid);
                    OrderDTO order = OrderDTO.find("byUuid", orderLink.uuid).first();
                    System.out.println("order" + order.name);

//                    mailSender.sendEmail(shopLink, orderLink, Messages.get("new.order"));

                    String smsText = Messages.get("order.is.processing", order.name, order.total);
                    String response = smsSender.sendSms(order.phone, smsText);

                    JSONParser parser = new JSONParser();
                    JSONObject jsonObject = (JSONObject) parser.parse(response);
                    Object error = jsonObject.get("error");
                    if(error == null) {
                        order.sentToCustomer = true;
                    } else {
                        order.errorReasonSentToCustomer = String.valueOf(error);
                    }
                    order.save();

                    smsText =  Messages.get("new.order.total", orderLink.name, orderLink.total);
                    response = smsSender.sendSms(shopLink.contact.phone, smsText);
                    jsonObject = (JSONObject) parser.parse(response);
                    error = jsonObject.get("error");
                    if(error == null) {
                        order.sentToManager = true;
                    } else {
                        order.errorReasonSentToManager = String.valueOf(error);
                    }
                    order.save();
                    JPA.em().getTransaction().commit();

                } catch (Exception e){
                    System.out.println("OrderAPI async place exception: " + e);
                    e.printStackTrace();
                }
            }
        }).start();


        List<PushSubscription> subscriptions = PushSubscription.find("byShopUuid", shop.uuid).fetch();
        for(PushSubscription subscription: subscriptions) {
            String msg =  Messages.get("new.order.total", orderLink.name, orderLink.total);

            String webpushServiceHost = Play.configuration.getProperty("webpush.service.url");

            final String url = webpushServiceHost + "/notify";
            JSONObject body = new JSONObject();
            body.put("title", shopLink.shopName);
            body.put("message", msg);
            body.put("icon", "/public/shop_logo/" + shopLink.uuid + "/" + shopLink.visualSettingsDTO.shopFavicon);
            body.put("endpoint", subscription.endpoint);
            body.put("publicKey", subscription.p256dhKey);
            body.put("auth", subscription.authKey);

            final String json = body.toJSONString();

            System.out.println(url);
            System.out.println(body.toJSONString());

            new Thread(new Runnable() {
                public void run() {
                    try {
                        WebPushService.post(url, json);
                    } catch (Exception ex) {
                        System.out.println(ex.toString());
                        ex.printStackTrace();
                    }
                }
            }).start();
        }

        try {
            String payButton = liqPay.payButton(order, shop);

            DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
            Date date = new Date();
            System.out.println("New order " + order.name + ", total " + order.total + ", delivery  " + order.deliveryType + " at " + dateFormat.format(date));

            JSONObject json = new JSONObject();
            json.put("uuid", order.uuid);
            json.put("button", payButton);
            renderJSON(json);
        } catch (Exception e) {
            renderHtml("");
        }

    }

    public static void details(String client, String uuid) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        OrderDTO orderDTO = OrderDTO.find("byUuid",uuid).first();

        renderJSON(json(orderDTO));
    }


    public static void list(String client, int page) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
            renderJSON(json(OrderDTO.find("byShop", shop).fetch()));
        }
        checkAuthentification(shop);
        List<OrderDTO> orders = null;
        if(page == 0) {
            orders = OrderDTO.find("shop is ? and state is not ? order by time desc", shop, OrderState.DELETED).fetch(PAGE_SIZE);
        } else {
            int offset = PAGE_SIZE * page;
            orders = OrderDTO.find("shop is ? and state is not ? order by time desc", shop, OrderState.DELETED).from(offset).fetch(PAGE_SIZE);
        }


        renderJSON(json(orders));
    }

    public static void all(String client) throws Exception {
        checkSudoAuthentification();

        List<OrderDTO> orders = OrderDTO.findAll();
        renderJSON(json(orders));
    }

    public static void one(String client, String uuid) throws Exception {
        checkSudoAuthentification();
        OrderDTO orderDTO = OrderDTO.find("byUuid",uuid).first();

        renderJSON(json(orderDTO));
    }


    public static void delete(String client, String uuid) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        OrderDTO order = OrderDTO.find("byUuid",uuid).first();
        order.state = OrderState.DELETED;
        order.save();

        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Date date = new Date();
        System.out.println("User " + loggedInUser.name + " deleted order " + order.name + " at " + dateFormat.format(date));

        ok();
    }

    public static void sudoDelete(String client, String uuid) throws Exception {
        checkSudoAuthentification();

        OrderDTO order = OrderDTO.find("byUuid",uuid).first();
        order.state = OrderState.DELETED;
        order.save();

        ok();
    }

    public static void markShipped(String client, String uuid)  {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        OrderDTO order = OrderDTO.find("byUuid",uuid).first();
        order.state = OrderState.SHIPPED;
        order.save();

        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Date date = new Date();
        System.out.println("User " + loggedInUser.name + " marked order " + order.name + " as SHIPPED at " + dateFormat.format(date));

        BalanceDTO balance = shop.balance;

        Double amount = order.total * WISEHANDS_COMISSION;
        BalanceTransactionDTO tx = new BalanceTransactionDTO(amount, order, balance);

        tx.state = OrderState.SHIPPED;
        tx.save();

        balance.balance += tx.amount;
        balance.addTransaction(tx);
        balance.save();

        System.out.println("Substracting " + tx.amount + " from " + shop.shopName + " due to order[" + order.uuid + "] became SHIPPED");

        renderJSON(json(order));
    }

    public static void markCancelled(String client, String uuid) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        OrderDTO order = OrderDTO.find("byUuid",uuid).first();
        order.state = OrderState.CANCELLED;
        order.save();

        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Date date = new Date();
        System.out.println("User " + loggedInUser.name + " marked order " + order.name + " as CANCELLED at " + dateFormat.format(date));

        renderJSON(json(order));
    }

    public static void manuallyPayed(String client, String uuid) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }

        OrderDTO order = OrderDTO.find("byUuid",uuid).first();
        order.state = OrderState.MANUALLY_PAYED;
        order.save();

        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Date date = new Date();
        System.out.println("User  marked order " + order.name + " as MANUALLY_PAYED at " + dateFormat.format(date));


        renderJSON(json(order));
    }

    // add button i will pay at receiving
    // add NEW or ABSENT product
    public static void success(String client, String data) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }

        String liqpayResponse = new String(Base64.decodeBase64(data));
        System.out.println(liqpayResponse);
        JSONParser parser = new JSONParser();
        JSONObject jsonObject = (JSONObject) parser.parse(liqpayResponse);

        try {


            String orderId = String.valueOf(jsonObject.get("order_id"));

            OrderDTO order = OrderDTO.find("byUuid",orderId).first();
            if(order == null) {
                ok();
            }

            String status = String.valueOf(jsonObject.get("status"));
            if (status.equals("failure") || status.equals("wait_accept")){
                order.state  = OrderState.PAYMENT_ERROR;
                order = order.save();
                String smsText = Messages.get("payment.error.total", order.name, order.total);
                for (UserDTO user : shop.userList) {
                    smsSender.sendSms(user.phone, smsText);
                }
                smsSender.sendSms(order.phone, smsText);
                mailSender.sendEmail(shop, order, Messages.get("payment.error"));

                DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
                Date date = new Date();
                System.out.println("LiqPay sent response for order " + order.name + " as " + status + " at " + dateFormat.format(date));

                ok();
            } else {
                order.state  = OrderState.PAYED;
                order = order.save();

                Double amount = order.total * WISEHANDS_COMISSION;
                BalanceDTO balance = shop.balance;

                BalanceTransactionDTO tx = new BalanceTransactionDTO(amount, order, balance);

                tx.state = OrderState.PAYED;
                tx.save();

                balance.balance += tx.amount;
                balance.addTransaction(tx);
                balance.save();

                System.out.println("Substracting " + tx.amount + " from " + shop.shopName + " due to order[" + order.uuid + "] became " + tx.state);


                String smsText = Messages.get("payment.done.total", order.name, order.total);
                smsSender.sendSms(order.phone, smsText);
                smsSender.sendSms(shop.contact.phone, smsText);

                mailSender.sendEmail(shop, order, Messages.get("payment.done"));

                DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
                Date date = new Date();
                System.out.println("LiqPay sent response for order " + order.name + " as " + status + " at " + dateFormat.format(date));


                ok();
            }

        } catch (Exception e) {
            System.out.println(e);
            error();
        }


    }

    final void updateOrder(String uuid) {
//        OrderDTO order = OrderDTO.find('byUuid', uuid);
    }

}
