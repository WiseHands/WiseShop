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
    private static final Integer SHIPPING_COST = 501;

    private static final String X_AUTH_TOKEN = "x-auth-token";
    private static final String X_AUTH_USER_ID = "x-auth-user-id";

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

    static void checkAuthentification() {
        boolean authHeadersPopulated = request.headers.get(X_AUTH_TOKEN) != null && request.headers.get(X_AUTH_USER_ID) != null;
        if (authHeadersPopulated){
            String userId = request.headers.get(X_AUTH_USER_ID).value();
            String token = request.headers.get(X_AUTH_TOKEN).value();
            UserDTO user = UserDTO.findById(userId);

            if(user == null)
                forbidden("Invalid X-AUTH-USER-ID: " + token);
            if(!user.token.equals(token))
                forbidden("Invalid X-AUTH-TOKEN");
        } else {
            forbidden("Empty X-AUTH-TOKEN");
        }
    }

    public static void create(String client) throws ParseException, EmailException {

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
                totalCost += SHIPPING_COST;
            }
        }


        OrderDTO order = new OrderDTO(name, phone, address, deliveryType, newPostDepartment, shopDTO);
        System.out.println(order);
        order = order.save();

        List<OrderItemDTO> orders = new ArrayList<OrderItemDTO>();

        for (ListIterator iter = jsonArray.listIterator(); iter.hasNext(); ) {
            JSONObject element = (JSONObject) iter.next();

            ProductDTO product = (ProductDTO) ProductDTO.findById(element.get("uuid"));
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

        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        sendEmailAboutNewOrder(shop, order, "");

        //LIQPAY:
        HashMap params = new HashMap();
        params.put("action", "pay");
        params.put("amount", order.total);
        params.put("currency", "UAH");
        params.put("description", order);
        params.put("order_id", order.uuid);
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

    public static void success(String client, String data) throws ParseException, EmailException {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();

        final LiqPayLocal liqpay = new LiqPayLocal(PUBLIC_KEY, PRIVATE_KEY);

        String sign = liqpay.strToSign(
                PRIVATE_KEY +
                        data +
                        PRIVATE_KEY
        );

        String liqpayResponse = new String(Base64.decodeBase64(data));
        System.out.println("LiqPay Response: " + liqpayResponse);

        JSONParser parser = new JSONParser();
        JSONObject jsonObject = (JSONObject) parser.parse(liqpayResponse);

        String orderId = String.valueOf(jsonObject.get("order_id"));

//      {"action":"pay","payment_id":227526513,"status":"failure","err_code":"err_payment","version":3,"type":"buy","paytype":"liqpay","public_key":"i65251982315","acq_id":414963,"order_id":"db608b98569d1c7e01569d23558f002f","liqpay_order_id":"MP0UFZIY1471515262399494","description":"New Payment: Тест\n380630386173\nSELFTAKEЛьвів\n\nhappybag.me\n7.0\nhttp://happybag.me/admin#/details/db608b98569d1c7e01569d23558f002f","sender_phone":"380630386173","sender_first_name":"Bogdan","sender_last_name":"Tsap","sender_card_mask2":"516933*85","sender_card_bank":"pb","sender_card_type":"mc","sender_card_country":804,"ip":"93.75.203.125","amount":7.0,"currency":"UAH","sender_commission":0.0,"receiver_commission":0.19,"agent_commission":0.0,"amount_debit":7.0,"amount_credit":7.0,"commission_debit":0.0,"commission_credit":0.19,"currency_debit":"UAH","currency_credit":"UAH","sender_bonus":0.0,"amount_bonus":0.0,"mpi_eci":"7","is_3ds":false,"create_date":1471515267044,"end_date":1471515267044,"transaction_id":227526513,"code":"err_payment"}

        OrderDTO order = OrderDTO.find("byUuid",orderId).first();

        String status = String.valueOf(jsonObject.get("status"));
        if (status.equals("failure")){
            order.state  = OrderState.PAYMENT_ERROR;
            order.save();
            sendEmailAboutNewOrder(shop, order, "Payment Not Received");
            return;
        }

        order.state  = OrderState.PAYED;
        order.save();
        sendEmailAboutNewOrder(shop, order, "Payment Received");

        ok();
    }

    private static void sendEmailAboutNewOrder(ShopDTO shop, OrderDTO order, String status) throws EmailException {
        SimpleEmail email = new SimpleEmail();
        email.setFrom("bohdaq@gmail.com");
        for (UserDTO user : shop.userList) {
            System.out.println("AddTo: " + user.email);
            email.addTo(user.email);
        }
        email.setSubject("New Order " + status);
        email.setMsg(order.toString());
        Mail.send(email);
    }

}
