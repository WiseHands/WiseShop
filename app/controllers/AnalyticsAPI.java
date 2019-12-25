package controllers;

import json.FrequentBuyer;
import json.PopularProucts;
import models.*;
import org.json.simple.JSONObject;
import services.analytics.FrequentBuyersService;
import services.analytics.PaymentTypeService;
import services.analytics.PopularProductsService;
import services.analytics.TotalsDataService;

import java.math.BigInteger;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

public class AnalyticsAPI extends AuthController {


    public static void fromDateToDate(String client, Long fromDateInMillis, Long toDateInMillis) throws Exception {
        TimeZone.setDefault(TimeZone.getTimeZone("UTC"));

        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        // calculate amount of days
        int oneDayInMillis = 24*60*60*1000;
        long diffInMillis = toDateInMillis - fromDateInMillis;
        System.out.println("diffInMillis: " + diffInMillis);

        long diffInDays = diffInMillis / oneDayInMillis;
        System.out.println("diffInDays: " + diffInDays);


        int oneDay = 1;
        int days = Math.round(diffInDays);
        System.out.println("fromDateToDate Days spent: " + days);

        TotalsDataService.TotalsData countAndTotalSumOfOrders = TotalsDataService.getCountAndTotalSumOfOrders(shop);

        Long today = beginOfDay(new Date(fromDateInMillis));
        TotalsDataService.TotalsData countAndTotalSumOfOrdersDayBefore = TotalsDataService.getCountAndTotalSumOfOrdersDayBefore(shop, today);

        JSONObject json = new JSONObject();
        json.put("allTime", countAndTotalSumOfOrders);
        json.put("dayBefore", countAndTotalSumOfOrdersDayBefore);

        List<PopularProucts> popularProductsList = PopularProductsService.getPopularProducts(shop, days);
        json.put("popularProducts", popularProductsList);

        BigInteger paidByCard = PaymentTypeService.getNumberOfPaymentsByCash(shop, days);

        BigInteger paidByCash = PaymentTypeService.getNumberOfPaymentsByCard(shop, days);

        JSONObject paymentCountByType = new JSONObject();
        paymentCountByType.put("paidByCard", paidByCard);
        paymentCountByType.put("paidByCash", paidByCash);
        json.put("paymentCountByType", paymentCountByType);

        List<FrequentBuyer> frequentBuyerList = FrequentBuyersService.getFrequentBuyerList(shop, days);
        json.put("frequentBuyers", frequentBuyerList);


        DateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
        List<JSONObject> list = new ArrayList<>();

        long currentDate = fromDateInMillis - oneDayInMillis;
        while (currentDate <= toDateInMillis - oneDayInMillis) {
            TotalsDataService.TotalsData totalsForDay = TotalsDataService.getCountAndTotalSumOfOrdersInGivenDateRange(shop, currentDate, currentDate + oneDayInMillis);
            currentDate = currentDate + oneDayInMillis;

            JSONObject item = new JSONObject();
            item.put("total", totalsForDay);

            String dayName = dateFormat.format(new Date(currentDate));
            item.put("day", dayName);

            list.add(item);
        }

        json.put("chartData", list);
        renderJSON(json);

    }

    public static void infoDay(String client, int numberOfDays) throws Exception { // /analytics
        Long today = beginOfDay(new Date());
        Long sevenDaysBefore = sevenDaysBefore(new Date());


        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);
        System.out.println("AnalyticsAPI number of days" + numberOfDays);

        if(numberOfDays == 0) {
            numberOfDays = 7;
        }

        TotalsDataService.TotalsData countAndTotalSumOfOrders = TotalsDataService.getCountAndTotalSumOfOrders(shop);


        TotalsDataService.TotalsData countAndTotalSumOfOrdersDayBefore = TotalsDataService.getCountAndTotalSumOfOrdersDayBefore(shop, sevenDaysBefore);

        JSONObject json = new JSONObject();

        System.out.println("AnalyticsAPI countAndTotalSumOfOrders" + countAndTotalSumOfOrders.toString());
        json.put("allTime", countAndTotalSumOfOrders);

        System.out.println("AnalyticsAPI countAndTotalSumOfOrdersDayBefore" + countAndTotalSumOfOrdersDayBefore.toString());
        json.put("dayBefore", countAndTotalSumOfOrdersDayBefore);

        List<PopularProucts> popularProductsList = PopularProductsService.getPopularProducts(shop, numberOfDays);
        json.put("popularProducts", popularProductsList);

        int daysFromToday = 30;

        BigInteger paidByCard = PaymentTypeService.getNumberOfPaymentsByCash(shop, daysFromToday);

        BigInteger paidByCash = PaymentTypeService.getNumberOfPaymentsByCard(shop, daysFromToday);

        JSONObject paymentCountByType = new JSONObject();
        paymentCountByType.put("paidByCard", paidByCard);
        paymentCountByType.put("paidByCash", paidByCash);
        json.put("paymentCountByType", paymentCountByType);

        List<FrequentBuyer> frequentBuyerList = FrequentBuyersService.getFrequentBuyerList(shop, daysFromToday);
        json.put("frequentBuyers", frequentBuyerList);

        String pattern = "MM/dd/yyyy";
        SimpleDateFormat dateFormat = new SimpleDateFormat(pattern, Locale.US);

