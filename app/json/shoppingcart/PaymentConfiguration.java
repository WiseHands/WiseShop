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
    Double minimumPaymentForOrder;

    public PaymentConfiguration(PaymentCashConfiguration cash, PaymentCreditCardConfiguration creditCard, Double minimumPaymentForOrder){
        this.cash = cash;
        this.creditCard = creditCard;
        this.minimumPaymentForOrder = minimumPaymentForOrder;
    }

}
