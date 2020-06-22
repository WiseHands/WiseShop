package models;

import com.google.gson.annotations.Expose;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;

import javax.persistence.*;

@Entity
public class WorkingDayDTO extends GenericModel {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Expose
    public String uuid;

    @Expose
    public String day;

    @Expose
    public String openTime;

    @Expose
    public String closeTime;

    @Expose
    public boolean isShopOpenToday;

    @ManyToOne
    public ShopDTO shop;


}
