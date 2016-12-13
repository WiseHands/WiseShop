package models;

import com.google.gson.annotations.Expose;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class CouponDTO extends GenericModel {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Expose
    public String uuid;

    @Expose
    @OneToMany
    public List<CouponPlan> plans;

    @Expose
    @OneToMany
    public List<CouponId> couponIds;

    public String shopUuid;

    public CouponDTO(List<CouponPlan> plans, List<CouponId> couponIds, String shopUuid){
        this.plans = plans;
        this.couponIds = couponIds;
        this.shopUuid = shopUuid;
    }
}
