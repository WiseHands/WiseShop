package models;

import com.google.gson.annotations.Expose;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Currency;
import java.util.List;

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
    @OneToMany(cascade=CascadeType.ALL)
    List<CurrencyDTO> currencyList;

    @OneToOne(cascade=CascadeType.ALL)
    public ShopDTO shop;

    public CurrencyShopDTO() {
        if(currencyList == null) {
            currencyList = new ArrayList<CurrencyDTO>();
        }
    }




}
