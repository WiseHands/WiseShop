package services;

import com.liqpay.LiqPay;
import models.OrderDTO;
import models.ShopDTO;

import java.util.HashMap;

public class LiqPayServiceImpl implements LiqPayService {
    public String payButton(OrderDTO order, ShopDTO shop){
        HashMap params = new HashMap();
        params.put("action", "pay");
        params.put("amount", order.total);
        params.put("currency", "UAH");
        params.put("description", "New Order");
        params.put("order_id", order.uuid);

        LiqPay liqpay = new LiqPay(shop.liqpayPublicKey, shop.liqpayPrivateKey);
        return liqpay.cnb_form(params);
    };
}
