package models;

import com.google.gson.annotations.Expose;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;

import javax.persistence.*;
import java.util.UUID;

@Entity
public class ProductDTO extends GenericModel {
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Expose
    public String uuid;

    @Expose
    public String name;

    @Column( length = 100000 )
    @Expose
    public String description;

    @Expose
    public Double price;

    @Expose
    public String fileName;

    @ManyToOne
    public ShopDTO shop;

    public ProductDTO(String name, String description, Double price, String filename, ShopDTO shop) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.fileName = filename;
        this.shop = shop;
    }
}
