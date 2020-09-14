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
    public String name;

    @Expose
    public boolean isQrDeleted;

    public QrDTO(String name) {
        this.name = name;
        this.isQrDeleted = false;
    }

    @ManyToOne
    public ShopDTO shop;
}
