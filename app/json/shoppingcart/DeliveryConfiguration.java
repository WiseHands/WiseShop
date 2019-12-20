package json.shoppingcart;

import com.google.gson.annotations.Expose;

import javax.persistence.Transient;

public class DeliveryConfiguration {

    @Expose
    @Transient
    public DeliveryCourierConfiguration courier;

    @Expose
    @Transient
    public DeliveryPostDepartmentConfiguration postDepartment;

    @Expose
    @Transient
    public DeliverySelfTakeConfiguration selfTake;

    public DeliveryConfiguration(DeliveryCourierConfiguration courier, DeliveryPostDepartmentConfiguration postDepartment, DeliverySelfTakeConfiguration selfTake){
        this.courier = courier;
        this.postDepartment = postDepartment;
        this.selfTake = selfTake;

    }

}
