package models;

import com.google.gson.annotations.Expose;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;

import javax.persistence.*;

@Entity
public class AdditionDTO extends GenericModel {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Expose
    public String uuid;

    @Expose
    public String productUuid;

    @Expose
    public String title;

    @Expose
    public Double price;

    @Expose
    public String imagePath;

    @Expose
    public String shopUuid;

    @Expose
    public boolean isDeleted;

    @Expose
    public boolean isDefault;

    @Expose
    public boolean isSelected = false;

    @Expose
    public String availableAdditionUuid;

    public String getTitle() {
        return title;
    }

    public Double getPrice() {
        return price;
    }

    public String getImagePath() {
        return imagePath;
    }

    @ManyToOne
    public ProductDTO product;

    public String formatDecimal() {
        Double number = this.price;
        float epsilon = 0.004f; // 4 tenths of a cent
        if (Math.abs(Math.round(number) - number) < epsilon) {
            return String.format("%10.0f", number); // sdb
        } else {
            return String.format("%10.2f", number); // dj_segfault
        }
    }

}