        List<JSONObject> list = new ArrayList<JSONObject>();
        for (int i=0; i<7; i++) {
            Long dayStart = beginOfDay(subtractDay(new Date(today),-i));
            Long dayEnd = endOfDay(subtractDay(new Date(today),-i));

            Double dayTotal = TotalsDataService.getCountAndTotalSumOfOrdersInGivenDateRange(shop, dayStart, dayEnd).getTotalSum();
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

        TotalsDataService.TotalsData countAndTotalSumOfOrders = TotalsDataService.getCountAndTotalSumOfOrders(shop);

        Long thirtyDaysBefore = thirtyDaysBefore(new Date());
        TotalsDataService.TotalsData countAndTotalSumOfOrdersDayBefore = TotalsDataService.getCountAndTotalSumOfOrdersDayBefore(shop, thirtyDaysBefore);

        JSONObject json = new JSONObject();
        json.put("allTime", countAndTotalSumOfOrders);
        json.put("dayBefore", countAndTotalSumOfOrdersDayBefore);

        List<PopularProucts> popularProductsList = PopularProductsService.getPopularProducts(shop, numberOfDays);
        json.put("popularProducts", popularProductsList);

        String pattern = "MM/dd/yyyy";
        SimpleDateFormat dateFormat = new SimpleDateFormat(pattern, Locale.US);

        Long today = beginOfDay(new Date());
        List<JSONObject> list = new ArrayList<JSONObject>();
        for (int i=0; i<numberOfDays; i++) {
            Long dayStart = beginOfDay(subtractDay(new Date(today),-i));
            Long dayEnd = endOfDay(subtractDay(new Date(today),-i));

            Double dayTotal = TotalsDataService.getCountAndTotalSumOfOrdersInGivenDateRange(shop, dayStart, dayEnd).getTotalSum();
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

        TotalsDataService.TotalsData countAndTotalSumOfOrders = TotalsDataService.getCountAndTotalSumOfOrders(shop);

        Long nintyDaysBefore = nintyDaysBefore(new Date());
        TotalsDataService.TotalsData countAndTotalSumOfOrdersDayBefore = TotalsDataService.getCountAndTotalSumOfOrdersDayBefore(shop, nintyDaysBefore);

        JSONObject json = new JSONObject();
        json.put("allTime", countAndTotalSumOfOrders);
        json.put("dayBefore", countAndTotalSumOfOrdersDayBefore);

        List<PopularProucts> popularProductsList = PopularProductsService.getPopularProducts(shop, numberOfDays);
        json.put("popularProducts", popularProductsList);

        String pattern = "MM/dd/yyyy";
        SimpleDateFormat dateFormat = new SimpleDateFormat(pattern, Locale.US);

        Long today = beginOfDay(new Date());
        List<JSONObject> list = new ArrayList<JSONObject>();
        for (int i=0; i<numberOfDays; i++) {
            Long dayStart = beginOfDay(subtractDay(new Date(today),-i));
            Long dayEnd = endOfDay(subtractDay(new Date(today),-i));

            Double dayTotal = TotalsDataService.getCountAndTotalSumOfOrdersInGivenDateRange(shop, dayStart, dayEnd).getTotalSum();
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

        TotalsDataService.TotalsData countAndTotalSumOfOrders = TotalsDataService.getCountAndTotalSumOfOrders(shop);

        Long oneHundredEighty = onehundredeightyDaysBefore(new Date());
        TotalsDataService.TotalsData countAndTotalSumOfOrdersDayBefore = TotalsDataService.getCountAndTotalSumOfOrdersDayBefore(shop, oneHundredEighty);

        JSONObject json = new JSONObject();
        json.put("allTime", countAndTotalSumOfOrders);
        json.put("dayBefore", countAndTotalSumOfOrdersDayBefore);

        List<PopularProucts> popularProductsList = PopularProductsService.getPopularProducts(shop, numberOfDays);
        json.put("popularProducts", popularProductsList);

        String pattern = "MM/dd/yyyy";
        SimpleDateFormat dateFormat = new SimpleDateFormat(pattern, Locale.US);

        Long today = beginOfDay(new Date());
        List<JSONObject> list = new ArrayList<JSONObject>();
        for (int i=0; i<numberOfDays; i++) {
            Long dayStart = beginOfDay(subtractDay(new Date(today),-i));
            Long dayEnd = endOfDay(subtractDay(new Date(today),-i));

            Double dayTotal = TotalsDataService.getCountAndTotalSumOfOrdersInGivenDateRange(shop, dayStart, dayEnd).getTotalSum();
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

        TotalsDataService.TotalsData countAndTotalSumOfOrders = TotalsDataService.getCountAndTotalSumOfOrders(shop);

        Long three = threeHundredSixtyDaysBefore(new Date());
        TotalsDataService.TotalsData countAndTotalSumOfOrdersDayBefore = TotalsDataService.getCountAndTotalSumOfOrdersDayBefore(shop, three);

        JSONObject json = new JSONObject();
        json.put("allTime", countAndTotalSumOfOrders);
        json.put("dayBefore", countAndTotalSumOfOrdersDayBefore);

        List<PopularProucts> popularProductsList = PopularProductsService.getPopularProducts(shop, numberOfDays);
        json.put("popularProducts", popularProductsList);

        String pattern = "MM/dd/yyyy";
        SimpleDateFormat dateFormat = new SimpleDateFormat(pattern, Locale.US);

        Long today = beginOfDay(new Date());
        List<JSONObject> list = new ArrayList<JSONObject>();
        for (int i=0; i<numberOfDays; i++) {
            Long dayStart = beginOfDay(subtractDay(new Date(today),-i));
            Long dayEnd = endOfDay(subtractDay(new Date(today),-i));

            Double dayTotal = TotalsDataService.getCountAndTotalSumOfOrdersInGivenDateRange(shop, dayStart, dayEnd).getTotalSum();
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