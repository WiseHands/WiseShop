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

@Every("1min")
public class GetDailyCurrency extends Job {

    public void doJob() throws Exception {

        WS.HttpResponse response = WS.url("https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11").get();
        String currencyJson = response.getString();
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
        }
        // TODO check array on currency if true - find and rewrite
        if (currencyShop.currencyList.isEmpty()) {
            for (Object object : currencyJsonArray) {
                JSONObject jsonObject = (JSONObject) object;
                CurrencyDTO currency = getCurrency(jsonObject);
                currency.save();
                currencyShop.addCurrency(currency);
            }
            System.out.println("currencyList in job is empty => " + currencyShop.currencyList);
        } else {
            for (Object object : currencyJsonArray) {
                JSONObject jsonObject = (JSONObject) object;
                for (CurrencyDTO _currency : currencyShop.currencyList){
                    _currency.ccy = (String) jsonObject.get("ccy");
                    _currency.base_ccy = (String) jsonObject.get("base_ccy");
                    _currency.buy = Double.parseDouble((String) jsonObject.get("buy"));
                    _currency.sale  = Double.parseDouble((String) jsonObject.get("sale"));
                    _currency.save();
                }
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

        return currency;

    }

    private CurrencyDTO getCurrency(JSONObject jsonObject) {

        String ccy = (String) jsonObject.get("ccy");
        String baseCurrency = (String) jsonObject.get("base_ccy");
        double buy = Double.parseDouble((String) jsonObject.get("buy"));
        double sale = Double.parseDouble((String) jsonObject.get("sale"));

        CurrencyDTO currency = new CurrencyDTO(ccy, baseCurrency, buy, sale);

        return currency;
    }

}
