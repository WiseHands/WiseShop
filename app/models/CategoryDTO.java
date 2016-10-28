package models;

import com.google.gson.annotations.Expose;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class CategoryDTO extends GenericModel {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Expose
    public String uuid;

    @Expose
    public String name;

    @Expose
    public String description;

    @OneToMany(cascade=CascadeType.ALL)
    public List<ProductDTO> products;

    @OneToOne(cascade=CascadeType.ALL)
    public ShopDTO shop;

    public CategoryDTO(ShopDTO shop, String name, String description) {
        if(products == null) {
            products = new ArrayList<ProductDTO>();
        }
        this.name = name;
        this.shop = shop;
        this.description = description;
    }


}
