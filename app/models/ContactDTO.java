package models;

import com.google.gson.annotations.Expose;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;

import javax.persistence.*;

@Entity
public class ContactDTO extends GenericModel {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Expose
    public String uuid;

    @Expose
    public String phone;

    @Expose
    public String email;

    @Expose
    public String addressCity;

    @Expose
    public String addressStreet;

    @Expose
    public String addressNumberHouse;

    @Expose
    public String latLng;

    @Expose
    public String linkfacebook;

    @Expose
    public String linkinstagram;

    @Expose
    public String linkyoutube;

    @Expose
    @Lob
    @Column(length = 300000)
    public String description;

    public ContactDTO(String phone, String email, String addressCity, String latLng, String description) {
        this.phone = phone;
        this.addressCity = addressCity;
        this.email = email;
        this.latLng = latLng;
        this.description = description;
    }

    public ContactDTO(String phone, String email, String description,
                      String addressCity, String addressStreet, String addressNumberHouse,
                      String linkfacebook, String linkinstagram, String linkyoutube) {
        this.phone = phone;
        this.email = email;
        this.description = description;

        this.addressCity = addressCity;
        this.addressStreet = addressStreet;
        this.addressNumberHouse = addressNumberHouse;

        this.linkfacebook = linkfacebook;
        this.linkinstagram = linkinstagram;
        this.linkyoutube = linkyoutube;
    }

    private String returnIfNotNull(String target){
        if(target != null){
            return target;
        } else {
            return "";
        }
    }

}
