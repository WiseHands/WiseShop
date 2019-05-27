package models;

import com.google.gson.annotations.Expose;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
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
    @OneToMany
    public List<ShopDTO> shopList;

    public ShopNetworkDTO(String networkName, List<ShopDTO> shopList){
        this.networkName = networkName;
        this.shopList = shopList;
    }


}
