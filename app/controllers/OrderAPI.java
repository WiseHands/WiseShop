package controllers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.liqpay.LiqPay;
import enums.OrderState;
import models.*;
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

    private static final String X_AUTH_TOKEN = "x-auth-token";
    private static final String X_AUTH_USER_ID = "x-auth-user-id";

    private class DeliveryType {
        private static final String NOVAPOSHTA = "NOVAPOSHTA";
        private static final String SELFTAKE = "SELFTAKE";
        private static final String COURIER = "COURIER";
    }

    @Before
    static void interceptAction(){
        corsHeaders();
    }

    static void corsHeaders() {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Expose-Headers", "X-AUTH-TOKEN");
    }

    static void checkAuthentification() {
        boolean authHeadersPopulated = request.headers.get(X_AUTH_TOKEN) != null && request.headers.get(X_AUTH_USER_ID) != null;
        if (authHeadersPopulated){
            String userId = request.headers.get(X_AUTH_USER_ID).value();
            String token = request.headers.get(X_AUTH_TOKEN).value();
            UserDTO user = UserDTO.findById(userId);

            if(user == null)
                forbidden("Invalid X-AUTH-TOKEN: " + token);
        } else {
            forbidden("Empty X-AUTH-TOKEN");
        }
    }

    public static void create(String client) throws ParseException {

        ShopDTO shopDTO = ShopDTO.find("byDomain", client).first();

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
                totalCost += 35;
            }
        }

        System.out.println("TOTAL COST: " + totalCost);

        OrderDTO orderDTO = new OrderDTO(name, phone, address, deliveryType, newPostDepartment, shopDTO);
        System.out.println(orderDTO);
        orderDTO = orderDTO.save();

        List<OrderItemDTO> orders = new ArrayList<OrderItemDTO>();

        for (ListIterator iter = jsonArray.listIterator(); iter.hasNext(); ) {
            JSONObject element = (JSONObject) iter.next();

            ProductDTO productDTO = (ProductDTO) ProductDTO.findById(element.get("uuid"));
            int quantity = Integer.parseInt(element.get("quantity").toString());

            OrderItemDTO orderItemDTO = new OrderItemDTO();
            orderItemDTO.productDTO = productDTO;
            orderItemDTO.quantity = quantity;
            orderItemDTO.save();
            orders.add(orderItemDTO);

            totalCost += productDTO.price * quantity;
        }
        orderDTO.items = orders;
        orderDTO.total = Double.valueOf(totalCost);
        orderDTO.save();



        //LIQPAY:
        HashMap params = new HashMap();
        params.put("action", "pay");
        params.put("amount", orderDTO.total);
        params.put("currency", "UAH");
        params.put("description", "New Payment: " + orderDTO.toString());
        params.put("order_id", orderDTO.uuid);
        LiqPay liqpay = new LiqPay(shopDTO.liqpayPublicKey, shopDTO.liqpayPrivateKey);
        String html = liqpay.cnb_form(params);

        renderHtml(html);
    }

    public static void details(String client, String uuid) throws Exception {
        checkAuthentification();

        OrderDTO orderDTO = OrderDTO.find("byUuid",uuid).first();

        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        String json = gson.toJson(orderDTO);

        renderJSON(json);
    }


    public static void list(String client) throws Exception {
        checkAuthentification();

        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        List<OrderDTO> orderDTOs = OrderDTO.find("byShop", shop).fetch();

        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        String json = gson.toJson(orderDTOs);

        renderJSON(json);
    }


    public static void delete(String client, String uuid) throws Exception {
        checkAuthentification();

        OrderDTO orderDTO = OrderDTO.find("byUuid",uuid).first();
        orderDTO.delete();
        ok();
    }

    public static void markPayed(String client, String uuid) throws Exception {
        checkAuthentification();

        OrderDTO orderDTO = OrderDTO.find("byUuid",uuid).first();
        orderDTO.state = OrderState.PAYED;
        orderDTO.save();

        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        String json = gson.toJson(orderDTO);
        renderJSON(json);
    }

    public static void markShipped(String client, String uuid) throws Exception {
        checkAuthentification();

        OrderDTO orderDTO = OrderDTO.find("byUuid",uuid).first();
        orderDTO.state = OrderState.SHIPPED;
        orderDTO.save();

        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        String json = gson.toJson(orderDTO);
        renderJSON(json);
    }

    public static void markCancelled(String client, String uuid) throws Exception {
        checkAuthentification();

        OrderDTO orderDTO = OrderDTO.find("byUuid",uuid).first();
        orderDTO.state = OrderState.CANCELLED;
        orderDTO.save();

        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        String json = gson.toJson(orderDTO);
        renderJSON(json);
    }

    public static void markReturned(String client, String uuid) throws Exception {
        checkAuthentification();

        OrderDTO orderDTO = OrderDTO.find("byUuid",uuid).first();
        orderDTO.state = OrderState.RETURNED;
        orderDTO.save();

        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        String json = gson.toJson(orderDTO);
        renderJSON(json);
    }

    //TODO: implement
    public static void success(String client, String data) throws ParseException, EmailException {
        final LiqPayLocal liqpay = new LiqPayLocal(PUBLIC_KEY, PRIVATE_KEY);

        String sign = liqpay.strToSign(
                PRIVATE_KEY +
                        data +
                        PRIVATE_KEY
        );

        byte[] decodedBytes = Base64.decodeBase64(data);
        System.out.println("decodedBytes " + new String(decodedBytes));
        System.out.println("\n\n\nPayment received!!!!\n\n\n");
        JSONParser parser = new JSONParser();
        JSONObject jsonObject = (JSONObject) parser.parse(new String(decodedBytes));
        String orderId = String.valueOf(jsonObject.get("order_id"));

        OrderDTO orderDTO = OrderDTO.find("byUuid",orderId).first();
        orderDTO.state  = OrderState.PAYED;
        orderDTO.save();

        SimpleEmail email = new SimpleEmail();
        email.setFrom("bohdaq@gmail.com");
        email.addTo("bohdaq@gmail.com");
        email.setSubject("Нове замовлення");
        email.setMsg("Деталі: " + orderDTO.toString());
        Mail.send(email);

        email = new SimpleEmail();
        email.setFrom("bohdaq@gmail.com");
        email.addTo("sviatoslav.p5@gmail.com");
        email.setSubject("Нове замовлення");
        email.setMsg("Деталі: " + orderDTO.toString());
        Mail.send(email);

        System.out.println("\n\n\nEnd of Payment received!!!!\n\n\n");
        ok();
    }

}
