package json.shoppingcart;

import com.google.gson.annotations.Expose;
import org.hibernate.annotations.GenericGenerator;
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

    public LineItem(String uuid, String name, String imagePath, Integer quantity, Double price) {
        this.id = uuid;
        this.name = name;
        this.imagePath = imagePath;
        this.quantity = quantity;
        this.price = price;
    }

}
