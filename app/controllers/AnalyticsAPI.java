package controllers;

import models.*;
import org.joda.time.DateTime;
import org.json.JSONArray;
import org.json.simple.JSONObject;
import play.db.jpa.JPA;
import services.analytics.PaymentTypeService;

import java.math.BigInteger;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

public class AnalyticsAPI extends AuthController {

    private static final int DEFAULT_NUMBER_OF_DAYS = 7;

    public static void showPopularProducts(String client){

        TimeZone.setDefault(TimeZone.getTimeZone("UTC"));

        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null){
            shop = ShopDTO.find("byDomain", "localhost").first();
        }

        checkAuthentification(shop);


        String stringQuery = "SELECT productUuid, name, SUM(quantity) FROM OrderItemDTO \n" +
                "WHERE orderUuid IN (SELECT uuid FROM OrderDTO where shop_uuid='" + shop.uuid +
                "' and productUuid IS NOT NULL and DATE_SUB(CURDATE(),INTERVAL " + DEFAULT_NUMBER_OF_DAYS + " DAY) <= from_unixtime( time/1000 ) AND state <> 'DELETED')\n" +
                "GROUP BY productUuid ORDER BY SUM(quantity) DESC LIMIT 10";

        List<Object[]> result = JPA.em().createNativeQuery(stringQuery).getResultList();
        List<JSONObject> list = new ArrayList<JSONObject>();
        for (int i = 0; i < result.size(); i++){
          Object[] item = result.get(i);
          JSONObject jsonObject = new JSONObject();
          jsonObject.put("uuid", item[0]);
          jsonObject.put("name", item[1]);
          jsonObject.put("quantity", item[2]);
          list.add(jsonObject);

        }
        renderJSON(list);
    }

    public static void fromDateToDate(String client, String fromDate, String toDate) throws Exception {
        TimeZone.setDefault(TimeZone.getTimeZone("UTC"));

        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        // calculate amount of days
        Long firstDay = (new Date(fromDate)).getTime();
        Long lastDate = (new Date(toDate)).getTime();
        int oneDay = 24*60*60*1000;
        int days = (Math.round(Math.abs(firstDay - lastDate)/(oneDay)))+2;
        System.out.println("days " + days);

        String totalQuery = "SELECT SUM(total) FROM OrderDTO where shop_uuid='" + shop.uuid + "' and state!='DELETED' and state!='CANCELLED'";
        Double total = (Double) JPA.em().createQuery(totalQuery).getSingleResult();

        String countQuery = "SELECT COUNT(total) FROM OrderDTO where shop_uuid='" + shop.uuid + "' and state!='DELETED' and state!='CANCELLED'";
        Long count = (Long) JPA.em().createQuery(countQuery).getSingleResult();

        Long today = beginOfDay(new Date(fromDate));
        String totalTodayQuery = "SELECT SUM(total) FROM OrderDTO where shop_uuid='" + shop.uuid + "' and state!='DELETED' and state!='CANCELLED' and time > " + today;
        Double totalToday = (Double) JPA.em().createQuery(totalTodayQuery).getSingleResult();

        String countTodayQuery = "SELECT COUNT(total) FROM OrderDTO where shop_uuid='" + shop.uuid + "' and state!='DELETED' and state!='CANCELLED' and time > " + today;
        Long countToday = (Long) JPA.em().createQuery(countTodayQuery).getSingleResult();

        JSONObject json = new JSONObject();
        json.put("total", total);
        json.put("count", count);
        json.put("totalToday", totalToday);
        json.put("countToday", countToday);



        List<JSONObject> list = new ArrayList<JSONObject>();
        for (int i=1; i<days; i++) {

            Long dayStart = beginOfDay(subtractDay(new Date(fromDate),+i));
            Long dayEnd = endOfDay(subtractDay(new Date(fromDate),+i));

            String dayTotalQuery = "SELECT SUM(total) FROM OrderDTO where shop_uuid='" + shop.uuid
                    + "' and state!='DELETED' and state!='CANCELLED' and time > " + dayStart  + " and time < " + dayEnd;
            Double dayTotal = (Double) JPA.em().createQuery(dayTotalQuery).getSingleResult();
            if(dayTotal == null) {
                dayTotal = 0.0;
            }
            DateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
            String dayName = dateFormat.format(new Date(dayStart));
            JSONObject item = new JSONObject();
            item.put("day", dayName);
            item.put("total", dayTotal);
            System.out.println("total per day " + item.put("total", dayTotal));
            list.add(item);
        }

        json.put("chartData", list);
        renderJSON(json);

    }

    public static void infoDay(String client, int numberOfDays) throws Exception { // /analytics
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        if(numberOfDays == 0) {
            numberOfDays = 7;
        }

        String totalQuery = "SELECT SUM(total) FROM OrderDTO where shop_uuid='" + shop.uuid + "' and state!='DELETED' and state!='CANCELLED'";
        Double total = (Double) JPA.em().createQuery(totalQuery).getSingleResult();

        String countQuery = "SELECT COUNT(total) FROM OrderDTO where shop_uuid='" + shop.uuid + "' and state!='DELETED' and state!='CANCELLED'";
        Long count = (Long) JPA.em().createQuery(countQuery).getSingleResult();

        Long today = beginOfDay(new Date());
        Long sevenDaysBefore = sevenDaysBefore(new Date());
        String totalTodayQuery = "SELECT SUM(total) FROM OrderDTO where shop_uuid='" + shop.uuid + "' and state!='DELETED' and state!='CANCELLED' and time > " + sevenDaysBefore;
        Double totalToday = (Double) JPA.em().createQuery(totalTodayQuery).getSingleResult();

        String countTodayQuery = "SELECT COUNT(total) FROM OrderDTO where shop_uuid='" + shop.uuid + "' and state!='DELETED' and state!='CANCELLED' and time > " + sevenDaysBefore;
        Long countToday = (Long) JPA.em().createQuery(countTodayQuery).getSingleResult();

        JSONObject json = new JSONObject();
        json.put("total", total);
        json.put("count", count);
        json.put("totalToday", totalToday);
        json.put("countToday", countToday);

        int daysFromToday = 7;

        BigInteger paidByCard = PaymentTypeService.getNumberOfPaymentsByCash(shop, daysFromToday);
        System.out.println(paidByCard);

        String stringQueryForByOnline = "SELECT count(*) FROM OrderDTO WHERE shop_uuid='" + shop.uuid +
                "' AND DATE_SUB(CURDATE(),INTERVAL 7 DAY) <= from_unixtime( time/1000 )" +
                " AND (paymentType = 'PAYONLINE' and state <> 'DELETED' and state <> 'PAYMENT_ERROR' and state <> 'CANCELLED');";
        BigInteger paidByCash = (BigInteger) JPA.em().createNativeQuery(stringQueryForByOnline).getSingleResult();
        System.out.println(paidByCash);


        JSONObject paymentCountByType = new JSONObject();
        paymentCountByType.put("paidByCard", paidByCard);
        paymentCountByType.put("paidByCash", paidByCash);
        json.put("paymentCountByType", paymentCountByType);



        String stringQuery =
                "SELECT " +
                    "DISTINCT COUNT(phone) AS count, name, phone, sum(total) " +
                "FROM OrderDTO " +
                "WHERE " +
                    "shop_uuid='" + shop.uuid + "' " +
                "AND " +
                    "DATE_SUB(CURDATE(),INTERVAL " + DEFAULT_NUMBER_OF_DAYS + " DAY) <= from_unixtime( time/1000 ) " +
                "GROUP BY phone " +
                "ORDER BY count desc " +
                "LIMIT 10";
        System.out.println(stringQuery);
        List<Object[]> result = JPA.em().createNativeQuery(stringQuery).getResultList();
        List<JSONObject> queryResultList = new ArrayList<JSONObject>();
        for (int i = 0; i < result.size(); i++){
            Object[] item = result.get(i);
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("buyersCount", item[0]);
            jsonObject.put("name", item[1]);
            jsonObject.put("phone", item[2]);
            jsonObject.put("total", item[3]);
            queryResultList.add(jsonObject);
        }

        json.put("frequentBuyers", queryResultList);

        String pattern = "MM/dd/yyyy";
        SimpleDateFormat dateFormat = new SimpleDateFormat(pattern, Locale.US);

        List<JSONObject> list = new ArrayList<JSONObject>();
        for (int i=0; i<7; i++) {
            Long dayStart = beginOfDay(subtractDay(new Date(today),-i));
            Long dayEnd = endOfDay(subtractDay(new Date(today),-i));

            String dayTotalQuery = "SELECT SUM(total) FROM OrderDTO where shop_uuid='" + shop.uuid
                    + "' and state!='DELETED' and state!='CANCELLED' and time > " + dayStart  + " and time < " + dayEnd;

            Double dayTotal = (Double) JPA.em().createQuery(dayTotalQuery).getSingleResult();
            if(dayTotal == null) {
                dayTotal = 0.0;
            }
            String dayName = dateFormat.format(new Date(dayStart));
            JSONObject item = new JSONObject();
            item.put("day", dayName);
            item.put("total", dayTotal);
            list.add(item);
        }

        json.put("chartData", list);
        renderJSON(json);
    }

    public static void infoMonth(String client, int numberOfDays) throws Exception { // /shop/details
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        if(numberOfDays == 0) {
            numberOfDays=30;
        }

        String totalQuery = "SELECT SUM(total) FROM OrderDTO where shop_uuid='" + shop.uuid + "' and state!='DELETED' and state!='CANCELLED'";
        Double total = (Double) JPA.em().createQuery(totalQuery).getSingleResult();

        String countQuery = "SELECT COUNT(total) FROM OrderDTO where shop_uuid='" + shop.uuid + "' and state!='DELETED' and state!='CANCELLED'";
        Long count = (Long) JPA.em().createQuery(countQuery).getSingleResult();

        Long thirtyDaysBefore = thirtyDaysBefore(new Date());
        String total30Query = "SELECT SUM(total) FROM OrderDTO where shop_uuid='" + shop.uuid + "' and state!='DELETED' and state!='CANCELLED' and time > " + thirtyDaysBefore;
        Double totalToday = (Double) JPA.em().createQuery(total30Query).getSingleResult();

        String count30Query = "SELECT COUNT(total) FROM OrderDTO where shop_uuid='" + shop.uuid + "' and state!='DELETED' and state!='CANCELLED' and time > " + thirtyDaysBefore;
        Long countToday = (Long) JPA.em().createQuery(count30Query).getSingleResult();

        JSONObject json = new JSONObject();
        json.put("total", total);
        json.put("count", count);
        json.put("totalToday", totalToday);
        json.put("countToday", countToday);

        String pattern = "MM/dd/yyyy";
        SimpleDateFormat dateFormat = new SimpleDateFormat(pattern, Locale.US);


        Long today = beginOfDay(new Date());
        List<JSONObject> list = new ArrayList<JSONObject>();
        for (int i=0; i<numberOfDays; i++) {
            Long dayStart = beginOfDay(subtractDay(new Date(today),-i));
            Long dayEnd = endOfDay(subtractDay(new Date(today),-i));

            String dayTotalQuery = "SELECT SUM(total) FROM OrderDTO where shop_uuid='" + shop.uuid
                    + "' and state!='DELETED' and state!='CANCELLED' and time > " + dayStart  + " and time < " + dayEnd;

            Double dayTotal = (Double) JPA.em().createQuery(dayTotalQuery).getSingleResult();
            if(dayTotal == null) {
                dayTotal = 0.0;
            }
            String dayName = dateFormat.format(new Date(dayStart));
            JSONObject item = new JSONObject();
            item.put("day", dayName);
            item.put("total", dayTotal);
            list.add(item);
        }

        json.put("chartData", list);
        renderJSON(json);
    }

    public static void infoNinty(String client, int numberOfDays) throws Exception { // /shop/details
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        if(numberOfDays == 0) {
            numberOfDays=90;
        }

        String totalQuery = "SELECT SUM(total) FROM OrderDTO where shop_uuid='" + shop.uuid + "' and state!='DELETED' and state!='CANCELLED'";
        Double total = (Double) JPA.em().createQuery(totalQuery).getSingleResult();

        String countQuery = "SELECT COUNT(total) FROM OrderDTO where shop_uuid='" + shop.uuid + "' and state!='DELETED' and state!='CANCELLED'";
        Long count = (Long) JPA.em().createQuery(countQuery).getSingleResult();

        Long nintyDaysBefore = nintyDaysBefore(new Date());
        String total30Query = "SELECT SUM(total) FROM OrderDTO where shop_uuid='" + shop.uuid + "' and state!='DELETED' and state!='CANCELLED' and time > " + nintyDaysBefore;
        Double totalToday = (Double) JPA.em().createQuery(total30Query).getSingleResult();

        String count30Query = "SELECT COUNT(total) FROM OrderDTO where shop_uuid='" + shop.uuid + "' and state!='DELETED' and state!='CANCELLED' and time > " + nintyDaysBefore;
        Long countToday = (Long) JPA.em().createQuery(count30Query).getSingleResult();

        JSONObject json = new JSONObject();
        json.put("total", total);
        json.put("count", count);
        json.put("totalToday", totalToday);
        json.put("countToday", countToday);

        String pattern = "MM/dd/yyyy";
        SimpleDateFormat dateFormat = new SimpleDateFormat(pattern, Locale.US);


        Long today = beginOfDay(new Date());
        List<JSONObject> list = new ArrayList<JSONObject>();
        for (int i=0; i<numberOfDays; i++) {
            Long dayStart = beginOfDay(subtractDay(new Date(today),-i));
            Long dayEnd = endOfDay(subtractDay(new Date(today),-i));

            String dayTotalQuery = "SELECT SUM(total) FROM OrderDTO where shop_uuid='" + shop.uuid
                    + "' and state!='DELETED' and state!='CANCELLED' and time > " + dayStart  + " and time < " + dayEnd;

            Double dayTotal = (Double) JPA.em().createQuery(dayTotalQuery).getSingleResult();
            if(dayTotal == null) {
                dayTotal = 0.0;
            }
            String dayName = dateFormat.format(new Date(dayStart));
            JSONObject item = new JSONObject();
            item.put("day", dayName);
            item.put("total", dayTotal);
            list.add(item);
        }

        json.put("chartData", list);
        renderJSON(json);
    }

    public static void info180(String client, int numberOfDays) throws Exception { // /shop/details
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        if(numberOfDays == 0) {
            numberOfDays=180;
        }

        String totalQuery = "SELECT SUM(total) FROM OrderDTO where shop_uuid='" + shop.uuid + "' and state!='DELETED' and state!='CANCELLED'";
        Double total = (Double) JPA.em().createQuery(totalQuery).getSingleResult();

        String countQuery = "SELECT COUNT(total) FROM OrderDTO where shop_uuid='" + shop.uuid + "' and state!='DELETED' and state!='CANCELLED'";
        Long count = (Long) JPA.em().createQuery(countQuery).getSingleResult();

        Long oneHundredEighty = onehundredeightyDaysBefore(new Date());
        String total30Query = "SELECT SUM(total) FROM OrderDTO where shop_uuid='" + shop.uuid + "' and state!='DELETED' and state!='CANCELLED' and time > " + oneHundredEighty;
        Double totalToday = (Double) JPA.em().createQuery(total30Query).getSingleResult();

        String count30Query = "SELECT COUNT(total) FROM OrderDTO where shop_uuid='" + shop.uuid + "' and state!='DELETED' and state!='CANCELLED' and time > " + oneHundredEighty;
        Long countToday = (Long) JPA.em().createQuery(count30Query).getSingleResult();

        JSONObject json = new JSONObject();
        json.put("total", total);
        json.put("count", count);
        json.put("totalToday", totalToday);
        json.put("countToday", countToday);

        String pattern = "MM/dd/yyyy";
        SimpleDateFormat dateFormat = new SimpleDateFormat(pattern, Locale.US);


        Long today = beginOfDay(new Date());
        List<JSONObject> list = new ArrayList<JSONObject>();
        for (int i=0; i<numberOfDays; i++) {
            Long dayStart = beginOfDay(subtractDay(new Date(today),-i));
            Long dayEnd = endOfDay(subtractDay(new Date(today),-i));

            String dayTotalQuery = "SELECT SUM(total) FROM OrderDTO where shop_uuid='" + shop.uuid
                    + "' and state!='DELETED' and state!='CANCELLED' and time > " + dayStart  + " and time < " + dayEnd;

            Double dayTotal = (Double) JPA.em().createQuery(dayTotalQuery).getSingleResult();
            if(dayTotal == null) {
                dayTotal = 0.0;
            }
            String dayName = dateFormat.format(new Date(dayStart));
            JSONObject item = new JSONObject();
            item.put("day", dayName);
            item.put("total", dayTotal);
            list.add(item);
        }

        json.put("chartData", list);
        renderJSON(json);
    }

    public static void infoYear(String client, int numberOfDays) throws Exception { // /shop/details
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        if(numberOfDays == 0) {
            numberOfDays=360;
        }

        String totalQuery = "SELECT SUM(total) FROM OrderDTO where shop_uuid='" + shop.uuid + "' and state!='DELETED' and state!='CANCELLED'";
        Double total = (Double) JPA.em().createQuery(totalQuery).getSingleResult();

        String countQuery = "SELECT COUNT(total) FROM OrderDTO where shop_uuid='" + shop.uuid + "' and state!='DELETED' and state!='CANCELLED'";
        Long count = (Long) JPA.em().createQuery(countQuery).getSingleResult();

        Long three = threeHundredSixtyDaysBefore(new Date());
        String total30Query = "SELECT SUM(total) FROM OrderDTO where shop_uuid='" + shop.uuid + "' and state!='DELETED' and state!='CANCELLED' and time > " + three;
        Double totalToday = (Double) JPA.em().createQuery(total30Query).getSingleResult();

        String count30Query = "SELECT COUNT(total) FROM OrderDTO where shop_uuid='" + shop.uuid + "' and state!='DELETED' and state!='CANCELLED' and time > " + three;
        Long countToday = (Long) JPA.em().createQuery(count30Query).getSingleResult();

        JSONObject json = new JSONObject();
        json.put("total", total);
        json.put("count", count);
        json.put("totalToday", totalToday);
        json.put("countToday", countToday);

        String pattern = "MM/dd/yyyy";
        SimpleDateFormat dateFormat = new SimpleDateFormat(pattern, Locale.US);


        Long today = beginOfDay(new Date());
        List<JSONObject> list = new ArrayList<JSONObject>();
        for (int i=0; i<numberOfDays; i++) {
            Long dayStart = beginOfDay(subtractDay(new Date(today),-i));
            Long dayEnd = endOfDay(subtractDay(new Date(today),-i));

            String dayTotalQuery = "SELECT SUM(total) FROM OrderDTO where shop_uuid='" + shop.uuid
                    + "' and state!='DELETED' and state!='CANCELLED' and time > " + dayStart  + " and time < " + dayEnd;

            Double dayTotal = (Double) JPA.em().createQuery(dayTotalQuery).getSingleResult();
            if(dayTotal == null) {
                dayTotal = 0.0;
            }
            String dayName = dateFormat.format(new Date(dayStart));
            JSONObject item = new JSONObject();
            item.put("day", dayName);
            item.put("total", dayTotal);
            list.add(item);
        }

        json.put("chartData", list);
        renderJSON(json);
    }


    private static Long beginOfDay(Date date) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);

        return cal.getTimeInMillis();
    }

    private static Long endOfDay(Date date) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.set(Calendar.HOUR_OF_DAY, 23);
        cal.set(Calendar.MINUTE, 59);
        cal.set(Calendar.SECOND, 59);
        cal.set(Calendar.MILLISECOND, 999);

        return cal.getTimeInMillis();
    }

    private static Long thirtyDaysBefore(Date date) {
        int x = -30;
        Calendar cal = GregorianCalendar.getInstance();
        cal.add( Calendar.DAY_OF_YEAR, x);
        return cal.getTimeInMillis();
    }

    private static Long sevenDaysBefore(Date date) {
        int x = -7;
        Calendar cal = GregorianCalendar.getInstance();
        cal.add( Calendar.DAY_OF_YEAR, x);
        return cal.getTimeInMillis();
    }

    private static Long nintyDaysBefore(Date date) {
        int x = -90;
        Calendar cal = GregorianCalendar.getInstance();
        cal.add( Calendar.DAY_OF_YEAR, x);
        return cal.getTimeInMillis();
    }

    private static Long onehundredeightyDaysBefore(Date date) {
        int x = -180;
        Calendar cal = GregorianCalendar.getInstance();
        cal.add( Calendar.DAY_OF_YEAR, x);
        return cal.getTimeInMillis();
    }

    private static Long threeHundredSixtyDaysBefore(Date date) {
        int x = -360;
        Calendar cal = GregorianCalendar.getInstance();
        cal.add( Calendar.DAY_OF_YEAR, x);
        return cal.getTimeInMillis();
    }

    private static Date subtractDay(Date date, int numOfDays) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(Calendar.DAY_OF_MONTH, numOfDays);
        return cal.getTime();
    }

}