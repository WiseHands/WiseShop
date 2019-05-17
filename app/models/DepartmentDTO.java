package models;

import com.google.gson.annotations.Expose;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.List;

@Entity
public class DepartmentDTO extends GenericModel {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Expose
    public String uuid;

    @Expose
    public String shopName;

    @Expose
    public String shopAddress;

    @Expose
    public String shopMail;

    @Expose
    public String shopPhone;

    @Expose
    public String destinationLat;

    @Expose
    public String destinationLng;


    public DepartmentDTO(String shopName, String shopAddress, String shopMail, String shopPhone, String destinationLat, String destinationLng) {
        this.shopName = shopName;
        this.shopAddress = shopAddress;
        this.shopMail = shopMail;
        this.shopPhone = shopPhone;
        this.destinationLat = destinationLat;
        this.destinationLng = destinationLng;
    }


}
