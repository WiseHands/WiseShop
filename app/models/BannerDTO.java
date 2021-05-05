package models;


import com.google.gson.annotations.Expose;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;


@Entity
public class BannerDTO {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Expose
    public String uuid;

    @Expose
    @Column(columnDefinition = "boolean default false")
    public boolean isBannerInShopOn = false;

    @Expose
    public String bannerName;

    @Expose
    public String bannerDescription;


}
