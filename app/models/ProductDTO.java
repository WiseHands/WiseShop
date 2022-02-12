package models;

import com.google.gson.annotations.Expose;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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
    public Double oldPrice;

    @Expose
    public Double priceWithAdditions;

    @Expose
    public Double priceOfDay = 0D;

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
    public Boolean isActive;

    @Expose
    @Column(columnDefinition = "boolean default false")
    public Boolean isDishOfDay = false;

    @Expose
    @Column(columnDefinition = "boolean default false")
    public Boolean isPromotionalProduct = false;

    @Expose
    public Integer wholesaleCount;

    @Expose
    public Double wholesalePrice;

    @Expose
    @OneToOne
    public ProductImage mainImage;

    @Expose
    @OneToMany(orphanRemoval = true)
    public List<ProductPropertyDTO> properties;

    @Expose
    @OneToMany(orphanRemoval = true)
    public List<ProductImage> images;

    @Expose
    @OneToMany
    public List<SelectedAdditionDTO> selectedAdditions;

    @Expose
    @OneToMany(cascade = CascadeType.ALL)
    public List<SelectedAdditionDTO> defaultAdditions;

    @Expose
    @OneToMany(cascade = CascadeType.ALL)
    public List<FeedbackDTO> feedbackList;

    @Expose
    @OneToOne(cascade = CascadeType.ALL)
    public TranslationBucketDTO productNameTextTranslationBucket;

    @Expose
    @OneToOne(cascade = CascadeType.ALL)
    public TranslationBucketDTO productDescriptionTextTranslationBucket;

    @Expose
    @Column(columnDefinition = "integer default 0")
    public Integer spicinessLevel;

    public void addFeedback(FeedbackDTO orderFeedback) {
        if(this.feedbackList == null) {
            this.feedbackList = new ArrayList<FeedbackDTO>();
        }
        this.feedbackList.add(orderFeedback);
    }

    public ProductDTO(String name, String description, Double price, List<ProductImage> images, ShopDTO shop, Integer wholesaleCount, Double wholesalePrice) {
        this(name, description, price, images, shop, null, wholesaleCount, wholesalePrice);
    }
    public ProductDTO(String name, String description, Double price, List<ProductImage> images, ShopDTO shop, CategoryDTO category, Integer wholesaleCount, Double wholesalePrice) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.images = images;
        if (this.images != null) {
            this.mainImage = images.get(0);
            this.mainImage.save();
        }
        this.shop = shop;
        this.category = category;
        if (category != null) {
            this.categoryName = category.name;
            this.categoryUuid = category.uuid;
        }
        this.wholesaleCount = wholesaleCount;
        this.wholesalePrice = wholesalePrice;
    }

    public String formatDecimal() {
        Double number = this.price;
        if(this.priceOfDay != null && this.priceOfDay > 0) number = this.priceOfDay;
        if(this.priceWithAdditions != null) number = number + this.priceWithAdditions;

        float epsilon = 0.004f; // 4 tenths of a cent
        if (Math.abs(Math.round(number) - number) < epsilon) {
            return String.format("%10.0f", number); // sdb
        } else {
            return String.format("%10.2f", number); // dj_segfault
        }
    }

    public String formatDecimalOldPrice() {
        Double number = this.oldPrice;
        if (number != null) {
            float epsilon = 0.004f; // 4 tenths of a cent
            if (Math.abs(Math.round(number) - number) < epsilon) {
                return String.format("%10.0f", number) + " " + "uah"; // sdb
            } else {
                return String.format("%10.2f", number) + " " + "uah"; // dj_segfault
            }
        }
        return "";
    }

}
