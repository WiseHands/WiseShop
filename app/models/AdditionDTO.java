package models;

import com.google.gson.annotations.Expose;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;
import services.querying.DataBaseQueries;

import javax.persistence.*;

@Entity
public class AdditionDTO extends GenericModel {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Expose
    public String uuid;

    @Expose
    public String title;

    @Expose
    public Double price;

    @Expose
    public Double priceInCurrency = 0.0;

    @Expose
    public String imagePath;

    @Expose
    public String fileName;

    @Expose
    public String shopUuid;

    @Expose
    @OneToOne(cascade=CascadeType.ALL)
    public TranslationBucketDTO additionNameTranslationBucket;
    
    public AdditionDTO(){}

    public String getTitle() {
        return title;
    }

    public Double getRightPrice() {
        return this.priceInCurrency != 0 ? this.priceInCurrency : this.price;
    }
    
    public String getImagePath() {
        return imagePath;
    }

}
