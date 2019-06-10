package models;

import com.google.gson.annotations.Expose;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Entity
public class ShopNetworkDTO extends GenericModel {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Expose
    public String uuid;

    @Expose
    public String networkName;

    @Expose
    @Transient
    public List<ShopDTO> shopList = new ArrayList<>();

    @Transient
    public List<String> uuidShopList = new ArrayList<>();

    public String rawUuidShopList;


    public void addUuidShopListToNetwork(List<String> uuidList) {
        this.retrieveShopList();
        for (String key : uuidList) {
            this.uuidShopList.add(key);
        }
        this.persistShopList();
        this.retrieveShopList();
    }

    public void removeUuidShopListToNetwork(List<String> uuidList) {
        this.retrieveShopList();
        for (String key : uuidList) {
            this.uuidShopList.remove(key);
        }
        this.persistShopList();
        this.retrieveShopList();
    }

    private void persistShopList() {
        System.out.println("persistShopList" + this.uuidShopList);
        this.rawUuidShopList = String.join(",", this.uuidShopList);
        for (String _id : uuidShopList) {
            ShopDTO _shop = ShopDTO.findById(_id);
            this.shopList.add(_shop);
        }
    }

    public void retrieveShopList() {
        this.shopList = new ArrayList<>();
        this.uuidShopList = new ArrayList<>();
        if(this.rawUuidShopList == null) {
            return;
        }


        this.uuidShopList = new ArrayList<>(Arrays.asList(this.rawUuidShopList.split(",")));
        for (String _id : uuidShopList) {
            ShopDTO _shop = ShopDTO.findById(_id);
            this.shopList.add(_shop);
        }
        System.out.println("retrieveShopList" + this.shopList);
    }


}
