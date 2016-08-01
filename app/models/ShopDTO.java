package models;

import com.google.gson.annotations.Expose;
import enums.OrderState;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class ShopDTO extends GenericModel {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Expose
    public String uuid;

    @Expose
    public String shopName;

    @Expose
    public String domain;

    @Expose
    public String liqpayPublicKey;

    @Expose
    public String liqpayPrivateKey;

    @ManyToOne
    public UserDTO user;

    @Expose
    @OneToOne
    public DeliveryDTO delivery;

    public ShopDTO(UserDTO user, DeliveryDTO delivery,
                     String shopName,
                     String liqpayPublicKey,
                     String liqpayPrivateKey,
                     String customDomain) {
        if (user.shopList == null) {
            user.shopList = new ArrayList<ShopDTO>();
        }
        user.shopList.add(this);

        this.delivery = delivery;
        this.shopName = shopName;
        this.liqpayPublicKey = liqpayPublicKey;
        this.liqpayPrivateKey = liqpayPrivateKey;
        this.domain = customDomain;
        this.user = user;
    }
}
