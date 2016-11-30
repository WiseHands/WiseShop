package models;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.annotations.Expose;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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
    @OneToOne(cascade=CascadeType.ALL)
    public SidebarColorScheme sidebarColorScheme;

    @Expose
    @Transient
    public  List<SidebarColorScheme> sidebarColorSchemes;

    @OneToOne(cascade=CascadeType.ALL)
    public ShopDTO shop;


    public VisualSettingsDTO() {
        this.sidebarColorSchemes = SidebarColorScheme.findAll();
        this.sidebarColorScheme = SidebarColorScheme.find("byCode", "green").first();
    }

}
