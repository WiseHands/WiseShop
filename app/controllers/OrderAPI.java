package controllers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.liqpay.LiqPay;
import models.Order;
import models.OrderItem;
import models.Product;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.SimpleEmail;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import play.Play;
import play.libs.Mail;
import play.mvc.Before;
import play.mvc.Controller;

import java.util.*;

public class OrderAPI extends Controller {

    private static final String PUBLIC_KEY = Play.configuration.getProperty("liqpay.public.key");
    private static final String PRIVATE_KEY = Play.configuration.getProperty("liqpay.private.key");

    private static final Integer FREESHIPPINGMINCOST = 501;

    private class DeliveryType {
        private static final String NOVAPOSHTA = "NOVAPOSHTA";
        private static final String SELFTAKE = "SELFTAKE";
        private static final String COURIER = "COURIER";
    }

    @Before
    static void corsHeaders() {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Expose-Headers", "X-AUTH-TOKEN");
    }

    public static void create() throws ParseException {
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

        Order orderDto = new Order();
        orderDto.orders = new ArrayList<OrderItem>();
        orderDto = orderDto.save();

        for (ListIterator iter = jsonArray.listIterator(); iter.hasNext(); ) {
            JSONObject element = (JSONObject) iter.next();

            int productId = Integer.parseInt(element.get("productId").toString());
            Product product = (Product) Product.findById(productId);
            int quantity = Integer.parseInt(element.get("quantity").toString());

            OrderItem orderItem = new OrderItem();
            orderItem.product = product;
            orderItem.quantity = quantity;
            orderItem.order = orderDto;
            orderDto.orders.add(orderItem);

            orderItem.save();

            totalCost += product.price * quantity;
        }

        if (deliveryType.equals(DeliveryType.COURIER)){
            orderDto.deliveryType = DeliveryType.COURIER;
            if (totalCost < FREESHIPPINGMINCOST){
                totalCost += 35;
            }
        } else if(deliveryType.equals(DeliveryType.NOVAPOSHTA)){
            orderDto.deliveryType = DeliveryType.NOVAPOSHTA;
        } else {
            orderDto.deliveryType = DeliveryType.SELFTAKE;
        }

        System.out.println("TOTAL COST: " + totalCost);

        //SAVING ORDER TO DB
        orderDto.total = Double.valueOf(totalCost);
        orderDto.name = name;
        orderDto.phone = phone;
        orderDto.address = address;
        String uuid = UUID.randomUUID().toString();
        orderDto.uuid = uuid;
        orderDto.departmentNumber = newPostDepartment;
        orderDto = orderDto.save();
        System.out.println(orderDto);

        //LIQPAY:
        HashMap params = new HashMap();
        params.put("version", "3");
        params.put("amount", totalCost);
        params.put("currency", "UAH");
        params.put("description", orderDto);
        params.put("order_id", uuid);
        LiqPay liqpay = new LiqPay(PUBLIC_KEY, PRIVATE_KEY);
        String html = liqpay.cnb_form(params);

        renderHtml(html);
    }

    public static void details(String id) throws Exception {
        Order order = Order.find("byUuid",id).first();

        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        String json = gson.toJson(order);

        renderJSON(json);
    }


    public static void list() throws Exception {
        List<Order> orders = Order.findAll();

        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        String json = gson.toJson(orders);

        renderJSON(json);
    }


    public static void delete(String id) throws Exception {
        Order order = Order.find("byUuid",id).first();
        order.delete();
        ok();
    }

    //TODO: implement
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
        long orderId = Long.parseLong(jsonObject.get("order_id").toString());
//        OrderModel orderItem = OrderModel.findById(orderId);
//        orderItem.status = "Payment Done";
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

}