package json.shoppingcart;

import com.google.gson.annotations.Expose;
import models.CurrencyDTO;

import java.util.List;

public class CurrencyShopConfiguration {

    @Expose
    public String currency;

    @Expose
    public List<CurrencyDTO> currencyList;

    public CurrencyShopConfiguration(String currency, List<CurrencyDTO> currencyList){
        this.currency = currency;
        this.currencyList = currencyList;
    }


}
