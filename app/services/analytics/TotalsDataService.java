package services.analytics;

import enums.OrderState;
import models.ShopDTO;
import play.db.jpa.JPA;

import java.util.Calendar;

public class TotalsDataService {

    public static class TotalsData {
        Double totalSum;
        Long totalCount;

        public TotalsData(Double totalSum, Long totalCount){
            this.totalSum = totalSum;
            this.totalCount = totalCount;
        }

        public Double getTotalSum() {
            return totalSum;
        }

        public Long getTotalCount() {
            return totalCount;
        }

        @Override
        public String toString() {
            return String.format("TotalsData: " + "SUM == %.2f, COUNT == %d", this.totalSum, this.totalCount);
        }
    }

    private static final String TOTAL_QUERY =
            "SELECT SUM(total), COUNT(total)" +
            " FROM OrderDTO where shop_uuid='%s'" +
                    " and state!='%s'" +
                    " and state!='%s'" +
                    " and time > %d" +
                    " and time < %d";

    private static String formatTimeQueryString(ShopDTO shop, Long timeBefore, Long timeAfter) {
        String formattedQuery = String.format(
                TOTAL_QUERY,
                shop.uuid,
                OrderState.DELETED,
                OrderState.CANCELLED,
                timeBefore,
                timeAfter);
        return formattedQuery;
    }

    public static TotalsData getCountAndTotalSumOfOrders(ShopDTO shop){
        Long firstTime = 0l;
        Long secondTime = Calendar.getInstance().getTimeInMillis();
        return getData(shop, firstTime, secondTime);
    }

    public static TotalsData getCountAndTotalSumOfOrdersDayBefore(ShopDTO shop, Long firstTime){
        Long secondTime = Calendar.getInstance().getTimeInMillis();
        return getData(shop, firstTime, secondTime);
    }

    public static TotalsData getCountAndTotalSumOfOrdersInGivenDateRange(ShopDTO shop, Long firstTime, Long secondTime){
        return getData(shop, firstTime, secondTime);
    }

    private static TotalsData getData(ShopDTO shop, Long firstTime, Long secondTime) {
        String totalQuery = formatTimeQueryString(shop, firstTime, secondTime);
        Object[] result = (Object[]) JPA.em().createQuery(totalQuery).getSingleResult();
        Double total = (Double) result[0];
        Long count = (Long) result[1];
        TotalsData totalsData = new TotalsData(total, count);
        return totalsData;
    }

}
