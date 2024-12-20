package controllers;

import json.FrequentBuyer;
import json.PopularProducts;
import models.ShopDTO;
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
        checkAuthentication(shop);

        // calculate amount of days
        long diffInMillis = toDateInMillis - fromDateInMillis;
        int oneDayInMillis = 24*60*60*1000;

        long diffInDays = diffInMillis / oneDayInMillis;
        int days = Math.round(diffInDays);
        System.out.println("fromDateToDate => " + fromDateInMillis + "to" + toDateInMillis + "\n analytic for days => " + days);

        TotalsDataService.TotalsData countAndTotalSumOfOrders = TotalsDataService.getCountAndTotalSumOfOrders(shop);

        Long today = beginOfDay(new Date(fromDateInMillis));

        TotalsDataService.TotalsData countAndTotalSumOfOrdersDayBefore = TotalsDataService.getCountAndTotalSumOfOrdersInGivenDateRange(shop, today, toDateInMillis);


        JSONObject json = new JSONObject();
        json.put("allTime", countAndTotalSumOfOrders);
        json.put("dayBefore", countAndTotalSumOfOrdersDayBefore);

        List<PopularProducts> popularProductsList = PopularProductsService.getPopularProducts(shop, days);
        json.put("popularProducts", popularProductsList);
        System.out.println("popularProductsList => " +  popularProductsList);

        BigInteger paidByCash = PaymentTypeService.getNumberOfPaymentsByCash(shop, days);
        BigInteger paidByCard = PaymentTypeService.getNumberOfPaymentsByCard(shop, days);

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

    private static Long beginOfDay(Date date) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);

        return cal.getTimeInMillis();
    }

}