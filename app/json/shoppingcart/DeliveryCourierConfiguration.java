package json.shoppingcart;

import com.google.gson.annotations.Expose;

public class DeliveryCourierConfiguration {

    @Expose
    String label;

    @Expose
    Boolean isCourierActive;

    @Expose
    Integer minimumPaymentForFreedelivery;

    public DeliveryCourierConfiguration(String label, Boolean isCourierActive, Integer minimumPaymentForFreedelivery){
        this.label = label;
        this.isCourierActive = isCourierActive;
        this.minimumPaymentForFreedelivery = minimumPaymentForFreedelivery;
    }

}
