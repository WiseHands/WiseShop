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
                    " and state!='%s'";

    private static String formatQueryString(ShopDTO shop) {
        String formattedQuery = String.format(TOTAL_QUERY, shop.uuid, OrderState.DELETED, OrderState.CANCELLED);
        return formattedQuery;
    }

    public static TotalsData getCountAndTotalSumOfOrders(ShopDTO shop){
        String totalQuery = formatQueryString(shop);
        Object[] result = (Object[]) JPA.em().createQuery(totalQuery).getSingleResult();
        Double total = (Double) result[0];
        Long count = (Long) result[1];
        TotalsData totalsData = new TotalsData(total, count);
        return totalsData;
    }
}
