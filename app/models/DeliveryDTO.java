package models;

import com.google.gson.annotations.Expose;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;

import javax.persistence.*;
import javax.validation.constraints.Size;

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
    public Double courierPrice;

    @Expose
    public Double courierFreeDeliveryLimit;


    public String getCourierPolygonData() {
        return courierPolygonData;
    }

    @Expose
    @Column(length=1431655765)
    public String courierPolygonData;

    @Expose
    public boolean isSelfTakeAvailable;

    @Expose
    public String selfTakeText;

    @Expose
    @OneToOne
    public TranslationBucketDTO selfTakeTranslationBucket;

    @Expose
    @OneToOne
    public TranslationBucketDTO courierTextTranslationBucket;

    @Expose
    @OneToOne
    public TranslationBucketDTO newPostTranslationBucket;

    @Expose
    public boolean isNewPostAvailable;

    @Expose
    public String newPostText;


    @Expose
    @Column(length=1024)
    public String orderMessage;

    public DeliveryDTO(boolean isCourierAvailable, String courierText,
                       boolean isSelfTakeAvailable, String selfTakeText,
                       boolean isNewPostAvailable, String newPostText,
                       Double courierPrice, Double courierFreeDeliveryLimit) {

        this.isCourierAvailable = isCourierAvailable;
        this.courierText = courierText;

        this.isSelfTakeAvailable = isSelfTakeAvailable;
        this.selfTakeText = selfTakeText;

        this.isNewPostAvailable = isNewPostAvailable;
        this.newPostText = newPostText;

        this.courierPrice = courierPrice;
        this.courierFreeDeliveryLimit = courierFreeDeliveryLimit;

    }
}
