package json.shoppingcart;

import com.google.gson.annotations.Expose;

public class PaymentCreditCardConfiguration {

    @Expose
    String label;

    @Expose
    Boolean isActivePayByCash;

    public PaymentCreditCardConfiguration(String label, Boolean isActivePayByCash){
        this.label = label;
        this.isActivePayByCash = isActivePayByCash;
    }

}
