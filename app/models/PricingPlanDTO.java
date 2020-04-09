package models;

import com.google.gson.annotations.Expose;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;

import javax.persistence.*;

@Entity
public class PricingPlanDTO extends GenericModel {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Expose
    public String uuid;

    @Expose
    public String name;

    @Expose
    public Double commissionFee;

    @Expose
    public Double monthlyFee;


    @OneToOne(cascade=CascadeType.ALL)
    public ShopDTO shop;

    public PricingPlanDTO(String pricingPlanName, Double commissionFee, Double monthlyFee){
        this.name = pricingPlanName;
        this.commissionFee = commissionFee;
        this.monthlyFee = monthlyFee;
    }
}
