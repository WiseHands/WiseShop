package models;

import com.google.gson.annotations.Expose;
import json.shoppingcart.*;
import play.db.jpa.GenericModel;
import javax.persistence.*;
import java.util.List;

@Entity
public class ShoppingCartDTO extends GenericModel {

    @Id
    @Expose
    public String uuid;

    @Id
    @Expose
    public String shopUuid;

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

    @Expose
    @Transient
    public ShoppingCartConfiguration configuration;

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

        ShoppingCartClientPostDepartamentInfo postInfo =
                new ShoppingCartClientPostDepartamentInfo(this.clientCity, this.clientPostDepartmentNumber);

        ShoppingCartClientInfo client =
                new ShoppingCartClientInfo(this.clientName, this.clientPhone, this.clientComments, addressInfo, postInfo);
        this.client = client;


        ShopDTO shop = ShopDTO.find("byUuid", this.shopUuid).first();

        DeliveryCourierConfiguration courier =
                new DeliveryCourierConfiguration(shop.delivery.courierText, shop.delivery.isCourierAvailable, shop.delivery.courierFreeDeliveryLimit);
        DeliverySelfTakeConfiguration selfTake =
                new DeliverySelfTakeConfiguration(shop.delivery.selfTakeText, shop.delivery.isSelfTakeAvailable);
        DeliveryPostDepartmentConfiguration postDepartment =
                new DeliveryPostDepartmentConfiguration(shop.delivery.newPostText, shop.delivery.isNewPostAvailable);
        DeliveryConfiguration delivery = new DeliveryConfiguration(courier, postDepartment, selfTake);


        PaymentCashConfiguration cash =
                new PaymentCashConfiguration(shop.paymentSettings.manualPaymentTitle, shop.paymentSettings.manualPaymentEnabled);
        PaymentCreditCardConfiguration creditCard =
                new PaymentCreditCardConfiguration(shop.paymentSettings.onlinePaymentTitle, shop.paymentSettings.onlinePaymentEnabled);
        PaymentConfiguration payment = new PaymentConfiguration(cash, creditCard, shop.paymentSettings.minimumPayment);

        ShoppingCartConfiguration configuration = new ShoppingCartConfiguration(delivery, payment);
        this.configuration = configuration;


    }
}
