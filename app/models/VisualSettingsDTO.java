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
        List<SidebarColorScheme> sidebarColorSchemes = new ArrayList<SidebarColorScheme>();
        SidebarColorScheme blue = new SidebarColorScheme("blue", "Синій");
        sidebarColorSchemes.add(blue);

        SidebarColorScheme red = new SidebarColorScheme("red", "Червоний");
        sidebarColorSchemes.add(red);

        SidebarColorScheme green = new SidebarColorScheme("green", "Зелений");
        sidebarColorSchemes.add(green);

        SidebarColorScheme purple = new SidebarColorScheme("purple", "Фіолетовий");
        sidebarColorSchemes.add(purple);

        SidebarColorScheme dark = new SidebarColorScheme("dark", "Темний");
        sidebarColorSchemes.add(dark);

        SidebarColorScheme grey = new SidebarColorScheme("grey", "Сірий");
        sidebarColorSchemes.add(grey);

        SidebarColorScheme mdb = new SidebarColorScheme("mdb", "Блакитний");
        sidebarColorSchemes.add(mdb);

        SidebarColorScheme deepOrange = new SidebarColorScheme("deep-orange", "Оранжевий");
        sidebarColorSchemes.add(deepOrange);

        SidebarColorScheme graphite = new SidebarColorScheme("graphite", "Графіт");
        sidebarColorSchemes.add(graphite);

        SidebarColorScheme pink = new SidebarColorScheme("pink", "Рожевий");
        sidebarColorSchemes.add(pink);

        SidebarColorScheme lightGrey = new SidebarColorScheme("light-grey", "Світлосірий");
        sidebarColorSchemes.add(lightGrey);

        this.sidebarColorSchemes = sidebarColorSchemes;
        this.sidebarColorScheme = green;
    }

}
