package controllers;

import enums.TransactionStatus;
import enums.TransactionType;
import models.CoinAccountDTO;
import models.CoinTransactionDTO;
import models.ShopDTO;
import play.db.jpa.JPA;

import java.util.ArrayList;
import java.util.List;

public class CoinBalanceTransactionApi extends AuthController{

    public static String query = "SELECT amount, status, time, transactionBalance, type FROM CoinTransactionDTO" +
            " WHERE account_uuid IN" +
            " (SELECT uuid FROM CoinAccountDTO where shop_uuid= '%s')" +
            " order by time desc LIMIT 10";

    public static List<CoinTransactionDTO> getFirstTenTransactions(ShopDTO shop){

        String transactionListQuery = formatQueryString(query, shop);
        List<Object[]> resultList = JPA.em().createNativeQuery(transactionListQuery).getResultList();
        List<CoinTransactionDTO> queryResultList = new ArrayList<CoinTransactionDTO>();
        for (Object[] item: resultList){
            CoinTransactionDTO transaction = createCoinTransactionDTO(item);
            queryResultList.add(transaction);
        }
        System.out.println("queryResultList " + queryResultList.size());
        return queryResultList;
    }

    public static void dispatchFirstTenTransactions(){

        String shopUuid = request.params.get("shopUuid");
        System.out.println("shopUuid for dispatchFirstTenTransactions: " + shopUuid);
        ShopDTO shop = ShopDTO.findById(shopUuid);

        String transactionListQuery = formatQueryString(query, shop);
        List<Object[]> resultList = JPA.em().createNativeQuery(transactionListQuery).getResultList();
        List<CoinTransactionDTO> queryResultList = new ArrayList<CoinTransactionDTO>();

        for (Object[] item: resultList){
            CoinTransactionDTO transaction = createCoinTransactionDTO(item);
            queryResultList.add(transaction);
        }

        CoinAccountDTO coinAccount = CoinAccountDTO.find("byShop", shop).first();
        coinAccount.transactionList = queryResultList;
        renderJSON(json(coinAccount));

    }

    private static CoinTransactionDTO createCoinTransactionDTO(Object[] item) {
        double amount = (double) item[0];
        TransactionStatus status = getTransactionStatus(item[1]);
        Long time = Long.valueOf(String.valueOf(item[2]));
        double transactionBalance = (double) item[3];
        TransactionType type = getTransactionType(item[4]) ;
        CoinTransactionDTO transaction = new CoinTransactionDTO(amount,status,time,transactionBalance,type);
        return transaction;
    }

    private static TransactionType getTransactionType(Object object) {
        int codeStatus = (int) object;

        switch (codeStatus){
            case 0 :
                return TransactionType.REFILL;
            case 1 :
                return TransactionType.TRANSFER;
            case 2 :
                return TransactionType.COMMISSION_FEE;
            case 3 :
                return TransactionType.OFFLINE_REFILL;
            case 4 :
                return TransactionType.MONTHLY_FEE;
            case 5 :
                return TransactionType.CHANGE_PRICING_PLAN;
            case 6 :
                return TransactionType.ORDER_CANCELLED;
        }
        return null;
    }

    private static TransactionStatus getTransactionStatus(Object object) {
        int codeStatus = (int) object;
        switch (codeStatus){
            case 0 :
                return TransactionStatus.PENDING;
            case 1 :
                return TransactionStatus.OK;
            case 2 :
                return TransactionStatus.FAIL;
        }
        return null;
    }

    private static String formatQueryString(String query, ShopDTO shop) {
        String formattedQuery = String.format(
                query,
                shop.uuid);
        return formattedQuery;
    }

}
