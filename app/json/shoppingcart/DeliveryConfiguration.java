package json.shoppingcart;

import com.google.gson.annotations.Expose;

import javax.persistence.Transient;

public class DeliveryConfiguration {

    @Expose
    @Transient
    public DeliveryCourierConfiguration deliveryCourierConf;

    @Expose
    @Transient
    public DeliveryPostDepartmentConfiguration deliveryPostDepartmentConf;

    @Expose
    @Transient
    public DeliverySelfTakeConfiguration deliverySelfTakeConf;

    public DeliveryConfiguration(DeliveryCourierConfiguration deliveryCourierConf, DeliveryPostDepartmentConfiguration deliveryPostDepartmentConf, DeliverySelfTakeConfiguration deliverySelfTakeConf){
        this.deliveryCourierConf = deliveryCourierConf;
        this.deliveryPostDepartmentConf = deliveryPostDepartmentConf;
        this.deliverySelfTakeConf = deliverySelfTakeConf;

    }

}
