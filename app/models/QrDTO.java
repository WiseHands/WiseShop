package models;

import com.google.gson.annotations.Expose;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;

import javax.persistence.*;

@Entity
public class QrDTO extends GenericModel {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Expose
    public String uuid;

    @Expose
    public String shopUuid;

    @Expose
    public String name;

    @Expose
    public boolean isQrDeleted;

    public QrDTO(String name, String shopUuid) {
        this.name = name;
        this.isQrDeleted = false;
        this.shopUuid = shopUuid;
    }

//    @ManyToOne(cascade = CascadeType.ALL)
//    public ShopDTO shop;
}
