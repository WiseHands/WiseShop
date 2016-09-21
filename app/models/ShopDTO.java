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
    public String startTime;

    @Expose
    public String endTime;

    @Expose
    public String liqpayPublicKey;

    @Expose
    public String liqpayPrivateKey;

    @Expose
    public String googleWebsiteViryficator;

    @Expose
    public String googleAnalyticsCode;

    @ManyToMany
    public List<UserDTO> userList;

    @Expose
    @OneToOne
    public DeliveryDTO delivery;

    @Expose
    @OneToOne
    public ContactDTO contact;

    public ShopDTO(List<UserDTO> users,
                   DeliveryDTO delivery,
                   ContactDTO contact,
                   String shopName,
                   String liqpayPublicKey,
                   String liqpayPrivateKey,
                   String customDomain) {


        this.userList = users;

        for (UserDTO user : users) {
            if(user.shopList == null) {
                user.shopList = new ArrayList<ShopDTO>();
            }
            user.shopList.add(this);
        }

        this.delivery = delivery;
        this.contact = contact;
        this.shopName = shopName;
        this.liqpayPublicKey = liqpayPublicKey;
        this.liqpayPrivateKey = liqpayPrivateKey;
        this.domain = customDomain;
    }
}
