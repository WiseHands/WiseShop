package controllers;

import enums.OrderState;
import models.*;
import org.apache.commons.codec.binary.Base64;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import services.LiqPayService;
import services.MailSender;
import services.SmsSender;

import javax.inject.Inject;
import java.util.*;

public class OrderAPI extends AuthController {

    private static final Integer FREESHIPPINGMINCOST = 501;
    private static final Integer SHIPPING_COST = 501;

    private class DeliveryType {
        private static final String NOVAPOSHTA = "NOVAPOSHTA";
        private static final String SELFTAKE = "SELFTAKE";
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

        if(shop.liqpayPrivateKey == null) {
            error("no liqpay keys defined");
        }

        //TODO: add validation
        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));
        String deliveryType = (String) jsonBody.get("deliveryType");
        String name = (String) jsonBody.get("name");
        String phone = (String) jsonBody.get("phone");
        String address = (String) jsonBody.get("address");
        String newPostDepartment = (String) jsonBody.get("newPostDepartment");
        JSONArray jsonArray = (JSONArray) jsonBody.get("selectedItems");

        int totalCost = 0;

        if (deliveryType.equals(DeliveryType.COURIER)){
            if (totalCost < FREESHIPPINGMINCOST){
                totalCost += SHIPPING_COST;
            }
        }


        OrderDTO order = new OrderDTO(name, phone, address, deliveryType, newPostDepartment, shop);
        System.out.println(order);
        order = order.save();

        List<OrderItemDTO> orders = new ArrayList<OrderItemDTO>();

        for (ListIterator iter = jsonArray.listIterator(); iter.hasNext(); ) {
            JSONObject element = (JSONObject) iter.next();

            ProductDTO product = ProductDTO.findById(element.get("uuid"));
            int quantity = Integer.parseInt(element.get("quantity").toString());

            OrderItemDTO orderItem = new OrderItemDTO();
            orderItem.productDTO = product;
            orderItem.quantity = quantity;
            orderItem.save();
            orders.add(orderItem);

            totalCost += product.price * quantity;
        }
        order.items = orders;
        order.total = Double.valueOf(totalCost);
        order.save();

        mailSender.sendEmail(shop, order, "Нове замовлення");


        String smsText = "Замовлення (" + order.name + ", сума " + order.total + ") прийнято.";
        smsSender.sendSms(order.phone, smsText);
        for (UserDTO user : shop.userList) {
            smsText = "Нове замовлення " + order.name + ", сума " + order.total;
            smsSender.sendSms(user.phone, smsText);
        }


        String payButton = liqPay.payButton(order, shop);
        renderHtml(payButton);
    }

    public static void details(String client, String uuid) throws Exception {
        checkAuthentification();

        OrderDTO orderDTO = OrderDTO.find("byUuid",uuid).first();

        renderJSON(json(orderDTO));
    }


    public static void list(String client) throws Exception {
        checkAuthentification();

        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        List<OrderDTO> orders = OrderDTO.find("byShop", shop).fetch();

        renderJSON(json(orders));
    }


    public static void delete(String client, String uuid) throws Exception {
        checkAuthentification();

        OrderDTO orderDTO = OrderDTO.find("byUuid",uuid).first();
        orderDTO.delete();
        ok();
    }

    public static void markPayed(String client, String uuid) throws Exception {
        checkAuthentification();

        OrderDTO order = OrderDTO.find("byUuid",uuid).first();
        order.state = OrderState.PAYED;
        order.save();

        renderJSON(json(order));
    }

    public static void markShipped(String client, String uuid) throws Exception {
        checkAuthentification();

        OrderDTO order = OrderDTO.find("byUuid",uuid).first();
        order.state = OrderState.SHIPPED;
        order.save();

        renderJSON(json(order));
    }

    public static void markCancelled(String client, String uuid) throws Exception {
        checkAuthentification();

        OrderDTO order = OrderDTO.find("byUuid",uuid).first();
        order.state = OrderState.CANCELLED;
        order.save();

        renderJSON(json(order));
    }

    public static void markReturned(String client, String uuid) throws Exception {
        checkAuthentification();

        OrderDTO order = OrderDTO.find("byUuid",uuid).first();
        order.state = OrderState.RETURNED;
        order.save();

        renderJSON(json(order));
    }

    public static void success(String client, String data) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();

        String liqpayResponse = new String(Base64.decodeBase64(data));
        System.out.println("LiqPay Response: " + liqpayResponse);

        JSONParser parser = new JSONParser();
        JSONObject jsonObject = (JSONObject) parser.parse(liqpayResponse);

        String orderId = String.valueOf(jsonObject.get("order_id"));

        OrderDTO order = OrderDTO.find("byUuid",orderId).first();
        if(order == null) {
            ok();
        }

        String status = String.valueOf(jsonObject.get("status"));
        if (status.equals("failure")){
            order.state  = OrderState.PAYMENT_ERROR;
            order.save();
            String smsText = "Помилка при оплаті " + order.name + ", сума " + order.total;
            for (UserDTO user : shop.userList) {
                smsSender.sendSms(user.phone, smsText);
            }
            smsSender.sendSms(order.phone, smsText);
            mailSender.sendEmail(shop, order, "Помилка оплати");

            ok();
        } else {
            order.state  = OrderState.PAYED;
            order.save();

            String smsText = "Замовлення " + order.name + " сума " + order.total + " було оплачено";
            smsSender.sendSms(order.phone, smsText);
            for (UserDTO user : shop.userList) {
                smsSender.sendSms(user.phone, smsText);
            }

            mailSender.sendEmail(shop, order, "Замовлення оплачено");

            ok();
        }


    }

}
