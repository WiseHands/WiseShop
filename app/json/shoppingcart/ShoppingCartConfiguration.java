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

    public ShoppingCartConfiguration(DeliveryConfiguration delivery, PaymentConfiguration payment) {
        this.delivery = delivery;
        this.payment = payment;
    }


}
