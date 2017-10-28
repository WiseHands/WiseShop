package controllers;

import enums.OrderState;
import models.*;
import org.apache.commons.codec.binary.Base64;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import services.LiqPayService;
import services.MailSender;

import javax.inject.Inject;

public class BalanceAPI extends AuthController {

    @Inject
    static MailSender mailSender;

    @Inject
    static LiqPayService liqPay;


    public static void getBalance(String client, String email) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        renderJSON(json(shop.balance));
    }

    public static void startPayment(String client, Double amount) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        String userId = request.headers.get(X_AUTH_USER_ID).value();
        UserDTO user = UserDTO.findById(userId);

        BalanceDTO balance = shop.balance;
        BalanceTransactionDTO tx = new BalanceTransactionDTO(amount, user, balance);
        balance.addTransaction(tx);

        tx.save();
        balance.save();

        try {
            String payButton = liqPay.payForService(tx, shop);
            renderHtml(payButton);
        } catch (Exception e) {
            renderHtml("");
        }
    }

    public static void balancePaymentVerification(String client, String data) throws Exception {

        String liqpayResponse = new String(Base64.decodeBase64(data));
        System.out.println("updateBalance LiqPay Response: " + liqpayResponse);

        JSONParser parser = new JSONParser();
        JSONObject jsonObject = (JSONObject) parser.parse(liqpayResponse);

        String balanceTransactionId = String.valueOf(jsonObject.get("order_id"));
        BalanceTransactionDTO balanceTransaction = BalanceTransactionDTO.find("byUuid",balanceTransactionId).first();

        // add to shop.balance.balanc += balanceTransaction.amount;
        if(balanceTransaction == null) {
            ok();
        }

        String status = String.valueOf(jsonObject.get("status"));
        if (status.equals("failure")){
            balanceTransaction.state = OrderState.PAYMENT_ERROR;

            //TODO: replace to success
        } else if (status.equals("wait_accept")) {
            balanceTransaction.balance.balance += balanceTransaction.amount;
            balanceTransaction.state = OrderState.PAYED;
        }
        balanceTransaction.save();
        balanceTransaction.balance.save();
        ok();
    }

}