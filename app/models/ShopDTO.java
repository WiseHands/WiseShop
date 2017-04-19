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
    public String googleWebsiteVerificator;

    @Expose
    public String googleAnalyticsCode;

    @Expose
    public String googleMapsApiKey;

    @Expose
    public String googleStaticMapsApiKey;

    @Expose
    public String locale;

    @OneToOne(cascade=CascadeType.ALL)
    public BalanceDTO balance;

    @ManyToMany(cascade=CascadeType.ALL)
    public List<UserDTO> userList;

    @Expose
    @OneToOne(cascade=CascadeType.ALL)
    public DeliveryDTO delivery;

    @Expose
    @OneToOne(cascade=CascadeType.ALL)
    public PaymentSettingsDTO paymentSettings;

    @Expose
    @OneToOne(cascade=CascadeType.ALL)
    public VisualSettingsDTO visualSettingsDTO;

    @Expose
    @OneToOne(cascade=CascadeType.ALL)
    public ContactDTO contact;

    @OneToMany(orphanRemoval=true)
    public List<ProductDTO> productList;

    @OneToMany(orphanRemoval=true)
    public List<CategoryDTO> categoryList;

    @OneToMany(cascade = CascadeType.ALL)
    public List<OrderDTO> orders;

    public ShopDTO(List<UserDTO> users,
                   PaymentSettingsDTO paymentSettings,
                   DeliveryDTO delivery,
                   ContactDTO contact,
                   BalanceDTO balance,
                   VisualSettingsDTO visualSettingsDTO,
                   String shopName,
                   String liqpayPublicKey,
                   String liqpayPrivateKey,
                   String customDomain,
                   String locale) {


        this.userList = users;

        for (UserDTO user : users) {
            if(user.shopList == null) {
                user.shopList = new ArrayList<ShopDTO>();
            }
            user.shopList.add(this);
        }
        this.balance = balance;

        this.delivery = delivery;
        this.paymentSettings = paymentSettings;
        this.contact = contact;
        this.shopName = shopName;
        this.liqpayPublicKey = liqpayPublicKey;
        this.liqpayPrivateKey = liqpayPrivateKey;
        this.visualSettingsDTO = visualSettingsDTO;
        this.domain = customDomain;
        this.locale = locale;
    }
}
