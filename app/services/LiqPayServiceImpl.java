package services;

import models.BalanceTransactionDTO;
import models.OrderDTO;
import models.ShopDTO;

import java.util.HashMap;

public class LiqPayServiceImpl implements LiqPayService {
    public static final String WISEHANDS_PUBLIC_KEY = "i39178534493";
    public static final String WISEHANDS_PRIVATE_KEY = "3JsL0sekGjhDd2nmE29yYpYlXII4sXyPz7R9JjyS";
    private static LiqPayService service;
    static {
        service = new LiqPayServiceImpl();
    }

    public static LiqPayService getInstance() {
        return service;
    }

    public String payButton(OrderDTO order, ShopDTO shop){
        HashMap params = new HashMap();
        params.put("action", "pay");
        params.put("amount", order.total);
        params.put("currency", "UAH");
        params.put("description", "New Order");
        params.put("order_id", order.uuid);

        return "";
    };

    public String payForService(BalanceTransactionDTO balanceTransaction, ShopDTO shop){
        HashMap params = new HashMap();
        params.put("action", "pay");
        params.put("amount", balanceTransaction.amount);
        params.put("currency", "UAH");
        params.put("description", "Balance transaction for " + shop.shopName);
        params.put("order_id", balanceTransaction.uuid);

        return "";
    };
}
