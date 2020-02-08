package json.shoppingcart;

import com.google.gson.annotations.Expose;

public class PaymentCreditCardConfiguration {

    @Expose
    String label;

    @Expose
    Boolean isActivePayByCash;

    @Expose
    Double paymentComission = 0.0275;

    public PaymentCreditCardConfiguration(String label, Boolean isActivePayByCash){
        this.label = label;
        this.isActivePayByCash = isActivePayByCash;
    }

}
