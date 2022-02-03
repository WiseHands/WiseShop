package models;

import com.google.gson.annotations.Expose;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;

import javax.persistence.*;

@Entity
public class BannerDTO extends GenericModel {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Expose
    public String uuid;

    @Expose
    @Column(columnDefinition = "boolean default false")
    public boolean isBannerInShopBasketOn = false;

    @Expose
    @Column(columnDefinition = "boolean default false")
    public boolean isForDishOfDayOn = false;

    @Expose
    @Column(columnDefinition = "boolean default false")
    public boolean isBannerOn = false;

    @Expose
    public String bannerName;

     @Expose
     public String type;

    @Expose
    public String bannerDescription;

    @Expose
    public int discount;

    @ManyToOne
    public ShopDTO shop;

    public BannerDTO(){}

    public BannerDTO(ShopDTO shop, boolean isBannerOn, String bannerName, String bannerDescription){
        this.shop = shop;
        this.isBannerOn = isBannerOn;
        this.bannerName = bannerName;
        this.bannerDescription = bannerDescription;
    }

    public BannerDTO(ShopDTO shop, boolean isForDishOfDayOn, String name, int discount){
        this.shop = shop;
        this.isForDishOfDayOn = isForDishOfDayOn;
        this.bannerName = name;
        this.discount = discount;
    }

    public BannerDTO(boolean isBannerOn, String bannerName, String bannerDescription){
        this.isBannerOn = isBannerOn;
        this.bannerName = bannerName;
        this.bannerDescription = bannerDescription;
    }

    @Override
    public String toString() {
        return "BannerDTO{" +
                "uuid='" + uuid + '\'' +
                ", isBannerInShopOn=" + isBannerInShopBasketOn +
                ", isForDishOfDay=" + isForDishOfDayOn +
                ", name='" + bannerName + '\'' +
                ", isBannerOn='" + isBannerOn + '\'' +
                ", description='" + bannerDescription + '\'' +
                ", discount=" + discount +
                ", shop=" + shop +
                '}';
    }
}
