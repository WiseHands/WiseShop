package json.shoppingcart;

import com.google.gson.annotations.Expose;
import com.sun.org.apache.xpath.internal.operations.Bool;

public class PaymentCashConfiguration {

    @Expose
    String label;

    @Expose
    Boolean isActivePayByCash;

    public PaymentCashConfiguration(String label, Boolean isActivePayByCash){
        this.label = label;
        this.isActivePayByCash = isActivePayByCash;
    }

}
