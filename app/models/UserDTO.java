package models;

import com.google.gson.annotations.Expose;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import play.db.jpa.GenericModel;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
public class UserDTO extends GenericModel {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Expose
    public String uuid;

    @Expose
    public String googleId;

    @Expose
    public String name;

    @Expose
    public String phone;

    @Expose
    public String givenName;

    @Expose
    public String familyName;

    @Expose
    public String locale;


    @Expose
    public String profileUrl;

    @Expose
    public String email;

    @Expose
    public boolean isGoogleSignIn;

    public boolean isSuperUser;

    public String password;

    @Expose
    @LazyCollection(LazyCollectionOption.FALSE)
    @ManyToMany(cascade=CascadeType.ALL)
    public List<ShopDTO> shopList;


    //DEPRECATED. NOT USED. SHOULD BE REMOVED
    @Column
    public String token;

    public UserDTO() {
        this.token = UUID.randomUUID().toString();
        this.shopList = new ArrayList<ShopDTO>();
    }

    public UserDTO(String email, String password, String phone, Boolean isGoogleSignIn) {
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.token = UUID.randomUUID().toString();
        this.isGoogleSignIn = isGoogleSignIn;
        this.shopList = new ArrayList<ShopDTO>();
    }

    public UserDTO(String givenName, String familyName, String phone, String email, String password){
        this.givenName = givenName;
        this.familyName = familyName;
        this.phone = phone;
        this.email = email;
        this.password = password;
    }

}
