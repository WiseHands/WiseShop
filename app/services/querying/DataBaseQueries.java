package services.querying;

import models.FeedbackDTO;
import models.ProductDTO;
import models.SelectedAdditionDTO;

import models.*;

import play.db.jpa.JPA;

import java.util.ArrayList;
import java.util.List;

import static org.codehaus.groovy.runtime.DefaultGroovyMethods.round;

public class DataBaseQueries {

    public static double exchangeTotalPriceForDefaultAdditions(double additionsPrice, ShopDTO shop, String selectedCurrency) {
        CurrencyShopDTO currencyShop = CurrencyShopDTO.find("byShop", shop).first();
        if (currencyShop == null) {
            return additionsPrice;
        }
        else if (selectedCurrency.isEmpty()){
            return additionsPrice;
        } else {
            currencyShop.selectedCurrency = selectedCurrency;
            boolean isSelectedCurrencyNotEqualShopCurrency = !currencyShop.currency.equals(currencyShop.selectedCurrency);
            if (currencyShop.currency.equals("UAH")){
                if (isSelectedCurrencyNotEqualShopCurrency) {
                    String currencyQuery = "select c from CurrencyDTO c where c.base_ccy = ?1 and c.ccy = ?2";
                    CurrencyDTO currency = CurrencyDTO.find(currencyQuery, currencyShop.currency, selectedCurrency).first();
                    double price = additionsPrice / currency.sale;
                    return price;
                }
            }
            if (currencyShop.currency.equals("USD")){
                if (isSelectedCurrencyNotEqualShopCurrency) {
                    if (selectedCurrency.equals("UAH")){
                        String currencyQuery = "select c from CurrencyDTO c where c.base_ccy = ?1 and c.ccy = ?2";
                        CurrencyDTO currency = CurrencyDTO.find(currencyQuery, selectedCurrency, currencyShop.currency).first();
                        return additionsPrice * currency.buy;
                    } else {
                        CurrencyDTO currencyDTO = CurrencyDTO.find("select c from CurrencyDTO c where c.ccy = ?1", currencyShop.currency).first();
                        CurrencyDTO currencyDTOSelected = CurrencyDTO.find("select c from CurrencyDTO c where c.ccy = ?1", selectedCurrency).first();
                        return additionsPrice * (currencyDTO.buy / currencyDTOSelected.buy);
                    }
                }
            }
            if (currencyShop.currency.equals("EUR")){
                if (isSelectedCurrencyNotEqualShopCurrency) {
                    if (selectedCurrency.equals("UAH")){
                        String currencyQuery = "select c from CurrencyDTO c where c.base_ccy = ?1 and c.ccy = ?2";
                        CurrencyDTO currency = CurrencyDTO.find(currencyQuery, selectedCurrency, currencyShop.currency).first();
                        return additionsPrice * currency.buy;
                    } else {
                        CurrencyDTO currencyDTO = CurrencyDTO.find("select c from CurrencyDTO c where c.ccy = ?1", currencyShop.currency).first();
                        CurrencyDTO currencyDTOSelected = CurrencyDTO.find("select c from CurrencyDTO c where c.ccy = ?1", selectedCurrency).first();
                        return additionsPrice * (currencyDTO.buy / currencyDTOSelected.buy);
                    }
                }
            }
            return additionsPrice;
        }
    }

    public static void changePriceAccordingToCurrency(ProductDTO product, ShopDTO shop, String selectedCurrency, List<SelectedAdditionDTO> defaultAdditions){

        CurrencyShopDTO currencyShop = CurrencyShopDTO.find("byShop", shop).first();
        if (selectedCurrency.isEmpty()){
            currencyShop.selectedCurrency = null;
            currencyShop.save();
        } else {
            currencyShop.selectedCurrency = selectedCurrency;
            boolean isSelectedCurrencyNotEqualShopCurrency = !currencyShop.currency.equals(currencyShop.selectedCurrency);
            if (currencyShop.currency.equals("UAH") && isSelectedCurrencyNotEqualShopCurrency){
                String currencyQuery = "select c from CurrencyDTO c where c.base_ccy = ?1 and c.ccy = ?2";
                CurrencyDTO currency = CurrencyDTO.find(currencyQuery, currencyShop.currency, selectedCurrency).first();
                product.priceInCurrency = round(product.price / currency.sale, 2);
                product.save();
                exchangeCurrencyForAdditionsInUAHShop(product, currency, defaultAdditions);
            } else if (currencyShop.currency.equals("UAH") && !isSelectedCurrencyNotEqualShopCurrency){
                product.priceInCurrency = 0;
                product.save();
            } else if (currencyShop.currency.equals("USD") && isSelectedCurrencyNotEqualShopCurrency){
                exchangeCurrencyToProduct(currencyShop.currency, selectedCurrency, product, defaultAdditions);
            } else if (currencyShop.currency.equals("USD") && !isSelectedCurrencyNotEqualShopCurrency){
                product.priceInCurrency = 0;
                product.save();
            } else if (currencyShop.currency.equals("EUR") && isSelectedCurrencyNotEqualShopCurrency){
                exchangeCurrencyToProduct(currencyShop.currency, selectedCurrency, product, defaultAdditions);
            } else if (currencyShop.currency.equals("EUR") && !isSelectedCurrencyNotEqualShopCurrency){
                product.priceInCurrency = 0;
                product.save();
            } else if (currencyShop.currency.equals("PLZ") && isSelectedCurrencyNotEqualShopCurrency){
                exchangeCurrencyToProduct(currencyShop.currency, selectedCurrency, product, defaultAdditions);
            } else if (currencyShop.currency.equals("PLZ") && !isSelectedCurrencyNotEqualShopCurrency){
                product.priceInCurrency = 0;
                product.save();
            }
            currencyShop.save();
        }
        shop.currencyShop = currencyShop;
    }

