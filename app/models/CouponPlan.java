package models;

import com.google.gson.annotations.Expose;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class CouponPlan extends GenericModel {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Expose
    public String uuid;

    public String couponUuid; //DTO

    @Expose
    public Long percentDiscount;

    @Expose
    public Long minimalOrderTotal;


    public CouponPlan(Long percentDiscount, Long minimalOrderTotal, String couponUuid){
        this.percentDiscount = percentDiscount;
        this.minimalOrderTotal = minimalOrderTotal;
        this.couponUuid = couponUuid;
    }
}
