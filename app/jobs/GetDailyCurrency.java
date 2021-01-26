package jobs;


import models.CurrencyDTO;
import models.CurrencyShopDTO;
import models.ShopDTO;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import play.jobs.Every;
import play.jobs.Job;
import play.libs.WS;

import java.util.ArrayList;
import java.util.List;

@Every("6h")
public class GetDailyCurrency extends Job {

    public void doJob() throws Exception {

        WS.HttpResponse firstCurrencyResponse = WS.url("https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11").get();
        // TODO get PZt from second array and add to first array
        WS.HttpResponse secondCurrencyResponseGetPlz = WS.url("https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=12").get();
        String currencyJson = firstCurrencyResponse.getString();
        if (!currencyJson.isEmpty()){
            JSONParser parser = new JSONParser();
            JSONArray currencyJsonArray = (JSONArray) parser.parse(currencyJson);
            List<ShopDTO> shopList = ShopDTO.findAll();
            for (ShopDTO shop : shopList){
                setCurrencyListToShop(shop, currencyJsonArray);
            }
        }

    }

    private void setCurrencyListToShop(ShopDTO shop, JSONArray currencyJsonArray) {
        CurrencyShopDTO currencyShop = CurrencyShopDTO.find("byShop", shop).first();
        if (currencyShop == null){
            currencyShop = new CurrencyShopDTO(shop);
            currencyShop.save();
            shop.save();
        }
        if (currencyShop.currencyList.isEmpty()) {
            for (Object object : currencyJsonArray) {
                JSONObject jsonObject = (JSONObject) object;
                currencyShop.addCurrency(getCurrency(jsonObject));
            }
        } else {
            for (int i = 0; i < currencyJsonArray.size(); i++) {
                JSONObject jsonObject = (JSONObject) currencyJsonArray.get(i);
                updateCurrency(jsonObject, currencyShop.currencyList.get(i));
            }
            System.out.println("currencyList in job is full => " + currencyShop.currencyList);
        }
        currencyShop.save();
    }

    private CurrencyDTO updateCurrency(JSONObject jsonObject, CurrencyDTO currency) {

        String ccy = (String) jsonObject.get("ccy");
        String baseCurrency = (String) jsonObject.get("base_ccy");
        double buy = Double.parseDouble((String) jsonObject.get("buy"));
        double sale = Double.parseDouble((String) jsonObject.get("sale"));

        currency.ccy = ccy;
        currency.base_ccy = baseCurrency;
        currency.buy = buy;
        currency.sale = sale;
        currency.save();
        return currency;

    }

    private CurrencyDTO getCurrency(JSONObject jsonObject) {

        String ccy = (String) jsonObject.get("ccy");
        String baseCurrency = (String) jsonObject.get("base_ccy");
        double buy = Double.parseDouble((String) jsonObject.get("buy"));
        double sale = Double.parseDouble((String) jsonObject.get("sale"));

        CurrencyDTO currency = new CurrencyDTO(ccy, baseCurrency, buy, sale);
        currency.save();
        return currency;
    }

}
