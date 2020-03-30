package controllers;

import com.google.gson.annotations.Expose;
import models.UserDTO;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import play.Play;
import play.mvc.results.RenderJson;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.ArrayList;

import static controllers.WizardAPI.getUserIdFromAuthorization;
import static util.HMAC.*;

public class WayForPayAPI extends AuthController {

    static class WayForPayRequestParams{
        @Expose
        String merchantAccount;
        @Expose
        String merchantDomainName;
        @Expose
        String orderReference;
        @Expose
        Long orderDate;
        @Expose
        String amount;
        @Expose
        String currency;
        @Expose
        String productName;
        @Expose
        Integer productCount;
        @Expose
        String productPrice;

        public WayForPayRequestParams(String merchantAccount, String merchantDomainName, String orderReference,
                                      Long orderDate, String amount, String currency,
                                      String productName, Integer productCount, String productPrice,
                                      String signature) {
            this.merchantAccount = merchantAccount;
            this.merchantDomainName = merchantDomainName;
            this.orderReference = orderReference;
            this.orderDate = orderDate;
            this.amount = amount;
            this.currency = currency;
            this.productName = productName;
            this.productCount = productCount;
            this.productPrice = productPrice;
            this.signature = signature;
        }

        @Expose
        String signature;


    }

    static String merchantAccount = "wisehands_me";
    static String merchantDomainName = "wisehands.me";
    static String currency = "UAH";
    private static DecimalFormat decimalFormat = new DecimalFormat("#.##");


    public static void verifyCallback(String client) throws Exception{
        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));
        System.out.println("verify way for pay callback jsonBody: " + jsonBody);
    }

    public static String formatDecimal(Double amount) {
        return String.format("%.2f", amount); // dj_segfault
    }

    public static void generateSignatureWayForPay(String client) throws Exception{

        String authorizationHeader = request.headers.get("authorization").value();
        String userId = getUserIdFromAuthorization(authorizationHeader);

        UserDTO user = UserDTO.find("byUuid", userId).first();
        String orderReference = user.uuid;

        String productName = "Поповнення власного рахунку " + user.uuid;
        Double amount = Double.valueOf(request.params.get("amount"));
        Integer productCount = 1;

        Long orderDate = System.currentTimeMillis() / 1000L;

        String formatDecimal = formatDecimal(amount);
        System.out.println("verify way for pay generateSignatureWayForPay: " + formatDecimal + " " + user.uuid + " " + user.givenName);
        String dataToSign = "";


        dataToSign = merchantAccount + ";" + merchantDomainName  + ";" +
                orderReference + ";" + orderDate + ";" +
                formatDecimal + ";" + currency + ";" + productName + ";" +
                productCount + ";" + formatDecimal;
        String key = Play.configuration.getProperty("wayforpay.secretkey");
        System.out.println("dataToSign\n" + dataToSign);
        System.out.println("wayforpay.secretkey " + key);

        String signature = hmacDigest(dataToSign, key, "HmacMD5");
//        String signature = HMAC_MD5_encode(key, dataToSign);

        WayForPayRequestParams params = new WayForPayRequestParams(
                merchantAccount, merchantDomainName, orderReference,
                orderDate, formatDecimal, currency, productName,
                productCount, formatDecimal, signature);
        renderJSON(json(params));
    }



}
