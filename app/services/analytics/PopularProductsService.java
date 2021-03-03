package services.analytics;

import enums.OrderState;
import json.PopularProducts;
import models.ShopDTO;
import play.db.jpa.JPA;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class PopularProductsService {

    private static final String POPULAR_PRODUCTS_QUERY =
            "SELECT productUuid, name, SUM(quantity) FROM OrderItemDTO" +
            " WHERE orderUuid IN" +
                    " (SELECT uuid FROM OrderDTO where shop_uuid='%s'" +
                    " AND productUuid IS NOT NULL" +
                    " AND DATE_SUB(CURDATE(),INTERVAL %d DAY)" +
                    " <= from_unixtime( time/1000 ) AND state <> '%s')" +
                    " GROUP BY productUuid" +
                    " ORDER BY SUM(quantity)" +
                    " DESC LIMIT 10";

    private static String formatQueryString(ShopDTO shop, int daysFromToday) {
        String formattedQuery = String.format(POPULAR_PRODUCTS_QUERY, shop.uuid, daysFromToday, OrderState.DELETED);
        return formattedQuery;
    }

    public static List<PopularProducts> getPopularProducts(ShopDTO shop, int daysFromToday){

        String stringQuery = PopularProductsService.formatQueryString(shop, daysFromToday);
        List<Object[]> result = JPA.em().createNativeQuery(stringQuery).getResultList();
        List<PopularProducts> queryResultList = new ArrayList<PopularProducts>();
        for (int i = 0; i < result.size(); i++){
            Object[] item = result.get(i);
            String uuid = (String) item[0];
            String name = (String) item[1];
            BigDecimal quantity = (BigDecimal) item[2];
            PopularProducts popularProducts = new PopularProducts(uuid, name, quantity);
            queryResultList.add(popularProducts);
        }
        return queryResultList;
    }



}
