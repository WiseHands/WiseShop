package services;

import com.liqpay.LiqPay;
import models.BalanceTransactionDTO;
import models.CurrencyShopDTO;
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
        String currency = getCurrencyFromShop(shop);
        System.out.println("LiqPayService currency => " + currency);

        HashMap params = new HashMap();
        params.put("action", "pay");
        params.put("amount", order.total);
        params.put("currencyShop", currency);
        params.put("description", "New Order");
        params.put("order_id", order.uuid);
        // sandbox need for testing
        params.put("sandbox", "1");

        LiqPay liqpay = new LiqPay(shop.liqpayPublicKey, shop.liqpayPrivateKey);
        return liqpay.cnb_form(params);
    }

    public String payForService(BalanceTransactionDTO balanceTransaction, ShopDTO shop){
        String currency = getCurrencyFromShop(shop);
        System.out.println("payForService => " + currency);
        HashMap params = new HashMap();
        params.put("action", "pay");
        params.put("amount", balanceTransaction.amount);
        params.put("currencyShop", currency);
        params.put("description", "Balance transaction for " + shop.shopName);
        params.put("order_id", balanceTransaction.uuid);

        LiqPay liqpay = new LiqPay(WISEHANDS_PUBLIC_KEY, WISEHANDS_PRIVATE_KEY);
        return liqpay.cnb_form(params);
    }

    private String getCurrencyFromShop(ShopDTO shop) {
        CurrencyShopDTO currency = CurrencyShopDTO.find("byShop", shop).first();
        if(currency.selectedCurrency.isEmpty()){
            return currency.currency;
        } else {
            return currency.selectedCurrency;
        }
    }


}
