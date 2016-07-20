package models;

import com.google.gson.annotations.Expose;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;

import javax.persistence.*;
import java.util.ArrayList;

@Entity
public class DeliveryDTO extends GenericModel {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Expose
    public String uuid;

    @Expose
    public boolean isCourierAvailable;
    @Expose
    public String courierText;

    @Expose
    public boolean isSelfTakeAvailable;
    @Expose
    public String selfTakeText;

    @Expose
    public boolean isNewPostAvailable;
    @Expose
    public String newPostText;


    public DeliveryDTO(boolean isCourierAvailable, String courierText,
                       boolean isSelfTakeAvailable, String selfTakeText,
                       boolean isNewPostAvailable, String newPostText) {
        this.isCourierAvailable = isCourierAvailable;
        this.courierText = courierText;

        this.isSelfTakeAvailable = isSelfTakeAvailable;
        this.selfTakeText = selfTakeText;

        this.isNewPostAvailable = isNewPostAvailable;
        this.newPostText = newPostText;
    }
}
