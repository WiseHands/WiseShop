package models;

import com.google.gson.annotations.Expose;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;

import javax.persistence.*;
import java.util.List;

@Entity
public class CouponId extends GenericModel {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Expose
    public String uuid;


    public String couponUuid; //DTO

    @Expose
    public Boolean used;

    @Expose
    public String orderUuid;

    @Expose
    public String couponId;


    public CouponId(String couponId, String couponUuid){
        this.couponId = couponId;
        this.couponUuid = couponUuid;
    }
}
