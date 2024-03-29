package controllers;

import emails.MailOrder;
import enums.*;
import jobs.SendSmsJob;
import json.shoppingcart.LineItem;
import json.shoppingcart.PaymentCreditCardConfiguration;
import liqp.Template;
import liqp.filters.Filter;
import models.*;
import org.apache.commons.codec.binary.Base64;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import play.Play;
import play.db.jpa.JPA;
import play.i18n.Lang;
import play.i18n.Messages;
import play.mvc.Http;
import responses.JsonResponse;
import services.*;

import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

import static util.ShoppingCartUtil._getCartUuid;

public class OrderAPI extends AuthController {
    private static final boolean isDevEnv = Boolean.parseBoolean(Play.configuration.getProperty("dev.env"));
    private static final String CLASSSNAME = "OrderAPI";
    private static final Double WISEHANDS_COMISSION = -0.0725;
    private static final int PAGE_SIZE = 12;

    private static class DeliveryType {
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
        Double total = 0D;
        List<OrderItemDTO> orderItemList = new ArrayList<>();

        public OrderItemListResult(Double totalCost, List<OrderItemDTO> orderItemList) {
            this.total = totalCost;
            this.orderItemList = orderItemList;
        }
    }

    private static void productParamsInitialization(OrderDTO order, OrderItemDTO orderItem, ProductDTO product, LineItem lineItem, int quantity) {
        orderItem.productUuid = product.uuid;
        orderItem.name = product.name;
        orderItem.description = product.description;
        orderItem.price = lineItem.price;
        orderItem.fileName = product.fileName;
        orderItem.quantity = quantity;
        orderItem.orderUuid = order.uuid;
        orderItem.imagePath = lineItem.imagePath;
    }

    private static Double createAdditionAndGetAdditionPrice(List<AdditionOrderDTO> additionList, AdditionLineItemDTO addition) {
        AdditionOrderDTO additionOrderDTO = new AdditionOrderDTO();
        additionOrderDTO.title = addition.title;
        additionOrderDTO.price = addition.price;
        additionOrderDTO.quantity = addition.quantity;
        additionList.add(additionOrderDTO);

        return additionOrderDTO.price * additionOrderDTO.quantity;
    }

    private static OrderItemListResult _parseOrderItemsList(List<LineItem> items, OrderDTO order) {
        List<OrderItemDTO> orderItemList = new ArrayList<>();
        Double totalCost = 0D;
        for (LineItem lineItem : items) {
            OrderItemDTO orderItem = new OrderItemDTO();

            ProductDTO product = ProductDTO.find("byUuid", lineItem.productId).first();
            int quantity = lineItem.quantity;

            productParamsInitialization(order, orderItem, product, lineItem, quantity);

            List<AdditionOrderDTO> additionList = new ArrayList<>();
            for (AdditionLineItemDTO addition : lineItem.additionList) {
                totalCost += createAdditionAndGetAdditionPrice(additionList, addition);
            }
            orderItem.additionsList = additionList;
            orderItem.save();
            orderItemList.add(orderItem);
            totalCost += lineItem.price * orderItem.quantity;
        }

        return new OrderItemListResult(totalCost, orderItemList);
    }

    private static String getLanguagePartWithoutLocale(String language) {
        String[] strings = language.split("_");
        return strings[0];
    }

    public static String getTranslatedShopName(ShopDTO shop, String language) {
        List<TranslationItemDTO> translationList;
        if (shop.shopNameTextTranslationBucket != null) {
            translationList = shop.shopNameTextTranslationBucket.translationList;
        } else {
            return shop.shopName;
        }
        TranslationItemDTO adminTranslationItemDTO = translationList.stream().filter(shopTranslate -> shopTranslate.language.equals(language)).collect(Collectors.toList()).get(0);
        if (!translationList.isEmpty() && !adminTranslationItemDTO.content.isEmpty()) {
            return adminTranslationItemDTO.content;
        }
        return shop.shopName;
    }

