package models;

import com.google.gson.annotations.Expose;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;
import util.CurrencySign;

import javax.persistence.*;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.codehaus.groovy.runtime.DefaultGroovyMethods.round;

@Entity
public class CurrencyShopDTO extends GenericModel {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Expose
    public String uuid;

    @Expose
    public String currencyShop;

    @Expose
    public String selectedCurrency;

    @Expose
    public double productPrice = 0;

    @OneToOne(cascade=CascadeType.ALL)
    public ShopDTO shop;

    @Expose
    @OneToMany(cascade=CascadeType.ALL)
    public List<CurrencyDTO> currencyList;

    public void addCurrency(CurrencyDTO currency){
        if (this.currencyList == null){
            this.currencyList = new ArrayList<CurrencyDTO>();
        }
        this.currencyList.add(currency);
    }

    public CurrencyShopDTO(ShopDTO shop) {
        this.shop = shop;
        this.currencyShop = "UAH";
        this.currencyList = new ArrayList<CurrencyDTO>();
    }

    public char currencyFormat(String currencyValue){
        if (currencyValue.isEmpty()) {
            currencyValue = this.currencyShop;
        }
        return new CurrencySign().currencySigns.get(currencyValue);
    }

    public String showCurrency(){
        return this.selectedCurrency.isEmpty() ? this.currencyShop : this.selectedCurrency;
    }

    public double formatPrice(ProductDTO product) {
        boolean isSelectedCurrencyEqualShopCurrency = this.selectedCurrency.equals(this.currencyShop);
        if (this.selectedCurrency.isEmpty()){
            return product.formatPrice();
        } else if (isSelectedCurrencyEqualShopCurrency){
            return product.formatPrice();
        } else {
            return round(product.productPriceCurrency, 2);
        }
    }






}
