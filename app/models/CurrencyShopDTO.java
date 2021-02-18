package models;

import com.google.gson.annotations.Expose;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;
import util.CurrencySign;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

import static org.codehaus.groovy.runtime.DefaultGroovyMethods.round;

@Entity
public class CurrencyShopDTO extends GenericModel {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Expose
    public String uuid;

    @Expose
    public String currency;

    @Expose
    public String selectedCurrency = "";

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

    public CurrencyShopDTO() { }

    public CurrencyShopDTO(ShopDTO shop) {
        this.shop = shop;
        this.currency = "UAH";
        this.currencyList = new ArrayList<CurrencyDTO>();
    }

    public String currencyFormat(String currencyValue) {
        if (currencyValue.isEmpty()) {
            currencyValue = this.currency;
        }
        System.out.println("currencyFormat in currencyShopDTO => " + currencyValue);

        return new CurrencySign().currencySigns.get(currencyValue);
    }

    public String showCurrency(){
        return this.selectedCurrency == null || this.selectedCurrency.isEmpty() ? this.currency : this.selectedCurrency;
    }

    public double formatPrice(ProductDTO product) {
        boolean isSelectedCurrencyEqualShopCurrency = false;
        if (this.selectedCurrency != null){
            isSelectedCurrencyEqualShopCurrency = this.selectedCurrency.equals(this.currency);
        }
        if (this.selectedCurrency == null || this.selectedCurrency.isEmpty()){
            return product.formatPrice();
        } else if (isSelectedCurrencyEqualShopCurrency){
            return product.formatPrice();
        } else {
            return round(product.priceInCurrency, 2);
        }
    }

    public boolean isDefaultCurrencyNotEqualSelectedCurrency(String selectedCurrency){
        if (selectedCurrency.isEmpty()) {
            return false;
        } else {
            return !(this.currency.equals(selectedCurrency));
        }

    }

}
