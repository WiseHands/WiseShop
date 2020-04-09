package models;

import com.google.gson.annotations.Expose;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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

//    time values for hoursSetting page
    @Expose
    public  String monStartTime;
    @Expose
    public  String monEndTime;
    @Expose
    public boolean monOpen;

    @Expose
    public  String tueStartTime;
    @Expose
    public  String tueEndTime;
    @Expose
    public boolean tueOpen;

    @Expose
    public  String wedStartTime;
    @Expose
    public  String wedEndTime;
    @Expose
    public boolean wedOpen;

    @Expose
    public  String thuStartTime;
    @Expose
    public  String thuEndTime;
    @Expose
    public boolean thuOpen;

    @Expose
    public  String friStartTime;
    @Expose
    public  String friEndTime;
    @Expose
    public boolean friOpen;

    @Expose
    public  String satStartTime;
    @Expose
    public  String satEndTime;
    @Expose
    public boolean satOpen;

    @Expose
    public  String sunStartTime;
    @Expose
    public  String sunEndTime;
    @Expose
    public boolean sunOpen;
    
//  end time values for hoursSetting page
    @Expose
    public boolean isShowAmountTools;

    @Expose
    public String labelNameForBuyerNameFieldInShoppingCart;

    @Expose
    public boolean alwaysOpen;

    @Expose
    public boolean isTemporaryClosed;

    @Expose
    public String temporaryClosedTitle;

    @Expose
    public String temporaryClosedDescription;

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
    public String faceBookPixelApiKey;

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

    @Expose
    @OneToMany(cascade=CascadeType.ALL)
    public List<PageConstructorDTO> pagesList;

    @Expose
    @OneToOne(cascade=CascadeType.ALL)
    public PricingPlanDTO pricingPlan;

    @Expose
    public boolean isBalanceForShopLessThenCloseShop;

    @Transient
    private ShopNetworkDTO network;

    public String networkUuid;

    public ShopNetworkDTO getNetwork() {
        if(this.networkUuid != null) {
            this.network = ShopNetworkDTO.findById(networkUuid);
            System.out.println("ShopDTO initializing network" + this.networkUuid + this.network);
        }
        return  this.network;
    }

    public ShopDTO(){

    }

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
        this.paymentSettings = paymentSettings;
        this.balance = balance;
        this.delivery = delivery;
        this.contact = contact;
        this.shopName = shopName;
        this.liqpayPublicKey = liqpayPublicKey;
        this.liqpayPrivateKey = liqpayPrivateKey;
        this.visualSettingsDTO = visualSettingsDTO;
        this.domain = customDomain;
        this.locale = locale;
        this.alwaysOpen = true;
        this.isTemporaryClosed = true;
    }

    public List<CategoryDTO> getActiveCategories() {
        return this.categoryList.stream()
                .filter(category -> !category.isHidden)
                .collect(Collectors.toList());
    }
}
