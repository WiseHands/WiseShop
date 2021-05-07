package models;


import com.google.gson.annotations.Expose;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;


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
    public String name;

    @Expose
    public String description;

    @Expose
    public int discount;

    public BannerDTO(){}

    public BannerDTO(boolean isBannerInShopOn, String name, int discount){
        this.isBannerInShopOn = isBannerInShopOn;
        this.name = name;
        this.discount = discount;
    }


}
