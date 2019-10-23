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
    public String address;

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

    public ContactDTO(String phone, String email, String address, String latLng, String description) {
        this.phone = phone;
        this.address = address;
        this.email = email;
        this.latLng = latLng;
        this.description = description;
    }

    private String returnIfNotNull(String target){
        if(target != null){
            return target;
        } else {
            return "";
        }
    }

}
