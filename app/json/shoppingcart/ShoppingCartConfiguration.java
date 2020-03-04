package json.shoppingcart;

import com.google.gson.annotations.Expose;

import javax.persistence.Transient;

public class ShoppingCartConfiguration {

    @Expose
    @Transient
    public DeliveryConfiguration delivery;

    @Expose
    @Transient
    public PaymentConfiguration payment;

    @Expose
    @Transient
    public AdditionalConfiguration additionalConfiguration;

    public ShoppingCartConfiguration(DeliveryConfiguration delivery, PaymentConfiguration payment, AdditionalConfiguration additionalConfiguration) {
        this.delivery = delivery;
        this.payment = payment;
        this.additionalConfiguration = additionalConfiguration;
    }


}
