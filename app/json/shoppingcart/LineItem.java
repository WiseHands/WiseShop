package json.shoppingcart;

import com.google.gson.annotations.Expose;
import models.*;
import org.hibernate.annotations.GenericGenerator;
import play.Play;
import play.db.jpa.GenericModel;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.List;


@Entity
public class LineItem extends GenericModel {

    private static final boolean isDevEnv = Boolean.parseBoolean(Play.configuration.getProperty("dev.env"));

    @Expose
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    public String uuid;

    @Expose
    public String productId;

    @Expose
    public String name;

    @Expose
    public String imagePath;

    @Expose
    public Integer quantity;

    @Expose
    public Double price;

    @Expose
    @OneToOne(cascade=CascadeType.ALL, orphanRemoval=true)
    public TranslationBucketDTO translationBucket;


    @Expose
    @OneToMany(cascade=CascadeType.ALL, orphanRemoval=true)
    public List<AdditionLineItemDTO> additionList;


    public LineItem(String uuid, String name, String imagePath, Integer quantity, Double price, ShopDTO shop) {
        this.productId = uuid;
        this.name = name;
        String path = shop.domain;
        if(isDevEnv) {
            path = path + ":3334";
        }
        this.imagePath = String.format("https://%s/public/product_images/%s/%s", path, shop.uuid, imagePath);
        this.quantity = quantity;
        this.price = price;
    }

    public LineItem(String uuid, String name, String imagePath, Integer quantity, Double price,
                    ShopDTO shop, List<AdditionLineItemDTO> additionList, TranslationBucketDTO translationBucket) {
        this.productId = uuid;
        this.name = name;
        String path = shop.domain;
        if(isDevEnv) {
            path = path + ":3334";
        }
        this.imagePath = String.format("https://%s/public/product_images/%s/%s", path, shop.uuid, imagePath);
        this.quantity = quantity;
        this.price = price;
        this.additionList = additionList;
        this.translationBucket = translationBucket;
    }



}
