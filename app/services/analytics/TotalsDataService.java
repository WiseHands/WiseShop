package services.analytics;

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

    public static TotalsData getCountAndTotalSumOfOrders(ShopDTO shop){
        String totalQuery = "SELECT SUM(total) FROM OrderDTO where shop_uuid='" + shop.uuid + "' and state!='DELETED' and state!='CANCELLED'";
        Double total = (Double) JPA.em().createQuery(totalQuery).getSingleResult();

        String countQuery = "SELECT COUNT(total) FROM OrderDTO where shop_uuid='" + shop.uuid + "' and state!='DELETED' and state!='CANCELLED'";
        Long count = (Long) JPA.em().createQuery(countQuery).getSingleResult();
        TotalsData totalsData = new TotalsData(total, count);
        return totalsData;
    }
}
