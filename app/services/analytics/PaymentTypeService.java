package services.analytics;

import enums.OrderState;
import enums.PaymentTypeEnum;
import models.ShopDTO;
import play.db.jpa.JPA;

import java.math.BigInteger;

public class PaymentTypeService {
    private static final String PAYMENTS_BY_TYPE_QUERY =
            "SELECT count(*) " +
            "FROM OrderDTO " +
            "WHERE shop_uuid='%s' " +
            "AND DATE_SUB(CURDATE(),INTERVAL %d DAY) <= from_unixtime( time/1000 ) " +
            "AND (paymentType = '%s' " +
            "AND state <> '%s' " +
            "AND state <> '%s' " +
            "AND state <> '%s');";

    public static BigInteger getNumberOfPaymentsByCash(ShopDTO shop, int daysFromToday) {
        return getOrdersCount(shop, PaymentTypeEnum.CASHONSPOT, daysFromToday);
    }

    public static BigInteger getNumberOfPaymentsByCard(ShopDTO shop, int daysFromToday) {
        return getOrdersCount(shop, PaymentTypeEnum.PAYONLINE, daysFromToday);
    }

    private static BigInteger getOrdersCount(ShopDTO shop, PaymentTypeEnum paymentType, int daysFromToday) {
        String stringQueryForByCash = String.format(PAYMENTS_BY_TYPE_QUERY,
                shop.uuid,
                daysFromToday,
                paymentType,
                OrderState.DELETED,
                OrderState.PAYMENT_ERROR,
                OrderState.PAYMENT_WAIT_ACCEPT,
                OrderState.CANCELLED);
        BigInteger numberOfOrders = (BigInteger) JPA.em().createNativeQuery(stringQueryForByCash).getSingleResult();
        return numberOfOrders;
    }
}
