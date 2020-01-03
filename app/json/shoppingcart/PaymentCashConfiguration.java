package json.shoppingcart;

import com.google.gson.annotations.Expose;
import com.sun.org.apache.xpath.internal.operations.Bool;

public class PaymentCashConfiguration {

    @Expose
    String label;

    @Expose
    Boolean isActive;

    public PaymentCashConfiguration(String label, Boolean isActive){
        this.label = label;
        this.isActive = isActive;
    }

}
