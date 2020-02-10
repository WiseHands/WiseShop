package json.shoppingcart;

import com.google.gson.annotations.Expose;

public class DeliveryCourierConfiguration {

    @Expose
    String label;

    @Expose
    Boolean isCourierActive;

    @Expose
    Double minimumPaymentForFreeDelivery;

    @Expose
    Double deliveryPrice;

    public DeliveryCourierConfiguration(String label, Boolean isCourierActive, Double minimumPaymentForFreeDelivery, Double courierPrice){
        this.label = label;
        this.isCourierActive = isCourierActive;
        this.minimumPaymentForFreeDelivery = minimumPaymentForFreeDelivery;
        this.deliveryPrice = courierPrice;
    }

}