package controllers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.liqpay.LiqPay;
import enums.OrderState;
import models.OrderDTO;
import models.OrderItemDTO;
import models.ProductDTO;
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

        if (deliveryType.equals(DeliveryType.COURIER)){
            if (totalCost < FREESHIPPINGMINCOST){
                totalCost += 35;
            }
        }

        System.out.println("TOTAL COST: " + totalCost);

        OrderDTO orderDTO = new OrderDTO(name, phone, address, deliveryType, newPostDepartment);
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
        params.put("version", "3");
        params.put("amount", totalCost);
        params.put("currency", "UAH");
        params.put("description", orderDTO);
        params.put("order_id", orderDTO.uuid);
        LiqPay liqpay = new LiqPay(PUBLIC_KEY, PRIVATE_KEY);
        String html = liqpay.cnb_form(params);

        renderHtml(html);
    }

    public static void details(String uuid) throws Exception {
        OrderDTO orderDTO = OrderDTO.find("byUuid",uuid).first();

        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        String json = gson.toJson(orderDTO);

        renderJSON(json);
    }


    public static void list() throws Exception {
        List<OrderDTO> orderDTOs = OrderDTO.findAll();

        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        String json = gson.toJson(orderDTOs);

        renderJSON(json);
    }


    public static void delete(String uuid) throws Exception {
        OrderDTO orderDTO = OrderDTO.find("byUuid",uuid).first();
        orderDTO.delete();
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
        email.setMsg("Order uuid: " + orderId);
        Mail.send(email);

        System.out.println("\n\n\nEnd of Payment received!!!!\n\n\n");
        ok();
    }

}