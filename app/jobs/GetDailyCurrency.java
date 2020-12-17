package jobs;


import com.google.gson.JsonElement;

import com.google.gson.JsonObject;
import models.CurrencyDTO;
import models.CurrencyShopDTO;
import models.ShopDTO;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import play.jobs.Every;
import play.jobs.Job;
import play.jobs.On;
import play.libs.WS;
import services.translaiton.Translation;

import java.util.List;

//@On("0 0 12 * * ?")
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

        for (int i = 0; i < currencyJsonArray.size(); i++) {
            JSONObject object = (JSONObject) currencyJsonArray.get(i);
            CurrencyDTO currency = getCurrency(object, currencyShop);
            currencyShop.addCurrency(currency);
        }
        currencyShop.save();
    }

    private CurrencyDTO getCurrency(JSONObject object, CurrencyShopDTO currencyShop) {

        String ccy = (String) object.get("ccy");
        String baseCurrency = (String) object.get("base_ccy");
        double buy = Double.parseDouble((String) object.get("buy"));
        double sale = Double.parseDouble((String) object.get("sale"));

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
