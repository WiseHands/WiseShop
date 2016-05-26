package controllers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
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
import java.util.UUID;

import java.util.*;

import models.*;

public class Application extends Controller {

    private static final String PUBLIC_KEY = Play.configuration.getProperty("liqpay.public.key");
    private static final String PRIVATE_KEY = Play.configuration.getProperty("liqpay.private.key");
    private static final String SANDBOX = Play.configuration.getProperty("liqpay.sandbox");

    private static final Integer FREESHIPPINGMINCOST = 501;

    private static final String X_AUTH_TOKEN = "fa8426a0-8eaf-4d22-8e13-7c1b16a9370c";


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

    private static final Map<Integer, String> itemNameById;
    static
    {
        itemNameById = new HashMap<Integer, String>();
        itemNameById.put(1, "Шоколадки з передбаченнями «ТОРБА ЩАСТЯ»");
        itemNameById.put(2, "Шоколадка з передбаченням");
        itemNameById.put(3, "Набір шоколадок 7 сторін моєї любові");
        itemNameById.put(4, "Набір шоколадок 7 сторін Любові");
        itemNameById.put(5, "Набір шоколадок БУДДА");
        itemNameById.put(6, "Набір шоколадок DRUZI");
        itemNameById.put(7, "Набір шоколадок Маленький принц");
        itemNameById.put(8, "Набір шоколадок «Мафія»");
        itemNameById.put(9, "Печиво з передбаченням");
        itemNameById.put(10, "ІМБИРКИ ЗІ ЛЬВОВА-печиво з передбаченнями");
    }

    @Before
    static void corsHeaders() {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Expose-Headers", "X-AUTH-TOKEN");
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

    public static void done() {
        render();
    }

    public static void fail() {
        render();
    }

    public static void admin() {
        render();
    }

    public static void login() {
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
    public static void pay() throws ParseException {
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

        OrderDTO orderDto = new OrderDTO();
        orderDto.orders = new ArrayList<OrderItem>();
        orderDto = orderDto.save();

        for (ListIterator iter = jsonArray.listIterator(); iter.hasNext(); ) {
            JSONObject element = (JSONObject) iter.next();

            int productId = Integer.parseInt(element.get("productId").toString());
            String title = itemNameById.get(productId);
            int quantity = Integer.parseInt(element.get("quantity").toString());

            OrderItem orderItem = new OrderItem();
            orderItem.title = title;
            orderItem.quantity = quantity;
            orderItem.order = orderDto;
            orderDto.orders.add(orderItem);

            orderItem.save();

            totalCost += priceInfo.get(productId) * quantity;
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
        params.put("description", orderDto.name);
        params.put("order_id", uuid);
        params.put("sandbox", SANDBOX);
        LiqPay liqpay = new LiqPay(PUBLIC_KEY, PRIVATE_KEY);
        String html = liqpay.cnb_form(params);

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

    public static void orders() throws Exception {
        List<OrderDTO> orders = OrderDTO.findAll();

        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        String json = gson.toJson(orders);

        renderJSON(json);
    }

    public static void order(String id) throws Exception {
        OrderDTO order = OrderDTO.find("byUuid",id).first();

        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        String json = gson.toJson(order);

        renderJSON(json);
    }

    public static void signin(String email, String password) throws Exception {
        String SVYAT = "sviatoslav.p5@gmail.com";
        String BOGDAN = "bohdaq@gmail.com";
        String VOVA = "patlavovach@gmail.com";

        String PASSWORD = "rjylbnth";


        if (email.equals(SVYAT) || email.equals(BOGDAN) || email.equals(VOVA)){
            if (password.equals(PASSWORD)) {
                response.setHeader("X-AUTH-TOKEN", X_AUTH_TOKEN);
                ok();
            }
        }
        forbidden();
    }

}