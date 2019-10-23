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
    public boolean isFooterOn;

    @Expose
    @OneToOne(cascade=CascadeType.ALL)
    public SidebarColorScheme sidebarColorScheme;

    @OneToOne(cascade=CascadeType.ALL)
    public ShopDTO shop;


    public VisualSettingsDTO() {
    }

}
