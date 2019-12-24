package services.analytics;

import enums.OrderState;
import models.ShopDTO;
import play.db.jpa.JPA;

public class TotalsDataService {

    public static class TotalsData {
        Double totalSum;
        Long totalCount;

        public TotalsData(Double totalSum, Long totalCount){
            this.totalSum = totalSum;
            this.totalCount = totalCount;
        }
    }

    private static final String TOTAL_QUERY =
            "SELECT SUM(total), COUNT(total)" +
            " FROM OrderDTO where shop_uuid='%s'" +
                    " and state!='%s'" +
                    " and state!='%s'" +
                    " and time > %d";


    private static String formatTotalQueryString(ShopDTO shop, Long time) {
        String formattedQuery = String.format(
                TOTAL_QUERY,
                shop.uuid,
                OrderState.DELETED,
                OrderState.CANCELLED,
                time);
        return formattedQuery;
    }

    private static String formatTimeQueryString(ShopDTO shop, Long daysBefore) {
        String formattedQuery = String.format(TOTAL_QUERY, shop.uuid, OrderState.DELETED, OrderState.CANCELLED, daysBefore);
        return formattedQuery;
    }

    public static TotalsData getCountAndTotalSumOfOrders(ShopDTO shop){
        Long time = 0l;
        return getData(shop, time);
    }

    public static TotalsData getCountAndTotalSumOfOrdersDayBefore(ShopDTO shop, Long time){
        return getData(shop, time);
    }

    private static TotalsData getData(ShopDTO shop, Long time) {
        String totalQuery = formatTimeQueryString(shop, time);
        Object[] result = (Object[]) JPA.em().createQuery(totalQuery).getSingleResult();
        Double total = (Double) result[0];
        Long count = (Long) result[1];
        TotalsData totalsData = new TotalsData(total, count);
        return totalsData;
    }

}
