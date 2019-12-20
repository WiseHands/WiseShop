package json.shoppingcart;

import com.google.gson.annotations.Expose;

import javax.persistence.Transient;

public class ShoppingCartConfiguration {

    @Expose
    @Transient
    public DeliveryConfiguration deliveryConfiguration;

    @Expose
    @Transient
    public PaymentConfiguration paymentConfiguration;

    public ShoppingCartConfiguration(DeliveryConfiguration deliveryConfiguration, PaymentConfiguration paymentConfiguration) {
        this.deliveryConfiguration = deliveryConfiguration;
        this.paymentConfiguration = paymentConfiguration;
    }


}