    public static void create(String client, String chosenLanguage) throws Exception {
        String jsonCart = "";
        if (request.params.get("cart") != null) {
            jsonCart = request.params.get("cart");
        }

        System.out.println("create order with body -> " + jsonCart);
        ShopDTO shop = _getShop(client);
        _applyLocale(shop);

        String cartId = _getCartUuid(request);
        ShoppingCartDTO shoppingCart = (ShoppingCartDTO) ShoppingCartDTO.find("byUuid", cartId).fetch().get(0);

        validationShoppingCart(jsonCart, shoppingCart);

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
        order.save();
        OrderItemListResult orderItemListResult = _parseOrderItemsList(shoppingCart.items, order);
        order.items = orderItemListResult.orderItemList;

        DeliveryDTO delivery = shop.delivery;
        System.out.println("deliveryType in order creating => " + shoppingCart.deliveryType);
        if (shoppingCart.deliveryType != null) {
            if (shoppingCart.deliveryType.name().equals(DeliveryType.COURIER)) {
                if (orderItemListResult.total < delivery.courierFreeDeliveryLimit) {
                    orderItemListResult.total += delivery.courierPrice;
                }
            }
        }

        order.total = orderItemListResult.total;
        if (shop.paymentSettings.additionalPaymentEnabled) {
            order.total += shop.paymentSettings.additionalPaymentPrice;
        }
        order.paymentState = PaymentState.PENDING;

        String qrUuid = request.params.get("qr_uuid");
        System.out.println("qrUuid in order => " + qrUuid);
        if (qrUuid != null && !qrUuid.equals("undefined")) {
            QrDTO qr = QrDTO.findById(qrUuid);
            if (qr != null) {
                order.qrName = qr.name;
            }
        }
        order = order.save();

        if (shop.pricingPlan != null){
            double percentage = order.total * shop.pricingPlan.commissionFee / 100;
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

        int orderListSize = OrderDTO.find("byShop", shop).fetch().size();
        String parsedLanguage = getLanguagePartWithoutLocale(shop.locale);
        String htmlContentForAdmin = generateHtmlEmailForNewOrder(shop, order, parsedLanguage);
        String shopName = getTranslatedShopName(shop, parsedLanguage);
        String adminSubject = Messages.get("mail.label.order") + ' ' + Messages.get("mail.label.number") + orderListSize + ' ' + '|' + ' ' + shopName;
        List<String> adminEmailList = new ArrayList<>();
        adminEmailList.add(shop.contact.email);
        mailSender.sendEmail(adminEmailList, adminSubject, htmlContentForAdmin, shop.domain);

        parsedLanguage = getLanguagePartWithoutLocale(order.chosenClientLanguage);
        String htmlContentForClient = generateHtmlEmailForNewOrder(shop, order, parsedLanguage);
        shopName = getTranslatedShopName(shop, parsedLanguage);
        String clientSubject = Messages.get("mail.label.order") + ' ' + Messages.get("mail.label.number") + orderListSize + ' ' + '|' + ' ' + shopName;
        List<String> clientEmailList = new ArrayList<>();
        clientEmailList.add(MailSenderImpl.validateEmail(order.email, shop.contact.email));
        mailSender.sendEmail(clientEmailList, clientSubject, htmlContentForClient, shop.domain);


        JSONObject json = new JSONObject();
        boolean isOrderPaidByCreditCart = order.paymentType.equals(ShoppingCartDTO.PaymentType.CREDITCARD.name());
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
        } else if(order.paymentType.equals(ShoppingCartDTO.PaymentType.CASHONDELIVERY.toString())){
            json.put("status", "ok");
            renderJSON(json);
        }
    }

