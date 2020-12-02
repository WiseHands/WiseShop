package models;

import com.google.gson.annotations.Expose;
import json.shoppingcart.LineItem;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;

import javax.persistence.*;

@Entity
public class AdditionLineItemDTO extends GenericModel {

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
    public Long quantity;

    @Expose
    public String imagePath;

    @ManyToOne
    public LineItem lineItem;

    @Expose
    @Lob
    @Column
    public TranslationBucketDTO translationBucket;

    @Override
    public boolean equals(Object other) {
        AdditionLineItemDTO toCompare = (AdditionLineItemDTO) other;
        boolean isTitleEqual = this.title.equals(toCompare.title);
        boolean isPriceEqual = this.price.equals(toCompare.price);
        boolean isQuantityEqual = this.quantity.equals(toCompare.quantity);
        boolean isImagePathEqual = this.imagePath.equals(toCompare.imagePath);
        return isTitleEqual && isPriceEqual && isQuantityEqual && isImagePathEqual;
    }
}
