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

    @Expose
    public Integer sortOrder;

    @Expose
    public boolean isHidden;

    @Expose
    @OneToMany
    public List<ProductDTO> products;

    @OneToOne
    public ShopDTO shop;

    @Expose
    @OneToOne(cascade=CascadeType.ALL)
    public TranslationBucketDTO categoryNameTextTranslationBucket;

    public CategoryDTO(ShopDTO shop, String name, String description) {
        if(products == null) {
            products = new ArrayList<ProductDTO>();
        }
        this.name = name;
        this.shop = shop;
        this.description = description;
    }

    public String getLinkToCategoryPage(String uuid, String language, String qr_uuid, String selectedCurrency){
        String link = "/" + language +"/category/" + uuid;
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