    private static void validationShoppingCart(String jsonCart, ShoppingCartDTO shoppingCart) throws ParseException {
        if (jsonCart.isEmpty() || shoppingCart == null) {
            return;
        }
        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(jsonCart);
        if (jsonBody == null) {
            return;
        }
        Set<String> keys = jsonBody.keySet();
        for (String fieldName : keys) {
            switch (fieldName) {
                case "clientName":
                    if (shoppingCart.clientName == null) {
                        shoppingCart.clientName = (String) jsonBody.get("clientName");
                        shoppingCart.save();
                    }
                case "clientEmail":
                    if (shoppingCart.clientEmail == null) {
                        shoppingCart.clientEmail = (String) jsonBody.get("clientEmail");
                        shoppingCart.save();
                    }
                case "clientPhone":
                    if (shoppingCart.clientPhone == null) {
                        shoppingCart.clientPhone = (String) jsonBody.get("clientPhone");
                        shoppingCart.save();
                    }
                case "clientCity":
                    if (shoppingCart.clientCity == null) {
                        shoppingCart.clientCity = (String) jsonBody.get("clientCity");
                        shoppingCart.save();
                    }
                case "clientPostDepartmentNumber":
                    if (shoppingCart.clientPostDepartmentNumber == null) {
                        shoppingCart.clientPostDepartmentNumber = (String) jsonBody.get("clientPostDepartmentNumber");
                        shoppingCart.save();
                    }
                case "deliveryType":
                    if (shoppingCart.deliveryType == null) {
                        shoppingCart.deliveryType = ShoppingCartDTO.DeliveryType.valueOf((String) jsonBody.get("deliveryType"));
                        shoppingCart.save();
                    }
                case "paymentType":
                    if (shoppingCart.paymentType == null) {
                        shoppingCart.paymentType = ShoppingCartDTO.PaymentType.valueOf((String) jsonBody.get("paymentType"));
                        shoppingCart.save();
                    }
            }
        }
//        ArrayList<String> list = new ArrayList<String>(map.keySet());
        System.out.println("validationShoppingCart jsonBody => " + keys);

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
/*        for (UserDTO user : shop.userList) {
            smsSender.sendSms(user.phone, Messages.get("balance.transaction.low.shop.balance"));
        }*/
        smsSender.sendSms(shop.contact.phone, Messages.get("balance.transaction.low.shop.balance"));
        mailSender.sendEmailLowShopBalance(shop, Messages.get("balance.transaction.low.shop.balance"));
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
        checkAuthentication(shop);

        OrderDTO orderDTO = OrderDTO.find("byUuid",uuid).first();

        renderJSON(json(orderDTO));
    }

