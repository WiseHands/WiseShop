package jobs;


import com.google.gson.JsonElement;

import com.google.gson.JsonObject;
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
        System.out.println(" Get Daily currency job => " + currencyJson);
        JSONParser parser = new JSONParser();
        JSONArray currencyJsonArray = null;
        try {
            currencyJsonArray = (JSONArray) parser.parse(currencyJson);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        List<ShopDTO> shopList = ShopDTO.findAll();
        for (ShopDTO shop : shopList){
//            if (shop.currencyShop.currency != null) {
                setCurrencyListToShop(shop, currencyJsonArray);
//            }
        }

    }

    private void setCurrencyListToShop(ShopDTO shop, JSONArray currencyJsonArray) {

        System.out.println("setCurrencyListToShop => " + currencyJsonArray);
//        CurrencyShopDTO currencyShop = CurrencyShopDTO.find("byShop", shop).first();
        for (int i = 0; i < currencyJsonArray.size(); i++) {

        }
//        currencyShop.addCurrency(getCurrency());


//        JSONObject title = (JSONObject) jsonArray.get(0);
//        JsonArray jsonArray = json.getAsJsonArray();
//        for (JsonElement element : jsonArray){
//            JsonObject jsonObject = element.getAsJsonObject();
//            createCurrency(jsonObject);
//        System.out.println("currency json => " + (String) title.get("ccy"));

    }


    private static void createCurrency(JsonObject element) {
        String ccy, base_ccy;
        double buy, sale;
//        if (element.get("ccy") != null) {
//            ccy = (String) element.get("ccy");
//        }

    }

}
