package json.shoppingcart;

import com.google.gson.annotations.Expose;

public class PaymentCreditCardConfiguration {

    @Expose
    String label;

    @Expose
    Boolean isActivePayByCreditCard;

    @Expose
    Double paymentComission = this._paymentComission;

    public static Double _paymentComission = 0.0275;

    @Expose
    Boolean clientPaysProcessingCommission;

    public PaymentCreditCardConfiguration(String label, Boolean isActivePayByCreditCard, Boolean clientPaysProcessingCommission){
        this.label = label;
        this.isActivePayByCreditCard = isActivePayByCreditCard;
        this.clientPaysProcessingCommission = clientPaysProcessingCommission;
    }

}
