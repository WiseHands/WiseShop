package json.shoppingcart;

import com.google.gson.annotations.Expose;

public class DeliverySelfTakeConfiguration {

    @Expose
    String label;

    @Expose
    Boolean isSelfTakeActive;

    public DeliverySelfTakeConfiguration(String label, Boolean isSelfTakeActive){
        this.label = label;
        this.isSelfTakeActive = isSelfTakeActive;
    }

}
