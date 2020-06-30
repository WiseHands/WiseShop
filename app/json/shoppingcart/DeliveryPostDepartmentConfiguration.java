package json.shoppingcart;

import com.google.gson.annotations.Expose;
import models.TranslationBucketDTO;

public class DeliveryPostDepartmentConfiguration {

    @Expose
    String label;

    @Expose
    Boolean isPostDepartmentActive;

    @Expose
    TranslationBucketDTO translationBucket;

    public DeliveryPostDepartmentConfiguration(String label, Boolean isPostDepartmentActive, TranslationBucketDTO translationBucke){
        this.label = label;
        this.isPostDepartmentActive = isPostDepartmentActive;
        this.translationBucket = translationBucke;
    }

}
