package models;

import com.google.gson.annotations.Expose;
import enums.OrderState;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;

import javax.persistence.*;
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
    public String email;

    @Expose
    public String password;


    @Column( columnDefinition = "BINARY(16)", length = 16 )
    public UUID token;

    public UserDTO(String email, String password) {
        this.email = email;
        this.password = password;
        this.token = UUID.randomUUID();
    }
}
