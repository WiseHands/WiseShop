package services;

import models.BalanceTransactionDTO;
import models.OrderDTO;
import models.ShopDTO;

public interface LiqPayService {
    String payButton(OrderDTO order, ShopDTO shop);
    String payForService(BalanceTransactionDTO balanceTransaction, ShopDTO shop);
}
