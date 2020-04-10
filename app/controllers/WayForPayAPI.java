package controllers;

import com.google.gson.annotations.Expose;
import enums.TransactionStatus;
import enums.TransactionType;
import models.CoinAccountDTO;
import models.CoinTransactionDTO;
import models.ShopDTO;
import models.UserDTO;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import play.Play;
import responses.UserNotAllowedToPerformActionError;

import java.text.DecimalFormat;

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
        Long time;
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
        @Expose
        String serviceUrl;
        @Expose
        String status;
        @Expose
        String signature;

        public WayForPayRequestParams(String orderReference, String status, Long time, String signature){
            this.orderReference = orderReference;
            this.status = status;
            this.time = time;
            this.signature = signature;
        }

        public WayForPayRequestParams(String merchantAccount, String merchantDomainName, String orderReference,
                                      Long orderDate, String amount, String currency,
                                      String productName, Integer productCount, String productPrice,
                                      String signature, String serviceUrl) {
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
            this.serviceUrl = serviceUrl;
        }




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

    public static void paymentConfirmation(String client) throws Exception{
        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));
        System.out.println("payment confirmation WFP jsonBody: " + jsonBody);

        String orderReference = (String) jsonBody.get("orderReference");
        String status = "accept";
        Long time = System.currentTimeMillis() / 1000L;
        String key = Play.configuration.getProperty("wayforpay.secretkey");

        String dataToSign = orderReference + ";" + status + ";" + time;
        String signature = hmacDigest(dataToSign, key, "HmacMD5");

        CoinTransactionDTO transaction = CoinTransactionDTO.findById(orderReference);
        String transactionStatus = (String) jsonBody.get("transactionStatus");

        if (transactionStatus.equals("Approved")){
            if(transaction.status.equals(TransactionStatus.PENDING)) {
                transaction.account.balance += transaction.amount;
                transaction.account.save();
                transaction.confirmationTime = System.currentTimeMillis() / 1000L;
                transaction.status = TransactionStatus.OK;
                transaction.save();
            }

            WayForPayRequestParams params = new WayForPayRequestParams(orderReference, status, time, signature);
            renderJSON(json(params));
        } else if (transactionStatus.equals("Expired")){
            if(transaction.status.equals(TransactionStatus.PENDING)) {
                transaction.expirationTime = System.currentTimeMillis() / 1000L;
                transaction.status = TransactionStatus.FAIL;
                transaction.save();
            }

            WayForPayRequestParams params = new WayForPayRequestParams(orderReference, status, time, signature);
            renderJSON(json(params));
        }
    }

    public static void createOfflinePayment(String client) throws Exception{

        String authorizationHeader = request.headers.get("authorization").value();
        String userId = getUserIdFromAuthorization(authorizationHeader);
        UserDTO user = UserDTO.find("byUuid", userId).first();

        String shopUuid = request.params.get("shopUuid");
        Double amount = Double.valueOf(request.params.get("amount"));
        if (user.isSuperUser){
            ShopDTO shop = ShopDTO.findById(shopUuid);
            CoinAccountDTO coinAccount = CoinAccountDTO.find("byShop", shop).first();
            if(coinAccount == null) {
                coinAccount = new CoinAccountDTO(shop);
                coinAccount = coinAccount.save();
            }
            CoinTransactionDTO transaction = new CoinTransactionDTO();
            transaction.type = TransactionType.OFFLINE_REFILL;
            transaction.status = TransactionStatus.OK;
            transaction.account = coinAccount;
            transaction.amount = amount;
            transaction.time = System.currentTimeMillis() / 1000L;
            transaction = transaction.save();
            coinAccount.addTransaction(transaction);
            coinAccount.balance += amount;
            coinAccount.save();
            renderJSON(json(coinAccount));
        } else {
            renderJSON(json(new UserNotAllowedToPerformActionError()));
        }

    }

    public static void generateSignatureWayForPay(String client) throws Exception{

        String authorizationHeader = request.headers.get("authorization").value();
        String userId = getUserIdFromAuthorization(authorizationHeader);
        UserDTO user = UserDTO.find("byUuid", userId).first();

        String shopUuid = request.params.get("shopUuid");
        ShopDTO shop = ShopDTO.findById(shopUuid);


        String productName = "Поповнення власного рахунку для магазину " + shop.shopName;
        String serviceUrl = "https://wstore.pro/wayforpay/payment-confirmation";
        Double amount = Double.valueOf(request.params.get("amount"));
        String formatDecimal = formatDecimal(amount);
        Integer productCount = 1;
        Long orderDate = System.currentTimeMillis() / 1000L;

        String orderReference = creatingOrderReferenceByTransaction(shop, amount);

        String dataToSign = "";
        dataToSign = merchantAccount + ";" + merchantDomainName  + ";" +
                orderReference + ";" + orderDate + ";" +
                formatDecimal + ";" + currency + ";" + productName + ";" +
                productCount + ";" + formatDecimal;

        String key = Play.configuration.getProperty("wayforpay.secretkey");
        System.out.println("dataToSign\n" + dataToSign);

        String signature = hmacDigest(dataToSign, key, "HmacMD5");

        WayForPayRequestParams params = new WayForPayRequestParams(
                merchantAccount, merchantDomainName, orderReference,
                orderDate, formatDecimal, currency, productName,
                productCount, formatDecimal, signature, serviceUrl);
        renderJSON(json(params));
    }

    private static String creatingOrderReferenceByTransaction(ShopDTO shop, double amount) {
        CoinAccountDTO coinAccount = CoinAccountDTO.find("byShop", shop).first();
        if(coinAccount == null) {
            coinAccount = new CoinAccountDTO(shop);
            coinAccount = coinAccount.save();
        }

        CoinTransactionDTO transaction = new CoinTransactionDTO();
        transaction.type = TransactionType.REFILL;
        transaction.status = TransactionStatus.PENDING;
        transaction.account = coinAccount;
        transaction.amount = amount;
        transaction.time = System.currentTimeMillis() / 1000L;
        transaction = transaction.save();

        coinAccount.addTransaction(transaction);
        coinAccount = coinAccount.save();
        return transaction.uuid;
    }

    public static String formatDecimal(Double amount) {
        return String.format("%.2f", amount); // dj_segfault
    }

}
