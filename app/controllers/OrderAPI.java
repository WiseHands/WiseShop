package controllers;

import enums.OrderState;
import jobs.SendSmsJob;
import models.*;
import org.apache.commons.beanutils.converters.DoubleConverter;
import org.apache.commons.codec.binary.Base64;
import org.joda.time.DateTime;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import play.db.jpa.JPA;
import play.i18n.Lang;
import play.i18n.Messages;
import play.mvc.Http;
import services.*;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

public class OrderAPI extends AuthController {
    private static final String CLASSSNAME = "OrderAPI";
    private  static final Double WISEHANDS_COMISSION = -0.0725;
    private  static final int PAGE_SIZE = 12;

    private class DeliveryType {
        private static final String COURIER = "COURIER";
    }

    static SmsSender smsSender = new SmsSenderImpl();
    static MailSender mailSender = new MailSenderImpl();
    static LiqPayService liqPay = LiqPayServiceImpl.getInstance();

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
        String paymentType = (String) jsonBody.get("paymentType");
        String name = (String) jsonBody.get("name");
        String phone = (String) jsonBody.get("phone");
        String email = (String) jsonBody.get("email");
        String address = (String) jsonBody.get("address");
        String amountTools = (String) jsonBody.get("amountTools");
        String comment = (String) jsonBody.get("comment");
        String couponId = (String) jsonBody.get("coupon");
        String addressLat = (String) jsonBody.get("addressLat");
        String addressLng = (String) jsonBody.get("addressLng");
        System.out.println("\n\n NEW ORDER " +shop.shopName + " \n address lat" + addressLat + "address lng " + addressLng + "\n" + "minimum payment " + shop.paymentSettings.minimumPayment);
        String agent = request.headers.get("user-agent").value();
        Http.Header xforwardedHeader = request.headers.get("x-forwarded-for");
        String ip = "";
        if (xforwardedHeader != null){
            ip = xforwardedHeader.value();
        }
        String newPostDepartment = (String) jsonBody.get("newPostDepartment");
        JSONArray jsonArray = (JSONArray) jsonBody.get("selectedItems");

        Double totalCost = (Double) Double.parseDouble("0");

        OrderDTO order = new OrderDTO(name, phone, email, address, amountTools, deliveryType, paymentType, newPostDepartment, comment, shop, addressLat, addressLng, agent, ip);
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
            orderItem.productUuid = product.uuid;
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
                    totalCost = totalCost + newProperty.additionalPrice;
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
                totalCost = totalCost + delivery.courierPrice;
            }
        }

        CouponId unusedCoupon = null;
        if(couponId != null) {
            System.out.println(CLASSSNAME + " Searching coupon by couponId " + couponId + " in CouponId table");
            List<CouponId> coupons = CouponId.find("byCouponId", couponId).fetch();
            for (CouponId coupon : coupons) {
                if (coupon.used == null || coupon.used == false) {
                    unusedCoupon = coupon;
                    System.out.println(CLASSSNAME +" found unused coupon id:" + unusedCoupon.couponId + ", uuid:" + unusedCoupon.couponUuid);
                    break;
                }
            }
            if(unusedCoupon == null) {
                System.out.println(CLASSSNAME + " coupon not found, is null or used");
            } else {
                CouponPlan couponPlan = CouponPlan.find("byCouponUuid", unusedCoupon.couponUuid).first();
                System.out.println(CLASSSNAME + " searched for CouponPlan, by coupon uuid" + unusedCoupon.couponUuid + couponPlan);
                System.out.println(CLASSSNAME + " select * from CouponPlan where couponUuid = '" + unusedCoupon.couponUuid + "';");
                if(totalCost > couponPlan.minimalOrderTotal) {
                    totalCost = totalCost - totalCost * couponPlan.percentDiscount/100;
                    order.couponId = unusedCoupon.couponId;
                }
            }
        }

        order.total = totalCost;


        boolean isBiggerThanMimimal = true;

        if(shop.paymentSettings.minimumPayment != null) {
            isBiggerThanMimimal = shop.paymentSettings.minimumPayment <= totalCost;
        }

        if(!isBiggerThanMimimal) {
            JSONObject json = new JSONObject();
            json.put("uuid", order.uuid);
            json.put("ok", false);
            json.put("reason", "Total amount is less than minimum order amount");
            System.out.println("isBiggerThanMimimal " + isBiggerThanMimimal + ", !isBiggerThanMimimal is " +!isBiggerThanMimimal);

            error(403, json.toString());
        }

        order = order.save();
        System.out.println(CLASSSNAME + " order saved, total: " + order.total);



        if(unusedCoupon != null) {
            unusedCoupon.used = true;
            unusedCoupon = unusedCoupon.save();
            System.out.println(CLASSSNAME + "  marked as used CouponId: " + unusedCoupon.couponId);
        }


        JPA.em().getTransaction().commit();
        new SendSmsJob(order, shop).now();
        try {
            mailSender.sendEmail(shop, order, Messages.get("new.order"));
        } catch (Exception e) {
            System.out.println("OrderAPI create mail error" + e.getCause() + e.getStackTrace());
        }

        JSONObject json = new JSONObject();
        json.put("uuid", order.uuid);

        try {
            String payButton = liqPay.payButton(order, shop);

            TimeZone timeZone = TimeZone.getTimeZone("GMT-1:00");
            DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm'Z'"); // Quoted "Z" to indicate UTC, no timezone offset
            dateFormat.setTimeZone(timeZone);
            Date newDate = new Date();

            System.out.println("New order " + order.name + ", total " + order.total + ", delivery  " + order.deliveryType + " at " + dateFormat.format(newDate));

            json.put("button", payButton);
            renderJSON(json);
        } catch (Exception e) {
            renderJSON(json);
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
            orders = OrderDTO.find("shop is ?1 and state is not ?2 order by time desc", shop, OrderState.DELETED).fetch(PAGE_SIZE);
        } else {
            int offset = PAGE_SIZE * page;
            orders = OrderDTO.find("shop is ?1 and state is not ?2 order by time desc", shop, OrderState.DELETED).from(offset).fetch(PAGE_SIZE);
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
