package util;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

public class CurrencySign {

    public  String usd = String.valueOf('\u0024');
    public  String eur = String.valueOf('\u20ac');
    public  String uah = String.valueOf('\u20B4');
    public  String plz = "Zl";

    public Map<String, String> currencySigns = new HashMap<String, String>();


    public CurrencySign() {
        currencySigns.put("USD", this.usd);
        currencySigns.put("EUR", this.eur);
        currencySigns.put("UAH", this.uah);
        currencySigns.put("PLZ", this.plz);
    }

    public String getUSD() {
        return usd;
    }

    public String getEUR() {
        return eur;
    }

    public String getUAH() {
        return uah;
    }

    public String getPLZ() {return plz; }





}
