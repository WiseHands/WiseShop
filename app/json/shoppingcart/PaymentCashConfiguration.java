package json.shoppingcart;

import com.google.gson.annotations.Expose;
import models.TranslationBucketDTO;

public class PaymentCashConfiguration {

    @Expose
    String label;

    @Expose
    Boolean isActivePayByCash;

    @Expose
    TranslationBucketDTO translationBucket;

    public PaymentCashConfiguration(String label, Boolean isActivePayByCash, TranslationBucketDTO translationBucket){
        this.label = label;
        this.isActivePayByCash = isActivePayByCash;
        this.translationBucket = translationBucket;
    }

}
