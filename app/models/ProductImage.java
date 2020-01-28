package models;

import com.google.gson.annotations.Expose;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;

import javax.persistence.*;

@Entity
public class ProductImage extends GenericModel {
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Expose
    public String uuid;

    @Expose
    public String filename;

    @Expose
    public String filepath;

    @Expose
    public String server;

    @Expose
    public String cluster;

    @Expose
    public String region;

    public ProductImage(String filename) {
        this.filename = filename;
    }

    public ProductImage(String filename, String filepath) {
        this.filename = filename;
        this.filepath = filepath;
    }
}
