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

    @Expose
    @Transient
    public DeliverySpecialConfiguration special;



    public DeliveryConfiguration(DeliveryCourierConfiguration courier, DeliveryPostDepartmentConfiguration postDepartment,
                                 DeliverySelfTakeConfiguration selfTake, DeliverySpecialConfiguration special){
        this.courier = courier;
        this.postDepartment = postDepartment;
        this.selfTake = selfTake;
        this.special = special;
    }

}
