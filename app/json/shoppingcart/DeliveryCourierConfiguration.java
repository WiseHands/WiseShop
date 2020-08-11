package json.shoppingcart;

import com.google.gson.annotations.Expose;
import models.TranslationBucketDTO;

public class DeliveryCourierConfiguration {

    @Expose
    String label;

    @Expose
    Boolean isCourierActive;

    @Expose
    Double minimumPaymentForFreeDelivery;

    @Expose
    Double deliveryPrice;

    @Expose
    TranslationBucketDTO translationBucket;

    public DeliveryCourierConfiguration(String label, Boolean isCourierActive,
                                        Double minimumPaymentForFreeDelivery, Double courierPrice,
                                        TranslationBucketDTO translationBucket){
        this.label = label;
        this.isCourierActive = isCourierActive;
        this.minimumPaymentForFreeDelivery = minimumPaymentForFreeDelivery;
        this.deliveryPrice = courierPrice;
        this.translationBucket = translationBucket;
    }

}
