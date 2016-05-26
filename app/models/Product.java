package models;

import com.google.gson.annotations.Expose;
import play.db.jpa.Model;

import javax.persistence.Entity;

@Entity
public class Product extends Model{
    @Expose
    public String name;

    @Expose
    public String description;

    @Expose
    public String filename;

    @Expose
    public String imgPath;

    public Product(String name, String description, String filename) {
        this.name = name;
        this.description = description;
        this.filename = filename;
    }
}
