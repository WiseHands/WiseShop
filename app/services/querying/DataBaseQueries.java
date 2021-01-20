package services.querying;

import models.*;
import play.db.jpa.JPA;

import java.util.ArrayList;
import java.util.List;

public class DataBaseQueries {

    public static void changePriceAccordingToCurrency(ProductDTO product, ShopDTO shop, String selectedCurrency){

        CurrencyShopDTO currencyShop = CurrencyShopDTO.find("byShop", shop).first();
        if (selectedCurrency.isEmpty()){
            currencyShop.selectedCurrency = null;
            currencyShop.save();
        } else {
            currencyShop.selectedCurrency = selectedCurrency;
            boolean isSelectedCurrencyNotEqualShopCurrency = !currencyShop.currency.equals(currencyShop.selectedCurrency);
            if (currencyShop.currency.equals("UAH")){
                if (isSelectedCurrencyNotEqualShopCurrency) {
                    String currencyQuery = "select c from CurrencyDTO c where c.base_ccy = ?1 and c.ccy = ?2";
                    CurrencyDTO currency = CurrencyDTO.find(currencyQuery, currencyShop.currency, selectedCurrency).first();
                    product.priceInCurrency = product.price / currency.sale;
                    product.save();
                }
            }
            if (currencyShop.currency.equals("USD")){
                if (isSelectedCurrencyNotEqualShopCurrency) {
                    calculateProductPriceToCurrency(currencyShop.currency, selectedCurrency, product);
                }
            }
            if (currencyShop.currency.equals("EUR")){
                if (isSelectedCurrencyNotEqualShopCurrency) {
                    calculateProductPriceToCurrency(currencyShop.currency, selectedCurrency, product);

                }
            }
            currencyShop.save();
        }
        shop.currencyShop = currencyShop;
    }

    private static void calculateProductPriceToCurrency(String shopCurrency, String selectedCurrency, ProductDTO product) {
        if (selectedCurrency.equals("UAH")){
            String currencyQuery = "select c from CurrencyDTO c where c.base_ccy = ?1 and c.ccy = ?2";
            CurrencyDTO currency = CurrencyDTO.find(currencyQuery, selectedCurrency, shopCurrency).first();
            product.priceInCurrency = product.price * currency.buy;
        } else {
            product.priceInCurrency = changePriceToUsdOrEurCurrency(shopCurrency, selectedCurrency, product);
        }
        product.save();
    }

    private static double changePriceToUsdOrEurCurrency(String currency, String selectedCurrency, ProductDTO product) {
        CurrencyDTO currencyToShop = CurrencyDTO.find("select c from CurrencyDTO c where c.ccy = ?1", currency).first();
        CurrencyDTO currencyToShopSelected = CurrencyDTO.find("select c from CurrencyDTO c where c.ccy = ?1", selectedCurrency).first();
        return product.price * (currencyToShop.buy / currencyToShopSelected.buy);
    }

    public static List<FeedbackDTO> getFeedbackList(ProductDTO product) {
        String query = "SELECT customerName, feedbackTime, quality, review, FeedbackCommentDTO.comment FROM FeedbackDTO" +
                " LEFT JOIN FeedbackCommentDTO" +
                " ON FeedbackDTO.feedbackComment_uuid = FeedbackCommentDTO.uuid" +
                " WHERE showReview = 1 and productUuid = '%s' order by feedbackTime desc";
        String feedbackListQuery = formatQueryString(query, product);
        List<Object[]> resultList = JPA.em().createNativeQuery(feedbackListQuery).getResultList();
        List<FeedbackDTO> feedbackResultList = new ArrayList<FeedbackDTO>();

        for (Object[] item: resultList){
            FeedbackDTO feedback = createFeedbackDTO(item);
            feedbackResultList.add(feedback);
        }

        return feedbackResultList;
    }

    private static FeedbackDTO createFeedbackDTO(Object[] item) {
        String customerName = (String) item[0];
        Long feedbackTime = Long.valueOf(String.valueOf(item[1]));
        String quality = (String) item[2];
        String review = (String) item[3];
        String comment = (String) item[4];
        System.out.println("FeedbackDTO => " + customerName + feedbackTime + quality + review + comment);
        FeedbackDTO feedback = new FeedbackDTO(quality, review, customerName, feedbackTime);
        feedback.comment = comment;
        return feedback;
    }

    private static String formatQueryString(String query, ProductDTO product) {
        String formattedQuery = String.format(
                query,
                product.uuid);
        return formattedQuery;
    }

}
