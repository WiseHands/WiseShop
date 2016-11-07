package models;

import com.google.gson.annotations.Expose;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;

import javax.persistence.*;
import java.util.List;
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

    @ManyToOne
    public CategoryDTO category;

    @Expose
    public String categoryName;

    @Expose
    public String categoryUuid;

    @Expose
    public Integer sortOrder;

    @Expose
    public Double oldPrice;

    @Expose
    public Boolean isActive;

    @Expose
    @OneToOne
    public ProductImage mainImage;

    @Expose
    @OneToMany(orphanRemoval = true)
    public List<ProductImage> images;

    public ProductDTO(String name, String description, Double price, List<ProductImage> images, ShopDTO shop) {
        this(name, description, price, images, shop, null);
    }

    public ProductDTO(String name, String description, Double price, List<ProductImage> images, ShopDTO shop, CategoryDTO category) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.images = images;
        if(this.images != null){
            this.mainImage = images.get(0);
            this.mainImage.save();
        }
        this.shop = shop;
        this.category = category;
        if(category != null) {
            this.categoryName = category.name;
            this.categoryUuid = category.uuid;
        }
    }
}
