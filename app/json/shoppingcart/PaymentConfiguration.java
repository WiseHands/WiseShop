package json.shoppingcart;

import com.google.gson.annotations.Expose;

import javax.persistence.Transient;

public class PaymentConfiguration {

    @Expose
    @Transient
    public PaymentCashConfiguration cash;

    @Expose
    @Transient
    public PaymentCreditCardConfiguration creditCard;

    @Expose
    Integer minimalPaymentForOrder;

    public PaymentConfiguration(){

    }

}
