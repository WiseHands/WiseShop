package models;

import com.google.gson.annotations.Expose;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.UUID;

@Entity
public class Product extends GenericModel {
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Expose
    public String uuid;

    @Expose
    public String name;

    @Expose
    public String description;

    @Expose
    public Float price;

    @Expose
    public String filename;

    public Product(String name, String description, Float price, String filename) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.filename = filename;
    }
}
