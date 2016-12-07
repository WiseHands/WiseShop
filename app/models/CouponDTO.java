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
    public double percentDiscount;

    @Expose
    public String couponId;

    @Expose
    public Boolean used;

    @Expose
    public String orderUuid;

    public String shopUuid;

    public CouponDTO(Double percentDiscount, String couponId, String shopUuid){
        this.percentDiscount = percentDiscount;
        this.couponId = couponId;
        this.shopUuid = shopUuid;
    }
}
