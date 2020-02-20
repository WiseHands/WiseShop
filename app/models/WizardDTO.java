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
    @Lob
    @Column(length = 300000)
    public String shopDescription;

    @Expose
    @OneToOne(cascade=CascadeType.ALL)
    public UserDTO user;


    public WizardDTO(){

    }

}
