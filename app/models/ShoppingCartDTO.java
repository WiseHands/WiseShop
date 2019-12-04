package models;

import com.google.gson.annotations.Expose;
import play.db.jpa.GenericModel;
import javax.persistence.*;
import java.util.List;

@Entity
public class ShoppingCartDTO extends GenericModel {

    @Id
    @Expose
    public String uuid;

    public enum DeliveryType {
        SELFTAKE,
        COURIER,
        POSTSERVICE
    }

    @Expose
    @Enumerated(EnumType.ORDINAL)
    public DeliveryType deliveryType;


    public enum PaymentType {
        CASHONDELIVERY,
        CREDITCARD
    }

    @Expose
    @Enumerated(EnumType.ORDINAL)
    public PaymentType paymentType;


    @Expose
    @OneToMany(orphanRemoval=true)
    public List<LineItemDTO> lineItemList;

    @Expose
    public String clientName;

    @Expose
    public String clientPhone;

    @Expose
    public String clientComments;

}
