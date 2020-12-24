package util;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

public class CurrencySign {

    public  Character usd = '\u0024';
    public  Character eur = '\u20ac';
    public  Character uah = '\u20B4';

    public Map<String, Character> currencySigns = new HashMap<String, Character>();


    public CurrencySign() {
        currencySigns.put("USD", this.usd);
        currencySigns.put("EUR", this.eur);
        currencySigns.put("UAH", this.uah);
    }

    public char getUSD() {
        return usd;
    }

    public char getEUR() {
        return eur;
    }

    public char getUAH() {
        return uah;
    }





}
