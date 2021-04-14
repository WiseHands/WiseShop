package models;

import com.google.gson.annotations.Expose;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;

import javax.persistence.*;

@Entity
public class VisualSettingsDTO extends GenericModel {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Expose
    public String uuid;

    @Expose
    public String navbarColor;

    @Expose
    public String navbarTextColor;

    @Expose
    public String navbarShopItemsColor;

    @Expose
    public String shopLogo;

    @Expose
    public String shopFavicon;

    @Expose
    public String logoHref;

    @Expose
    @Column(columnDefinition = "boolean default false")
    public boolean isFooterOn;

    @Expose
    @Column(columnDefinition = "boolean default false")
    public boolean isBannerOn = false;

    @Expose
    public String bannerName;

    @Expose
    public String bannerDescription;

    @Expose
    @OneToOne(cascade=CascadeType.ALL)
    public SidebarColorScheme sidebarColorScheme;

    @OneToOne(cascade=CascadeType.ALL)
    public ShopDTO shop;


    public VisualSettingsDTO() {
    }

    public VisualSettingsDTO(boolean isBannerOn, String bannerName, String bannerDescription){
        this.isBannerOn = isBannerOn;
        this.bannerName = bannerName;
        this.bannerDescription = bannerDescription;
    }

}
