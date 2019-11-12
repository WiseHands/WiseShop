package models;

import com.google.gson.annotations.Expose;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;
import javax.persistence.*;

@Entity
public class LineItemDTO extends GenericModel {
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Expose
    public String uuid;

    @OneToOne
    public ProductDTO product;

    @Expose
    public Integer quantity;

    @ManyToOne
    public ShoppingCartDTO shoppingCart;

}
