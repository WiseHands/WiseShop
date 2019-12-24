package services.analytics;

import json.FrequentBuyer;
import models.ShopDTO;
import play.db.jpa.JPA;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

public class FrequentBuyersService {
    private static final String FREQUENT_BUYERS_QUERY =
            "SELECT " +
                    "DISTINCT COUNT(phone) AS count, name, phone, sum(total) " +
                    "FROM OrderDTO " +
                    "WHERE " +
                    "shop_uuid='%s' " +
                    "AND " +
                    "DATE_SUB(CURDATE(),INTERVAL %d DAY) <= from_unixtime( time/1000 ) " +
                    "GROUP BY phone " +
                    "ORDER BY count desc " +
                    "LIMIT 10";

    private static String formatQueryString(ShopDTO shop, int daysFromToday) {
        String formattedQuery = String.format(FREQUENT_BUYERS_QUERY, shop.uuid, daysFromToday);
        return formattedQuery;
    }

    public static List<FrequentBuyer> getFrequentBuyerList(ShopDTO shop, int daysFromToday){
        String stringQuery = FrequentBuyersService.formatQueryString(shop, daysFromToday);
        List<Object[]> result = JPA.em().createNativeQuery(stringQuery).getResultList();
        List<FrequentBuyer> queryResultList = new ArrayList<FrequentBuyer>();
        for (int i = 0; i < result.size(); i++){
            Object[] item = result.get(i);
            BigInteger buyersCount = (BigInteger) item[0];
            String name = (String) item[1];
            String phone = (String) item[2];
            Double buyerTotal = (Double) item[3];
            FrequentBuyer frequentBuyer = new FrequentBuyer( buyersCount, name, phone, buyerTotal);
            queryResultList.add(frequentBuyer);
        }
        return queryResultList;
    }
}
