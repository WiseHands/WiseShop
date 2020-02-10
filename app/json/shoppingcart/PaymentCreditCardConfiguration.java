package json.shoppingcart;

import com.google.gson.annotations.Expose;

public class PaymentCreditCardConfiguration {

    @Expose
    String label;

    @Expose
    Boolean isActivePayByCash;

    @Expose
    Double paymentComission = 0.0275;

    @Expose
    Boolean clientPaysProcessingCommission;

    public PaymentCreditCardConfiguration(String label, Boolean isActivePayByCash, Boolean clientPaysProcessingCommission){
        this.label = label;
        this.isActivePayByCash = isActivePayByCash;
        this.clientPaysProcessingCommission = clientPaysProcessingCommission;
    }

}
