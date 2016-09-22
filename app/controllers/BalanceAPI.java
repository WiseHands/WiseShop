package controllers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import enums.OrderState;
import models.*;
import org.apache.commons.codec.binary.Base64;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import play.Play;
import play.mvc.Before;
import play.mvc.Controller;
import services.LiqPayService;
import services.MailSender;

import javax.inject.Inject;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;

public class BalanceAPI extends Controller {
    private static final String X_AUTH_TOKEN = "x-auth-token";
    private static final String X_AUTH_USER_ID = "x-auth-user-id";
    public static final String SERVER_IP = "91.224.11.24";


    @Before
    static void corsHeaders() {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Expose-Headers", X_AUTH_TOKEN);
    }

    @Inject
    static MailSender mailSender;

    @Inject
    static LiqPayService liqPay;


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

    private static String json(Object object){
        response.setHeader("Content-Type", "application/json");
        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        return gson.toJson(object);
    }

    public static void getBalance(String client, String email) throws Exception {
        checkAuthentification();

        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        renderJSON(json(shop.balance));
    }

    public static void startPayment(String client, Double amount) throws Exception {
        checkAuthentification();

        ShopDTO shop = ShopDTO.find("byDomain", client).first();

        BalanceTransactionDTO balanceTransaction = new BalanceTransactionDTO(amount);

        try {
            String payButton = liqPay.payForService(balanceTransaction, shop);
            renderHtml(payButton);
        } catch (Exception e) {
            renderHtml("");
        }
    }

    public static void balancePaymentVerification(String client, String data) throws Exception {
        checkAuthentification();

        String liqpayResponse = new String(Base64.decodeBase64(data));
        System.out.println("updateBalance LiqPay Response: " + liqpayResponse);

        JSONParser parser = new JSONParser();
        JSONObject jsonObject = (JSONObject) parser.parse(liqpayResponse);

        String balanceTransactionId = String.valueOf(jsonObject.get("order_id"));
        BalanceTransactionDTO balanceTransaction = BalanceTransactionDTO.find("byUuid",balanceTransactionId).first();
        if(balanceTransaction == null) {
            ok();
        }

        String status = String.valueOf(jsonObject.get("status"));
        if (status.equals("failure") || status.equals("wait_accept")){
            balanceTransaction.state = OrderState.PAYMENT_ERROR;
        } else {
            balanceTransaction.state = OrderState.PAYED;
        }
        balanceTransaction.save();
        ok();
    }

}