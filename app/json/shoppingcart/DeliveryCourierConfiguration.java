package json.shoppingcart;

import com.google.gson.annotations.Expose;

public class DeliveryCourierConfiguration {

    @Expose
    String label;

    @Expose
    Boolean isCourierActive;

    @Expose
    Double minimumPaymentForFreeDelivery;

    public DeliveryCourierConfiguration(String label, Boolean isCourierActive, Double minimumPaymentForFreeDelivery){
        this.label = label;
        this.isCourierActive = isCourierActive;
        this.minimumPaymentForFreeDelivery = minimumPaymentForFreeDelivery;
    }

}
