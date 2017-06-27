package models;

import com.google.gson.annotations.Expose;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class PushSubscription extends GenericModel {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Expose
    public String uuid;

    @Expose
    public String endpoint;

    @Expose
    public String p256dhKey;

    @Expose
    public String authKey;

    @Expose
    public String userUuid;

    @Expose
    public String shopUuid;

}
