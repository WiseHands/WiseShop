package services;

import models.OrderDTO;
import models.ShopDTO;

public interface LiqPayService {
    String payButton(OrderDTO order, ShopDTO shop);
}
