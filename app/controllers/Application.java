package controllers;

import com.liqpay.LiqPay;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import play.*;
import play.mvc.*;
import org.apache.commons.codec.binary.Base64;

import java.util.*;

import models.*;

public class Application extends Controller {

    private static final String PUBLIC_KEY = Play.configuration.getProperty("liqpay.public.key");
    private static final String PRIVATE_KEY = Play.configuration.getProperty("liqpay.private.key");

    public static void index() {
        render();
    }
    public static void success(String data) throws ParseException {
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
        Long orderId = (Long) jsonObject.get("order_id");
        Order order = Order.findById(orderId);
        order.payment = "Done";
        order.delivery = "In queue To Cook";

        System.out.println("\n\n\nApplication.success " + sign);
       ok();
    }
    public static void makePaymentForm(String name, String phone, String address, Integer numberOfPortions){
        long timeOfADeal = new Date().getTime();

        Order order = new Order();
        order.name = name;
        order.phone = phone;
        order.address = address;
        order.numOfPortions = numberOfPortions;
        order.payment = "Waiting for payment";
        order.delivery = "Not Started";
        order.time = timeOfADeal;
        order.save();

        HashMap params = new HashMap();
        params.put("version", "3");
        params.put("amount", 99 * order.numOfPortions);
        params.put("currency", "UAH");
        params.put("description", order.name + order.phone + order.address + order.numOfPortions + order.time);
        params.put("order_id", order.getId());
        LiqPay liqpay = new LiqPay(PUBLIC_KEY, PRIVATE_KEY);
        String html = liqpay.cnb_form(params);
        System.out.println(html);
        String json = new JSONObject().put("form", html.replaceAll("\"", "\'")).toString();
        System.out.println(json);
    }

}