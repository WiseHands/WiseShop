package models;

import com.google.gson.annotations.Expose;
import enums.OrderState;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;

import javax.persistence.*;
import java.util.List;

@Entity
public class ClientDTO extends GenericModel {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Expose
    public String uuid;

    @Expose
    public String email;

    @Expose
    public String password;

    @Expose
    public String shopName;

    @Expose
    public String shopId;

    @Expose
    public String liqpayPublicKey;

    @Expose
    public String liqpayPrivateKey;

    @Expose
    public String customDomain;

    public ClientDTO(String email, String password, String shopName,
                     String shopId, String liqpayPublicKey,
                     String liqpayPrivateKey, String customDomain) {
        this.email = email;
        this.password = password;
        this.shopName = shopName;
        this.shopId = shopId;
        this.liqpayPublicKey = liqpayPublicKey;
        this.liqpayPrivateKey = liqpayPrivateKey;
        this.customDomain = customDomain;
    }
}
