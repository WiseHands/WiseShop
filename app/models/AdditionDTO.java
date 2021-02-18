package models;

import com.google.gson.annotations.Expose;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;
import services.querying.DataBaseQueries;

import javax.persistence.*;

@Entity
public class AdditionDTO extends GenericModel {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Expose
    public String uuid;

    @Expose
    public String title;

    @Expose
    public Double price;

    @Expose
    public String imagePath;

    @Expose
    public String fileName;

    @Expose
    public String shopUuid;

    @Expose
    @OneToOne(cascade=CascadeType.ALL)
    public TranslationBucketDTO additionNameTranslationBucket;

    public String getTitle() {
        return title;
    }

    public Double getPrice(ProductDTO product, ShopDTO shop) {
//        if (shop.currencyShop != null && product.priceInCurrency != 0){
//            // TODO exchange price on dependent selected currency and shop currency
//            return price = DataBaseQueries.exchangeTotalPriceForAdditions(this.price, shop, shop.currencyShop.selectedCurrency);
//        } else {
//            return price;
//        }
        return price;
    }

    public String getImagePath() {
        return imagePath;
    }

    public String formatDecimal() {
        Double number = this.price;
        float epsilon = 0.004f; // 4 tenths of a cent
        if (Math.abs(Math.round(number) - number) < epsilon) {
            return String.format("%10.0f", number); // sdb
        } else {
            return String.format("%10.2f", number); // dj_segfault
        }
    }

}
