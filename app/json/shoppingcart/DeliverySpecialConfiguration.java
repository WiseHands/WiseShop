package json.shoppingcart;

import com.google.gson.annotations.Expose;
import models.TranslationBucketDTO;

public class DeliverySpecialConfiguration {

    @Expose
    String label;

    @Expose
    Double minimumAmountOrder;

    @Expose
    Boolean isSpecialDeliveryActive;

    @Expose
    TranslationBucketDTO translationBucket;

    public DeliverySpecialConfiguration(String label, Boolean isSpecialDeliveryActive, TranslationBucketDTO translationBucket, Double minimumAmountOrder){
        this.label = label;
        this.isSpecialDeliveryActive = isSpecialDeliveryActive;
        this.translationBucket = translationBucket;
        this.minimumAmountOrder = minimumAmountOrder;
    }

}
