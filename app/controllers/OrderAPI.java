package controllers;

import enums.*;
import jobs.SendSmsJob;
import json.shoppingcart.LineItem;
import json.shoppingcart.PaymentCreditCardConfiguration;
import models.*;
import org.apache.commons.codec.binary.Base64;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import play.db.jpa.JPA;
import play.i18n.Lang;
import play.i18n.Messages;
import play.mvc.Http;
import responses.JsonResponse;
import services.*;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

import static util.ShoppingCartUtil._getCartUuid;

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

    private static ShopDTO _getShop(String client) {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        return shop;
    }

    private static void _applyLocale(ShopDTO shop) {
        String locale = "en_US";
        if(shop != null && shop.locale != null) {
            locale = shop.locale;
        }
        Lang.change(locale);
    }

    private static String _getUserIp(){
        String ip = "";
        Http.Header xforwardedHeader = request.headers.get("x-forwarded-for");
        if (xforwardedHeader != null){
            ip = xforwardedHeader.value();
        }
        return ip;
    }

    public static class OrderItemListResult {
        Double total = 0.0;
        List<OrderItemDTO> orderItemList = new ArrayList<OrderItemDTO>();

        public OrderItemListResult(Double totalCost, List<OrderItemDTO> orderItemList) {
            this.total = totalCost;
            this.orderItemList = orderItemList;
        }
    }

    private static OrderItemListResult _parseOrderItemsList(List<LineItem> items, OrderDTO order) {
        List<OrderItemDTO> orderItemList = new ArrayList<OrderItemDTO>();
        Double totalCost = Double.parseDouble("0");
        for (LineItem lineItem : items) {
            OrderItemDTO orderItem = new OrderItemDTO();

            ProductDTO product = ProductDTO.find("byUuid", lineItem.productId).first();
            int quantity = lineItem.quantity;

            orderItem.productUuid = product.uuid;
            orderItem.name = product.name;
            orderItem.description = product.description;
            orderItem.price = product.price;
            orderItem.fileName = product.fileName;
            orderItem.quantity = quantity;
            orderItem.orderUuid = order.uuid;
            orderItem.imagePath = lineItem.imagePath;

            List<AdditionOrderDTO> additionList = new ArrayList<AdditionOrderDTO>();
            for(AdditionLineItemDTO addition : lineItem.additionList){
                AdditionOrderDTO additionOrderDTO = new AdditionOrderDTO();
                additionOrderDTO.title = addition.title;
                additionOrderDTO.price = addition.price;
                additionOrderDTO.quantity = addition.quantity;
                totalCost += additionOrderDTO.price * additionOrderDTO.quantity;
                additionList.add(additionOrderDTO);
            }
            orderItem.additionsList = additionList;


            orderItemList.add(orderItem);
            totalCost += product.price * orderItem.quantity;
        }

        OrderItemListResult result = new OrderItemListResult(totalCost, orderItemList);
        return result;
    }

    public static void create(String client, String chosenLanguage) throws Exception {
        System.out.println("chosenLanguage => " + chosenLanguage);
        ShopDTO shop = _getShop(client);
        _applyLocale(shop);

        String cartId = _getCartUuid(request);
        ShoppingCartDTO shoppingCart = (ShoppingCartDTO) ShoppingCartDTO.find("byUuid", cartId).fetch().get(0);

        String agent = request.headers.get("user-agent").value();
        String ip = _getUserIp();

        Http.Header acceptLanguage = request.headers.get("accept-language");
        String clientLanguage = "";
        if (acceptLanguage != null){
            String acceptLanguageValue = acceptLanguage.value();
            List<Locale.LanguageRange> languageList = Locale.LanguageRange.parse(acceptLanguageValue);

            String languageFromAccept = languageList.get(0).getRange();
            String[] strings = languageFromAccept.split("-");
            clientLanguage = strings[0];

        }

        OrderDTO order = new OrderDTO(shoppingCart, shop, agent, ip);
        order.clientLanguage = clientLanguage;
        order.chosenClientLanguage = chosenLanguage;

        OrderItemListResult orderItemListResult = _parseOrderItemsList(shoppingCart.items, order);
        order.items = orderItemListResult.orderItemList;

        DeliveryDTO delivery = shop.delivery;
        if (shoppingCart.deliveryType.name().equals(DeliveryType.COURIER)){
            if (orderItemListResult.total < delivery.courierFreeDeliveryLimit){
                orderItemListResult.total += delivery.courierPrice;
            }
        }

        order.total = orderItemListResult.total;
        order.paymentState = PaymentState.PENDING;
        order = order.save();

        if (shop.pricingPlan != null){
            Double percentage = order.total * shop.pricingPlan.commissionFee / 100;
            CoinAccountDTO coinAccount = CoinAccountDTO.find("byShop", shop).first();
            if (coinAccount != null) {
                CoinTransactionDTO transaction = new CoinTransactionDTO();
                transaction.type = TransactionType.COMMISSION_FEE;
                transaction.status = TransactionStatus.OK;
                transaction.account = coinAccount;
                transaction.orderUuid = order.uuid;
                transaction.amount = -percentage;
                transaction.time = System.currentTimeMillis() / 1000L;
                coinAccount.addTransaction(transaction);
                coinAccount.balance += transaction.amount;
                transaction.transactionBalance = coinAccount.balance;
                if (coinAccount.balance < 100){
                    sendMessageIfLowBalance(shop);
                }
                transaction.save();
                coinAccount.save();
            }
        }

        boolean isPaymentTypeEqualsCreditCard = order.paymentType.equals(ShoppingCartDTO.PaymentType.CREDITCARD.name());
        Boolean isClientPaysProcessingCommission = shop.paymentSettings.clientPaysProcessingCommission;
        if (isClientPaysProcessingCommission && isPaymentTypeEqualsCreditCard){
            order.total += order.total * PaymentCreditCardConfiguration._paymentComission;
            order.total = Math.round(order.total * 100.0) / 100.0;
        }

        boolean isBiggerThanMimimal = true;
        if(shop.paymentSettings.minimumPayment != null) {
            isBiggerThanMimimal = shop.paymentSettings.minimumPayment <= order.total;
        }

        if(!isBiggerThanMimimal) {
            JSONObject json = new JSONObject();
            json.put("uuid", order.uuid);
            json.put("ok", false);
            json.put("reason", "Total amount is less than minimum order amount");

            error(403, json.toString());
        }
        order.feedbackRequestState = FeedbackRequestState.REQUEST_NOT_SEND;
        order = order.save();
        System.out.println(CLASSSNAME + " order saved, total: " + order.total);

        clearShoppingCart(shoppingCart);
        JPA.em().getTransaction().commit();
        new SendSmsJob(order, shop).now();
        try {
            mailSender.sendEmail(shop, order, Messages.get("new.order"));
        } catch (Exception e) {
            System.out.println("OrderAPI create mail error" + e.getCause() + e.getStackTrace());
        }

        JSONObject json = new JSONObject();
        Boolean isOrderPaidByCreditCart = order.paymentType.equals(ShoppingCartDTO.PaymentType.CREDITCARD.name());
        if(isOrderPaidByCreditCart) {
            try {
                String payButton = liqPay.payButton(order, shop);

                TimeZone timeZone = TimeZone.getTimeZone("GMT-1:00");
                DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm'Z'"); // Quoted "Z" to indicate UTC, no timezone offset
                dateFormat.setTimeZone(timeZone);
                Date newDate = new Date();

                System.out.println("New order by CREDITCARD" + order.name + ", total " + order.total + ", delivery  " + order.deliveryType + " at " + dateFormat.format(newDate));

                json.put("status", "ok");
                json.put("button", payButton);
                // clear cart 1) items 2) ...

                renderJSON(json);
            } catch (Exception e) {
                renderJSON(json);
            }
        } else if(order.paymentType.equals(ShoppingCartDTO.PaymentType.CASHONDELIVERY)){
            json.put("status", "ok");
            renderJSON(json);
        }
    }

    private static void sendMessageIfLowBalance(ShopDTO shop) throws Exception {
        if (shop.locale.equals("uk_UA")){
            Lang.change("uk_UA");
        }
        if (shop.locale.equals("en_US")){
            Lang.change("en_US");
        }
        if (shop.locale.equals("pl_PL")){
            Lang.change("pl_PL");
        }
        for (UserDTO user : shop.userList) {
            smsSender.sendSms(user.phone, Messages.get("balance.transaction.low.shop.balance"));
            mailSender.sendEmailLowShopBalance(shop, Messages.get("balance.transaction.low.shop.balance"));
        }
    }

    static void clearShoppingCart(ShoppingCartDTO shoppingCart){
        shoppingCart.items.clear();

        shoppingCart.clientName = null;
        shoppingCart.clientPhone = null;
        shoppingCart.clientEmail = null;
        shoppingCart.clientComments = null;

        shoppingCart.deliveryType = null;
        shoppingCart.paymentType = null;

        shoppingCart.clientAddressStreetName = null;
        shoppingCart.clientAddressBuildingNumber = null;
        shoppingCart.clientAddressApartmentEntrance = null;
        shoppingCart.clientAddressApartmentEntranceCode = null;
        shoppingCart.clientAddressApartmentFloor = null;
        shoppingCart.clientAddressApartmentNumber = null;

        shoppingCart.clientCity = null;
        shoppingCart.clientPostDepartmentNumber = null;

        shoppingCart.clientAddressStreetLat = null;
        shoppingCart.clientAddressStreetLng = null;
        shoppingCart.clientAddressGpsPointInsideDeliveryBoundaries = null;
        shoppingCart.isAddressSetFromMapView = null;
        shoppingCart.save();
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

    public static void sendFeedbackRequestToClient(String client, String uuid) {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        OrderDTO order = OrderDTO.find("byUuid",uuid).first();
        order.feedbackRequestState = FeedbackRequestState.PENDING_REQUEST;
        order.save();

        Lang.change(order.clientLanguage);
        System.out.println("order.clientLanguage => "+ order.clientLanguage);
        String titleForMail = Messages.get("feedback.email.notification.to.client.leave.feedback", shop.shopName, order.name);

        try {
            mailSender.sendEmailForFeedbackToOrder(shop, order, titleForMail , order.clientLanguage);
            JsonResponse jsonHandle = new JsonResponse(420, "feedback was sent");
            renderJSON(json(jsonHandle));
        } catch (Exception e) {
            e.printStackTrace();
            JsonResponse jsonHandle = new JsonResponse(419, "error sending feedback request");
            renderJSON(json(jsonHandle));
        }

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

        if (shop.pricingPlan != null){
            Double percentage = order.total * shop.pricingPlan.commissionFee / 100;
            CoinAccountDTO coinAccount = CoinAccountDTO.find("byShop", shop).first();
            if (coinAccount != null) {
                CoinTransactionDTO transaction = new CoinTransactionDTO();
                transaction.type = TransactionType.ORDER_CANCELLED;
                transaction.status = TransactionStatus.OK;
                transaction.account = coinAccount;
                transaction.amount = percentage;
                transaction.orderUuid = order.uuid;
                transaction.time = System.currentTimeMillis() / 1000L;

                coinAccount.addTransaction(transaction);
                coinAccount.balance += transaction.amount;
                transaction.transactionBalance = coinAccount.balance;

                transaction.save();
                coinAccount.save();
            }
        }

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
                order.state = OrderState.PAYMENT_ERROR;
                order.paymentState = PaymentState.PAYMENT_ERROR;
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
                order.state = OrderState.PAYED;
                order.paymentState = PaymentState.PAYED;
                order = order.save();

                Double amount = order.total * WISEHANDS_COMISSION;
                BalanceDTO balance = shop.balance;

                BalanceTransactionDTO tx = new BalanceTransactionDTO(amount, order, balance);

                tx.state = OrderState.PAYED;
                tx.save();

                balance.balance += tx.amount;
                balance.addTransaction(tx);
                balance.save();


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
