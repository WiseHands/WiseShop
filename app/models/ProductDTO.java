package models;

import com.google.gson.annotations.Expose;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;


import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

import static org.codehaus.groovy.runtime.DefaultGroovyMethods.round;

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
    public double priceInCurrency;

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
    @OneToMany(mappedBy = "product")
    @Column(columnDefinition = "varchar(255) null default null")
    public List<SelectedAdditionDTO> selectedAdditions = null;

    @Expose
    @OneToMany(mappedBy = "product")
    @Column(columnDefinition = "varchar(255) null default null")
    public List<SelectedAdditionDTO> defaultAdditions = null;

    @Expose
    @OneToMany(cascade = CascadeType.ALL)
    public List<FeedbackDTO> feedbackList;

    @Expose
    @OneToOne
    public TranslationBucketDTO productNameTextTranslationBucket;

    @Expose
    @OneToOne
    public TranslationBucketDTO productDescriptionTextTranslationBucket;

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

    public double formatDefaultPrice() {
        double number = this.price;
        return round(number, 2); // sdb
    }

    public double formatPrice(String currency, String selectedCurrency) {
        boolean isSelectedCurrencyEqualShopCurrency = false;
        if (selectedCurrency != null){
            isSelectedCurrencyEqualShopCurrency = selectedCurrency.equals(currency);
        }
        if (selectedCurrency == null || selectedCurrency.isEmpty()){
            return _formatPrice();
        } else if (isSelectedCurrencyEqualShopCurrency){
            return _formatPrice();
        } else {
            return round(this.priceInCurrency + this.priceWithAdditions, 2);
        }
    }

    private double _formatPrice() {
        double number = this.price;
        if(this.priceWithAdditions != 0){
            number = number + this.priceWithAdditions;
        }
        return _roundAvoid(number, 2); // sdb
    }

    public static double _roundAvoid(double value, int places) {
        double scale = Math.pow(10, places);
        return Math.round(value * scale) / scale;
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

    public String getLinkToProductPage(ProductDTO product, String language, String qr_uuid, String selectedCurrency){
        String link = "/" + language +"/product/" + product.uuid;
        if (!qr_uuid.isEmpty() && !selectedCurrency.isEmpty()){
            return link + "?qr_uuid=" + qr_uuid + "&currency=" + selectedCurrency;
        } else if (!qr_uuid.isEmpty() && selectedCurrency.isEmpty()) {
            return link + "?qr_uuid=" + qr_uuid;
        } else if (!selectedCurrency.isEmpty() && qr_uuid.isEmpty()) {
            return link + "?currency=" + selectedCurrency;
        } else {
            return link;
        }
    }




}