    private static void exchangeCurrencyForAdditionsInUAHShop(ProductDTO product, CurrencyDTO currency, List<SelectedAdditionDTO> defaultAdditions) {
        if (!defaultAdditions.isEmpty()){
            for (int i = 0; i < defaultAdditions.size(); i++){
                defaultAdditions.get(i).addition.price =
                        round(defaultAdditions.get(i).addition.price / currency.buy, 2);

            }
            if (!product.selectedAdditions.isEmpty()){
                for (int i = 0; i < product.selectedAdditions.size(); i++){
                    product.selectedAdditions.get(i).addition.price =
                            round(defaultAdditions.get(i).addition.price / currency.buy, 2);

                }
            }
        }
    }

    private static void exchangeCurrencyToProduct(String shopCurrency, String selectedCurrency, ProductDTO product, List<SelectedAdditionDTO> defaultAdditions) {
        if (selectedCurrency.equals("UAH")){
            String currencyQuery = "select c from CurrencyDTO c where c.base_ccy = ?1 and c.ccy = ?2";
            CurrencyDTO currency = CurrencyDTO.find(currencyQuery, selectedCurrency, shopCurrency).first();
            product.priceInCurrency = round(product.price * currency.buy, 2);
            product.save();
            exchangeCurrencyForAdditionsInUahSelected(product, currency, defaultAdditions);
        } else {
            product.priceInCurrency = changePriceToUsdEurPlzCurrency(shopCurrency, selectedCurrency, product, defaultAdditions);
            product.save();
        }
        product.save();
    }

    private static void exchangeCurrencyForAdditionsInUahSelected(ProductDTO product, CurrencyDTO currency, List<SelectedAdditionDTO> defaultAdditions) {
        if (!defaultAdditions.isEmpty()){
            for (int i = 0; i < defaultAdditions.size(); i++){
                defaultAdditions.get(i).addition.price =
                        round(defaultAdditions.get(i).addition.price * currency.buy, 2);
            }
            if (!product.selectedAdditions.isEmpty()){
                for (int i = 0; i < product.selectedAdditions.size(); i++){
                    product.selectedAdditions.get(i).addition.price =
                            round(defaultAdditions.get(i).addition.price * currency.buy, 2);
                }
            }
        }
    }

    private static double changePriceToUsdEurPlzCurrency(String currency, String selectedCurrency, ProductDTO product, List<SelectedAdditionDTO> defaultAdditions) {
        CurrencyDTO currencyDTO = CurrencyDTO.find("select c from CurrencyDTO c where c.ccy = ?1", currency).first();
        CurrencyDTO currencyDTOSelected = CurrencyDTO.find("select c from CurrencyDTO c where c.ccy = ?1", selectedCurrency).first();
        exchangeCurrencyForAdditions(product, currencyDTO, currencyDTOSelected, defaultAdditions);
        return round( product.price * (currencyDTO.buy / currencyDTOSelected.buy), 2);
    }

    private static void exchangeCurrencyForAdditions(ProductDTO product, CurrencyDTO currencyDTO, CurrencyDTO currencyDTOSelected, List<SelectedAdditionDTO> defaultAdditions) {
        if (!defaultAdditions.isEmpty()){
            for (int i = 0; i < defaultAdditions.size(); i++){
                defaultAdditions.get(i).addition.price =
                        round(defaultAdditions.get(i).addition.price * (currencyDTO.buy / currencyDTOSelected.buy), 2);
            }
            if (!product.selectedAdditions.isEmpty()){
                for (int i = 0; i < product.selectedAdditions.size(); i++){
                    product.selectedAdditions.get(i).addition.price =
                            round(product.selectedAdditions.get(i).addition.price * (currencyDTO.buy / currencyDTOSelected.buy),2);
                }
            }
        }
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

    public static List<SelectedAdditionDTO> checkIsAdditionDefaultToProduct(ProductDTO product) {
        List<SelectedAdditionDTO> defaultAdditionList = new ArrayList<>();
        String additionIsDefaultQuery = "select a from SelectedAdditionDTO a where a.isDefault = 1 and a.productUuid = ?1";
        defaultAdditionList = SelectedAdditionDTO.find(additionIsDefaultQuery, product.uuid).fetch();
        if (!defaultAdditionList.isEmpty()){
            return defaultAdditionList;
        } else {
            return defaultAdditionList;
        }
    }

    public static List<String> getDefaultAdditionsUuid(ProductDTO product) {
        List<String> additionList = new ArrayList<>();
        String query = "select addition_uuid from SelectedAdditionDTO where isDefault = 1 and productUuid = '%s'";
        String additionsUuidQuery = formatQueryString(query, product);
        additionList = JPA.em().createNativeQuery(additionsUuidQuery).getResultList();
        if (additionList.isEmpty()){
            return additionList;
        } else {
            return additionList;
        }

    }

    public static int getTotalPriceForDefaultAdditions(String productUuid) {
        String query = "SELECT sum(price) FROM AdditionDTO WHERE" +
                " uuid IN (SELECT addition_uuid FROM SelectedAdditionDTO" +
                " where productUuid='%s' AND isDefault = 1);";
        String stringQueryFormat = String.format(query, productUuid);
        Double totalPrice = (Double) JPA.em().createNativeQuery(stringQueryFormat).getSingleResult();
        if (totalPrice == null)
            return 0;
        else {
            int total = totalPrice.intValue();
            return total;
        }
    }

    public static ProductDTO hideDefaultAddition(ProductDTO product) {
        product.defaultAdditions = new ArrayList<>();
        product.priceWithAdditions = 0.0;
        return product;
    }

}
