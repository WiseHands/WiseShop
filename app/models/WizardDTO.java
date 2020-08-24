package models;

import com.google.gson.annotations.Expose;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;

import javax.persistence.*;

@Entity
public class WizardDTO extends GenericModel {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Expose
    public String uuid;

    @Expose
    public String shopName;

    @Expose
    public String shopDomain;

    @Expose
    public String cityName;

    @Expose
    public String streetName;

    @Expose
    public String buildingNumber;

    @Expose
    @Lob
    @Column(length = 300000)
    public String shopDescription;

    @Expose
    public boolean courierDelivery;

    @Expose
    public boolean postDepartment;

    @Expose
    public boolean selfTake;

    @Expose
    public boolean payOnline;

    @Expose
    public boolean payCash;

    @Expose
    public String facebookLink;

    @Expose
    public String  instagramLink;

    @Expose
    public String youtubeLink;

    @OneToOne(cascade=CascadeType.ALL)
    public UserDTO user;


    public WizardDTO(){

    }

}
