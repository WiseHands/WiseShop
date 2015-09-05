package controllers;

import com.liqpay.LiqPay;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.SimpleEmail;
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

    public static void index() {
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
        orderItem.save();

        SimpleEmail email = new SimpleEmail();
        email.setFrom("bohdaq@gmail.com");
        email.addTo("bohdaq@gmail.com");
        email.setSubject("Нове замовлення");
        email.setMsg("Order id: " + orderId);
        Mail.send(email);

        email = new SimpleEmail();
        email.setFrom("bohdaq@gmail.com");
        email.addTo(orderItem.email);
        email.setSubject("Ваше замовлення успішно оплачено");
        email.setMsg("Order id: " + orderId);
        Mail.send(email);



        System.out.println("\n\n\nApplication.success " + sign);
       ok();
    }
    public static void makePaymentForm(String name, String phone, String address, String email, Integer numberOfPortions){
        long timeOfADeal = new Date().getTime();

        OrderModel orderItem = new OrderModel();
        orderItem.email = email;
        orderItem.name = name;
        orderItem.phone = phone;
        orderItem.address = address;
        orderItem.numOfPortions = numberOfPortions;
        orderItem.status = "Waiting for payment";
        orderItem.time = timeOfADeal;
        orderItem.save();

        HashMap params = new HashMap();
        params.put("version", "3");
        int price = 25 * orderItem.numOfPortions;
        double finalPrice = price + price*0.0275;
        params.put("amount", finalPrice);
        params.put("currency", "UAH");
        params.put("description", orderItem.name + orderItem.phone + orderItem.address + orderItem.numOfPortions + orderItem.time);
        params.put("order_id", orderItem.getId());
        params.put("sandbox", SANDBOX);
        LiqPay liqpay = new LiqPay(PUBLIC_KEY, PRIVATE_KEY);
        String html = liqpay.cnb_form(params);
        System.out.println(html);
        renderHtml(html);
    }

}