    public static void list(String client, int page) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
            renderJSON(json(OrderDTO.find("byShop", shop).fetch()));
        }
        checkAuthentication(shop);
        List<OrderDTO> orders;
        if (page == 0) {
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
        checkAuthentication(shop);

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
        checkAuthentication(shop);

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
        checkAuthentication(shop);

        OrderDTO order = OrderDTO.find("byUuid",uuid).first();
        order.feedbackRequestState = FeedbackRequestState.PENDING_REQUEST;
        order.save();

        Lang.change(order.chosenClientLanguage);
        System.out.println("order.chosenClientLanguage => "+ order.chosenClientLanguage);
        int orderListSize = OrderDTO.find("byShop", shop).fetch().size();
        try {

            String htmlContentForClient = generateHtmlEmailForFeedbackToOrder(shop, order, order.chosenClientLanguage);
            String clientSubject = Messages.get("mail.label.order") + ' ' + Messages.get("mail.label.number") + orderListSize + ' ' + '|' + ' ' + shop.shopName;
            List<String> clientEmailList = new ArrayList<>();
            clientEmailList.add(MailSenderImpl.validateEmail(order.email, shop.contact.email));
            mailSender.sendEmail(clientEmailList, clientSubject, htmlContentForClient, shop.domain);

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
        checkAuthentication(shop);

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
            ShopDTO.find("byDomain", "localhost").first();
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

        int orderListSize = OrderDTO.find("byShop", shop).fetch().size();

        String liqpayResponse = new String(Base64.decodeBase64(data));
        System.out.println(liqpayResponse);
        JSONParser parser = new JSONParser();
        JSONObject jsonObject = (JSONObject) parser.parse(liqpayResponse);

        try {
            String orderId = String.valueOf(jsonObject.get("order_id"));

            OrderDTO order = OrderDTO.find("byUuid", orderId).first();
            if (order == null) {
                ok();
            }

            String status = String.valueOf(jsonObject.get("status"));
            if (status.equals("failure")) {
                order.state = OrderState.PAYMENT_ERROR;
                order.paymentState = PaymentState.PAYMENT_ERROR;
                order = order.save();
                String smsText = Messages.get("payment.error.total", order.name, order.total);
                smsSender.sendSms(shop.contact.phone, smsText);
                smsSender.sendSms(order.phone, smsText);

                String parsedLanguage = getLanguagePartWithoutLocale(shop.locale);
                String shopName = getTranslatedShopName(shop, parsedLanguage);
                String subject = Messages.get("mail.label.order") + ' ' + Messages.get("mail.label.number") + orderListSize + ' ' + '|' + ' ' + shopName;
                String htmlContent = generateHtmlEmailForOrderPaymentError(shop, order, parsedLanguage);
                List<String> adminEmailList = new ArrayList<>();
                adminEmailList.add(shop.contact.email);
                mailSender.sendEmail(adminEmailList, subject, htmlContent, shop.domain);
                System.out.println("liqpay message about payment error was sent to: " + shop.contact.email);

                parsedLanguage = getLanguagePartWithoutLocale(order.chosenClientLanguage);
                shopName = getTranslatedShopName(shop, parsedLanguage);
                subject = Messages.get("mail.label.order") + ' ' + Messages.get("mail.label.number") + orderListSize + ' ' + '|' + ' ' + shopName;
                htmlContent = generateHtmlEmailForOrderPaymentError(shop, order, parsedLanguage);
                List<String> clientEmailList = new ArrayList<>();
                clientEmailList.add(MailSenderImpl.validateEmail(order.email, shop.contact.email));
                mailSender.sendEmail(clientEmailList, subject, htmlContent, shop.domain);
                System.out.println("liqpay message about payment error was sent to: " + MailSenderImpl.validateEmail(order.email, shop.contact.email));

                DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
                Date date = new Date();
                System.out.println("LiqPay sent response for order " + order.name + " as " + status + " at " + dateFormat.format(date));

                ok();
            } else if (status.equals("success")) {
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
                smsSender.sendSms(shop.contact.phone, smsText);
                smsSender.sendSms(order.phone, smsText);

                String parsedLanguage = getLanguagePartWithoutLocale(shop.locale);
                String shopName = getTranslatedShopName(shop, parsedLanguage);
                String subject = Messages.get("mail.label.order") + ' ' + Messages.get("mail.label.number") + orderListSize + ' ' + '|' + ' ' + shopName;
                String htmlContent = generateHtmlEmailForOrderPaymentDone(shop, order, parsedLanguage);
                List<String> adminEmailList = new ArrayList<>();
                adminEmailList.add(shop.contact.email);
                mailSender.sendEmail(adminEmailList, subject, htmlContent, shop.domain);
                System.out.println("liqpay message about success payment was sent to: " + shop.contact.email);

                parsedLanguage = getLanguagePartWithoutLocale(order.chosenClientLanguage);
                shopName = getTranslatedShopName(shop, parsedLanguage);
                subject = Messages.get("mail.label.order") + ' ' + Messages.get("mail.label.number") + orderListSize + ' ' + '|' + ' ' + shopName;
                htmlContent = generateHtmlEmailForOrderPaymentDone(shop, order, parsedLanguage);
                List<String> clientEmailList = new ArrayList<>();
                clientEmailList.add(MailSenderImpl.validateEmail(order.email, shop.contact.email));
                mailSender.sendEmail(clientEmailList, subject, htmlContent, shop.domain);
                System.out.println("liqpay message about success payment was sent to: " + MailSenderImpl.validateEmail(order.email, shop.contact.email));

                DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
                Date date = new Date();
                System.out.println("LiqPay sent response for order " + order.name + " as " + status + " at " + dateFormat.format(date));

                ok();
            } else if (status.equals("wait_accept")) {
                order.state = OrderState.PAYMENT_WAIT_ACCEPT;
                order.paymentState = PaymentState.PAYMENT_WAIT_ACCEPT;
                order = order.save();

                Double amount = order.total * WISEHANDS_COMISSION;
                BalanceDTO balance = shop.balance;

                BalanceTransactionDTO tx = new BalanceTransactionDTO(amount, order, balance);

                tx.state = OrderState.PAYMENT_WAIT_ACCEPT;
                tx.save();

                balance.balance += tx.amount;
                balance.addTransaction(tx);
                balance.save();


                String smsTextToAdmin = Messages.get("payment.done.wait.accept.total", order.name, order.total);
                String smsText = Messages.get("payment.done.total", order.name, order.total);

                smsSender.sendSms(shop.contact.phone, smsTextToAdmin);
                smsSender.sendSms(order.phone, smsText);

                String parsedLanguage = getLanguagePartWithoutLocale(shop.locale);
                String shopName = getTranslatedShopName(shop, parsedLanguage);
                String subject = Messages.get("mail.label.order") + ' ' + Messages.get("mail.label.number") + orderListSize + ' ' + '|' + ' ' + shopName;
                String htmlContent = generateHtmlEmailForOrderPaymentWaitAccept(shop, order, parsedLanguage);
                List<String> adminEmailList = new ArrayList<>();
                adminEmailList.add(shop.contact.email);
                mailSender.sendEmail(adminEmailList, subject, htmlContent, shop.domain);
                System.out.println("LiqPay message about payment status was sent to: " + shop.contact.email);

                parsedLanguage = getLanguagePartWithoutLocale(order.chosenClientLanguage);
                shopName = getTranslatedShopName(shop, parsedLanguage);
                subject = Messages.get("mail.label.order") + ' ' + Messages.get("mail.label.number") + orderListSize + ' ' + '|' + ' ' + shopName;
                htmlContent = generateHtmlEmailForOrderPaymentDone(shop, order, parsedLanguage);
                List<String> clientEmailList = new ArrayList<>();
                clientEmailList.add(MailSenderImpl.validateEmail(order.email, shop.contact.email));
                mailSender.sendEmail(clientEmailList, subject, htmlContent, shop.domain);
                System.out.println("LiqPay message about payment status was sent to: " + MailSenderImpl.validateEmail(order.email, shop.contact.email));

                DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
                Date date = new Date();
                System.out.println("LiqPay sent response for order " + order.name + " as " + status + " at " + dateFormat.format(date));

                ok();
            }

        } catch (Exception e) {
            error();
        }


    }
    private static String generateHtmlEmailForOrderPaymentError(ShopDTO shop, OrderDTO order, String changeLanguage) {
        String templateString = MailSenderImpl.readAllBytesJava7("app/emails/email_notification_payment_error.html");
        Template template = Template.parse(templateString);
        Map<String, Object> map = new HashMap<>();

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd.MM.yyyy HH:mm");
        Date resultDate = new Date(order.time);

        Lang.change(changeLanguage);

        String paymentError = Messages.get("payment.error");
        map.put("paymentError", paymentError);
        map.put("shopName", shop.shopName);

        String labelOrderPayment = Messages.get("mail.label.labelOrderPayment");
        map.put("labelOrderPayment", labelOrderPayment);
        String labelPaymentStatus = Messages.get("mail.label.paymentStatus");
        map.put("labelPaymentStatus", labelPaymentStatus);

        return template.render(map);
    }
    private static String generateHtmlEmailForOrderPaymentDone(ShopDTO shop, OrderDTO order, String changeLanguage) {
        String templateString = MailSenderImpl.readAllBytesJava7("app/emails/email_notification_payment_done.html");
        Template template = Template.parse(templateString);
        Map<String, Object> map = new HashMap<>();

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd.MM.yyyy HH:mm");
        Date resultDate = new Date(order.time);

        Lang.change(changeLanguage);

        String paymentDone = Messages.get("payment.done");
        map.put("paymentDone", paymentDone);
        map.put("shopName", shop.shopName);

        String labelOrderPayment = Messages.get("mail.label.labelOrderPayment");
        map.put("labelOrderPayment", labelOrderPayment);
        String labelPaymentStatus = Messages.get("mail.label.paymentStatus");
        map.put("labelPaymentStatus", labelPaymentStatus);

        return template.render(map);
    }
    private static String generateHtmlEmailForOrderPaymentWaitAccept(ShopDTO shop, OrderDTO order, String changeLanguage) {
        String templateString = MailSenderImpl.readAllBytesJava7("app/emails/email_notification_payment_wait_accept.html");
        Template template = Template.parse(templateString);
        Map<String, Object> map = new HashMap<>();

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd.MM.yyyy HH:mm");
        Date resultDate = new Date(order.time);

        Lang.change(changeLanguage);

        String paymentDoneWaitAccept = Messages.get("payment.done.wait.accept");
        map.put("paymentDoneWaitAccept", paymentDoneWaitAccept);
        map.put("shopName", shop.shopName);

        String labelOrderPayment = Messages.get("mail.label.labelOrderPayment");
        map.put("labelOrderPayment", labelOrderPayment);
        String labelPaymentStatus = Messages.get("mail.label.paymentStatus");
        map.put("labelPaymentStatus", labelPaymentStatus);

        return template.render(map);
    }
    private static String generateHtmlEmailForFeedbackToOrder(ShopDTO shop, OrderDTO order, String changeLanguage) {
        String templateString = MailSenderImpl.readAllBytesJava7("app/emails/email_feedback_to_order.html");
        Template template = Template.parse(templateString);
        Map<String, Object> map = new HashMap<>();
        map.put("shopName", shop.shopName);
        map.put("orderUuid", order.uuid);
        String path = shop.domain;
        if(isDevEnv) {
            path = path + ":3334";
        }
        map.put("shopDomain", path);

        Lang.change(changeLanguage);// set user language

        String hiClient = Messages.get("feedback.main.label", order.name);
        map.put("hiClient", hiClient);

        String helpUs = Messages.get("feedback.email.text", shop.shopName);
        map.put("helpUs", helpUs);

        String writeFeedback = Messages.get("feedback.write.feedback");
        map.put("writeFeedback", writeFeedback);

        return template.render(map);

    }
    private static String generateHtmlEmailForNewOrder(ShopDTO shop, OrderDTO order, String language) {

        Filter.registerFilter(new Filter("total"){
            @Override
            public Object apply(Object value, Object... params) {

                DecimalFormat format = new DecimalFormat("0.##");

                return format.format(value);
            }
        });

        String templateString = MailSenderImpl.readAllBytesJava7("app/emails/email_form.html");
        Template template = Template.parse(templateString);
        Map<String, Object> map = new HashMap<>();

        MailOrder mailOrder = new MailOrder(order, shop, getLanguagePartWithoutLocale(language));

        map.put("orderNumber", mailOrder.orderNumber);
        map.put("name", mailOrder.clientName);
        map.put("shopName", mailOrder.shopName);
        map.put("phone", mailOrder.phone);
        map.put("email", mailOrder.email);
        map.put("deliveryType", mailOrder.deliveryType);
        map.put("paymentType", mailOrder.paymentType);
        map.put("clientAddressCity", mailOrder.clientAddressCity);
        map.put("clientAddressStreetName", mailOrder.clientAddressStreetName);
        map.put("clientPostDepartmentNumber", mailOrder.clientPostDepartmentNumber);
        map.put("total", mailOrder.total);
        map.put("uuid", mailOrder.uuid);
        map.put("time", mailOrder.time);
        map.put("comment", mailOrder.comment);
        map.put("orderItems", mailOrder.orderItemList);
        map.put("clientAddressBuildingNumber", mailOrder.clientAddressBuildingNumber);
        map.put("clientAddressApartmentEntrance", mailOrder.clientAddressApartmentEntrance);
        map.put("clientAddressApartmentEntranceCode", mailOrder.clientAddressApartmentEntranceCode);
        map.put("clientAddressApartmentFloor", mailOrder.clientAddressApartmentFloor);
        map.put("clientAddressApartmentNumber", mailOrder.clientAddressApartmentNumber);

        Lang.change(language);

        String labelName = Messages.get("mail.label.name");
        map.put("labelName", labelName);
        String labelPhone = Messages.get("mail.label.phone");
        map.put("labelPhone", labelPhone);
        String labelEmail = Messages.get("mail.label.email");
        map.put("labelEmail", labelEmail);
        String labelDelivery = Messages.get("mail.label.delivery");
        map.put("labelDelivery", labelDelivery);
        String labelAddress = Messages.get("mail.label.address");
        map.put("labelAddress", labelAddress);
        String labelTotal = Messages.get("mail.label.total");
        map.put("labelTotal", labelTotal);
        String labelNewOrder = Messages.get("mail.label.neworder");
        map.put("labelNewOrder", labelNewOrder);
        String labelDetails = Messages.get("mail.label.details");
        map.put("labelDetails", labelDetails);
        String orderLink = String.format("https://%s/admin#/details/%s", shop.domain, order.uuid);
        map.put("orderLink", orderLink);
        String labelComment = Messages.get("mail.label.comment");
        map.put("labelComment", labelComment);
        String labelOrderDetails = Messages.get("mail.label.orderDetails");
        map.put("labelOrderDetails", labelOrderDetails);
        String labelOrderDate = Messages.get("mail.label.labelOrderDate");
        map.put("labelOrderDate", labelOrderDate);
        String labelOrderDelivery = Messages.get("mail.label.labelOrderDelivery");
        map.put("labelOrderDelivery", labelOrderDelivery);
        String labelOrderEntrance = Messages.get("mail.label.labelOrderEntrance");
        map.put("labelOrderEntrance", labelOrderEntrance);
        String labelOrderEntranceCode = Messages.get("mail.label.labelOrderEntranceCode");
        map.put("labelOrderEntranceCode", labelOrderEntranceCode);
        String labelOrderApartmentFloor = Messages.get("mail.label.labelOrderApartmentFloor");
        map.put("labelOrderApartmentFloor", labelOrderApartmentFloor);
        String labelOrderApartmentNumber = Messages.get("mail.label.labelOrderApartmentNumber");
        map.put("labelOrderApartmentNumber", labelOrderApartmentNumber);
        String labelOrderPayment = Messages.get("mail.label.labelOrderPayment");
        map.put("labelOrderPayment", labelOrderPayment);
        String labelPaymentType = Messages.get("mail.label.labelPaymentType");
        map.put("labelPaymentType", labelPaymentType);
        String labelProduct = Messages.get("mail.label.labelProduct");
        map.put("labelProduct", labelProduct);
        String labelProducts = Messages.get("mail.label.labelProducts");
        map.put("labelProducts", labelProducts);
        String labelQuantity = Messages.get("mail.label.labelQuantity");
        map.put("labelQuantity", labelQuantity);
        String labelPrice = Messages.get("mail.label.labelPrice");
        map.put("labelPrice", labelPrice);
        String labelClientPostDepartmentNumber = Messages.get("mail.label.labelClientPostDepartmentNumber");
        map.put("labelClientPostDepartmentNumber", labelClientPostDepartmentNumber);
        String labelClientAddressCity = Messages.get("mail.label.clientAddressCity");
        map.put("labelClientAddressCity", labelClientAddressCity);
        String labelClientAddressStreetName = Messages.get("mail.label.clientAddressStreetName");
        map.put("labelClientAddressStreetName", labelClientAddressStreetName);
        String labelOrder = Messages.get("mail.label.order");
        map.put("labelOrder", labelOrder);
        String labelNumber = Messages.get("mail.label.number");
        map.put("labelNumber", labelNumber);
        String labelClientAddressBuildingNumber = Messages.get("mail.label.ClientAddressBuildingNumber");
        map.put("labelClientAddressBuildingNumber", labelClientAddressBuildingNumber);

        String selfPickupDeliveryType = Messages.get("mail.label.selfPickupDeliveryType");
        map.put("selfPickupDeliveryType", selfPickupDeliveryType);
        String courierDeliveryType = Messages.get("mail.label.courierDeliveryType");
        map.put("courierDeliveryType", courierDeliveryType);
        String postServiceDeliveryType = Messages.get("mail.label.postServiceDeliveryType");
        map.put("postServiceDeliveryType", postServiceDeliveryType);

        String cashOnDeliveryPaymentType = Messages.get("mail.label.cashOnDeliveryPaymentType");
        map.put("cashOnDeliveryPaymentType", cashOnDeliveryPaymentType);
        String creditCardDeliveryPaymentType = Messages.get("mail.label.creditCardDeliveryPaymentType");
        map.put("creditCardDeliveryPaymentType", creditCardDeliveryPaymentType);

        String labelCurrencyUah = Messages.get("mail.label.currency.uah");
        map.put("labelCurrencyUah", labelCurrencyUah);

        return template.render(map);
    }

    final void updateOrder(String uuid) {
//        OrderDTO order = OrderDTO.find('byUuid', uuid);
    }

}
