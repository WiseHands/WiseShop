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
        String stringQueryForByCash = String.format(PAYMENTS_BY_TYPE_QUERY,
                shop.uuid,
                daysFromToday,
                PaymentTypeEnum.CASHONSPOT,
                OrderState.DELETED,
                OrderState.PAYMENT_ERROR,
                OrderState.CANCELLED);
        BigInteger numberOfOrdersPaidByCash = (BigInteger) JPA.em().createNativeQuery(stringQueryForByCash).getSingleResult();
        return numberOfOrdersPaidByCash;
    }

    public static BigInteger getNumberOfPaymentsByCard(ShopDTO shop, int daysFromToday) {
        String stringQueryForByCash = String.format(PAYMENTS_BY_TYPE_QUERY,
                shop.uuid,
                daysFromToday,
                PaymentTypeEnum.PAYONLINE,
                OrderState.DELETED,
                OrderState.PAYMENT_ERROR,
                OrderState.CANCELLED);
        BigInteger numberOfOrdersPaidByCash = (BigInteger) JPA.em().createNativeQuery(stringQueryForByCash).getSingleResult();
        return numberOfOrdersPaidByCash;
    }
}
