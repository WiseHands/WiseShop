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

import java.util.List;

@Every("6h")
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

        // TODO check array on currency if true - find anr rewrite

        for (Object object : currencyJsonArray) {
            JSONObject jsonObject = (JSONObject) object;
            CurrencyDTO currency = getCurrency(jsonObject, currencyShop);
            currencyShop.addCurrency(currency);
        }
        currencyShop.save();
    }

    private CurrencyDTO getCurrency(JSONObject jsonObject, CurrencyShopDTO currencyShop) {

        String ccy = (String) jsonObject.get("ccy");
        String baseCurrency = (String) jsonObject.get("base_ccy");
        double buy = Double.parseDouble((String) jsonObject.get("buy"));
        double sale = Double.parseDouble((String) jsonObject.get("sale"));

        CurrencyDTO currency = CurrencyDTO.find("byCurrencyShop", currencyShop).first();
        if (currency == null) {
            currency = new CurrencyDTO(ccy, baseCurrency, buy, sale);
        } else {
            currency.ccy = ccy;
            currency.base_ccy = baseCurrency;
            currency.buy = buy;
            currency.sale = sale;
        }
        currency.save();
        return currency;
    }

}
