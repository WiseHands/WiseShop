package json.shoppingcart;

import com.google.gson.annotations.Expose;

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
