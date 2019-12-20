package models;

import com.google.gson.annotations.Expose;
import json.shoppingcart.ShoppingCartClientAddressInfo;
import json.shoppingcart.ShoppingCartClientInfo;
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
    @Transient
    public ShoppingCartClientInfo client;

    public String clientName;
    public String clientPhone;
    public String clientComments;
    public String clientAddressStreetName;
    public String clientAddressBuildingNumber;
    public String clientAddressAppartamentNumber;
    public String clientCity;
    public String clientPostDepartmentNumber;

    @PostLoad
    public void formatObject() {
        ShoppingCartClientAddressInfo addressInfo =
                new ShoppingCartClientAddressInfo(this.clientCity, this.clientAddressStreetName, this.clientAddressBuildingNumber, this.clientAddressAppartamentNumber);

        ShoppingCartClientInfo client =
                new ShoppingCartClientInfo(this.clientName, this.clientPhone, this.clientComments, addressInfo);

        this.client = client;
    }
}
