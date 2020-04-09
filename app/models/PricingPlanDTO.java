package models;

import com.google.gson.annotations.Expose;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

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

    public PricingPlanDTO(String pricingPlanName, Double commissionFee){
        this.name = pricingPlanName;
        this.commissionFee = commissionFee;
    }
}
