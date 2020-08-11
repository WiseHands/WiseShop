package json.shoppingcart;

import com.google.gson.annotations.Expose;
import models.TranslationBucketDTO;

public class DeliverySelfTakeConfiguration {

    @Expose
    String label;

    @Expose
    Boolean isSelfTakeActive;

    @Expose
    TranslationBucketDTO translationBucket;

    public DeliverySelfTakeConfiguration(String label, Boolean isSelfTakeActive, TranslationBucketDTO translationBucket){
        this.label = label;
        this.isSelfTakeActive = isSelfTakeActive;
        this.translationBucket = translationBucket;
    }

}
