package models;

import com.google.gson.annotations.Expose;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;

import javax.persistence.*;

@Entity
public class CurrencyDTO extends GenericModel {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Expose
    public String uuid;

    @Expose
    public String ccy;

    @Expose
    public String base_ccy;

    @Expose
    public double buy;

    @Expose
    public double sale;

    @ManyToOne
    public CurrencyShopDTO currencyShop;

    public CurrencyDTO(String ccy, String base_ccy, double buy, double sale){
        this.ccy = ccy;
        this.base_ccy = base_ccy;
        this.buy = buy;
        this.sale = sale;
    }

}
