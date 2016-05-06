package controllers;

import com.liqpay.LiqPay;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.SimpleEmail;
import org.hibernate.criterion.Order;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import play.*;
import play.libs.Mail;
import play.mvc.*;
import org.apache.commons.codec.binary.Base64;

import java.util.*;

import models.*;

public class Application extends Controller {

    private static final String PUBLIC_KEY = Play.configuration.getProperty("liqpay.public.key");
    private static final String PRIVATE_KEY = Play.configuration.getProperty("liqpay.private.key");
    private static final String SANDBOX = Play.configuration.getProperty("liqpay.sandbox");

    private static final Integer FREESHIPPINGMINCOST = 501;


    private class DeliveryType {
        private static final String NOVAPOSHTA = "NOVAPOSHTA";
        private static final String SELFTAKE = "SELFTAKE";
        private static final String COURIER = "COURIER";
    }

    private static final Map<Integer, Integer> priceInfo;
    static
    {
        priceInfo = new HashMap<Integer, Integer>();
        priceInfo.put(1, 60);
        priceInfo.put(2, 7);
        priceInfo.put(3, 50);
        priceInfo.put(4, 50);
        priceInfo.put(5, 50);
        priceInfo.put(6, 50);
        priceInfo.put(7, 50);
        priceInfo.put(8, 50);
        priceInfo.put(9, 6);
        priceInfo.put(10, 50);
    }

    public static void index() {
        render();
    }

    public static void map() {
        render();
    }

    public static void indexRu() {
        render();
    }

    public static void shop() {
        render();
    }

    public static void admin() {
        render();
    }

    public static void success(String data) throws ParseException, EmailException {
        final LiqPayLocal liqpay = new LiqPayLocal(PUBLIC_KEY, PRIVATE_KEY);

        String sign = liqpay.strToSign(
                PRIVATE_KEY +
                        data +
                        PRIVATE_KEY
        );

        byte[] decodedBytes = Base64.decodeBase64(data);
        System.out.println("decodedBytes " + new String(decodedBytes));
        JSONParser parser = new JSONParser();
        JSONObject jsonObject = (JSONObject) parser.parse(new String(decodedBytes));
        Long orderId = Long.parseLong(jsonObject.get("order_id").toString());
        OrderModel orderItem = OrderModel.findById(orderId);
        orderItem.status = "Payment Done";
        //orderItem.save();

        SimpleEmail email = new SimpleEmail();
        email.setFrom("bohdaq@gmail.com");
        email.addTo("bohdaq@gmail.com");
        email.setSubject("Нове замовлення");
        email.setMsg("Order id: " + orderId);
        Mail.send(email);

        email = new SimpleEmail();
        email.setFrom("bohdaq@gmail.com");
        email.addTo("hello@happybag.me");
        email.addTo("sviatoslav.p5@gmail.com");
        email.setSubject("Ваше замовлення успішно оплачено");
        email.setMsg("Order id: " + orderId);
        Mail.send(email);



        System.out.println("\n\n\nApplication.success " + sign);
       ok();
    }
    public static void pay(String deliveryType, String name, String phone, String address) throws ParseException {
        System.out.println(name);
        System.out.println(phone);
        System.out.println(address);

        //TODO: add validation

        JSONParser parser = new JSONParser();
        JSONArray jsonArray = (JSONArray) parser.parse(params.get("body"));

        int totalCost = 0;

        for (ListIterator iter = jsonArray.listIterator(); iter.hasNext(); ) {
            JSONObject element = (JSONObject) iter.next();
//            System.out.println(element.get("productId"));
            int productId = Integer.parseInt(element.get("productId").toString());
            int quantity = Integer.parseInt(element.get("quantity").toString());
            totalCost += priceInfo.get(productId) * quantity;
        }

        if (deliveryType.equals(DeliveryType.NOVAPOSHTA)){
            totalCost += 25;
        } else if (deliveryType.equals(DeliveryType.COURIER)){
            if (totalCost < FREESHIPPINGMINCOST){
                totalCost += 35;
            }
        }

        System.out.println("TOTAL COST: " + totalCost);

        //SAVING ORDER TO DB
        OrderModel orderModel = new OrderModel();
        orderModel.price = totalCost;
        orderModel.name = name;
        orderModel.phone = phone;
        orderModel.address = address;
        orderModel = orderModel.save();

        //LIQPAY:
        HashMap params = new HashMap();
        params.put("version", "3");
        params.put("amount", totalCost);
        params.put("currency", "UAH");
        params.put("description", "sadsad"); //TODO: description
        params.put("order_id", orderModel.id);
        params.put("sandbox", SANDBOX);
        LiqPay liqpay = new LiqPay(PUBLIC_KEY, PRIVATE_KEY);
        String html = liqpay.cnb_form(params);

//        JSONObject response = new JSONObject();
//        response.put("status", "ok");
//        response.put("form", html);

        renderHtml(html);
    }

    public static void email() throws EmailException {
        System.out.println("emailll\n\n\n2");

        SimpleEmail email = new SimpleEmail();
        email.setFrom("bohdaq@gmail.com");
        email.addTo("bohdaq@gmail.com");
        email.setSubject("Нове замовлення");
        email.setMsg("Order id");
        Mail.send(email);
    }

}