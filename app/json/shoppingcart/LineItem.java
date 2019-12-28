package json.shoppingcart;

import com.google.gson.annotations.Expose;
import models.ShopDTO;
import org.hibernate.annotations.GenericGenerator;
import play.Play;
import play.db.jpa.GenericModel;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;


@Entity
public class LineItem extends GenericModel {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    public String uuid;

    @Expose
    public String id;

    @Expose
    public String name;

    @Expose
    public String imagePath;

    @Expose
    public Integer quantity;

    @Expose
    public Double price;

    private static final boolean isDevEnv = Boolean.parseBoolean(Play.configuration.getProperty("dev.env"));


    public LineItem(String uuid, String name, String imagePath, Integer quantity, Double price, ShopDTO shop) {
        this.id = uuid;
        this.name = name;
        String path = shop.domain;
        if(isDevEnv) {
            path = path + ":3334";
        }
        this.imagePath = String.format("http://%s/public/product_images/%s/%s", path, shop.uuid, imagePath);;
        this.quantity = quantity;
        this.price = price;
    }

}
