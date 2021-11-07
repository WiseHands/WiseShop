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
    public boolean isBannerInShopOn = false;

    @Expose
    @Column(columnDefinition = "boolean default false")
    public boolean isForDishOfDay = false;

    @Expose
    public String name;

    @Expose
    public String description;

    @Expose
    public int discount;

    @ManyToOne
    public ShopDTO shop;

    public BannerDTO(){}

    public BannerDTO(ShopDTO shop, boolean isBannerInShopOn, String name, int discount){
        this.shop = shop;
        this.isBannerInShopOn = isBannerInShopOn;
        this.name = name;
        this.discount = discount;
    }

    @Override
    public String toString() {
        return "BannerDTO{" +
                "uuid='" + uuid + '\'' +
                ", isBannerInShopOn=" + isBannerInShopOn +
                ", isForDishOfDay=" + isForDishOfDay +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", discount=" + discount +
                ", shop=" + shop +
                '}';
    }
}
