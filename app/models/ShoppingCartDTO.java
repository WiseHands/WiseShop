package models;

import com.google.gson.annotations.Expose;
import json.shoppingcart.*;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;
import javax.persistence.*;
import java.util.List;

@Entity
public class ShoppingCartDTO extends GenericModel {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
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
    @OneToMany(orphanRemoval=true, cascade = CascadeType.PERSIST)
    public List<LineItem> items;

    @Expose
    @Transient
    public ShoppingCartClientInfo client;

    @Expose
    @Transient
    public ShoppingCartConfiguration configuration;

    public ShoppingCartDTO() { }


    public ShoppingCartDTO(DeliveryType deliveryType, PaymentType paymentType, List<LineItem> items, ShoppingCartClientInfo client, ShoppingCartConfiguration configuration, String clientName, String clientPhone, String clientEmail, String clientComments, String clientAddressStreetName, String clientAddressBuildingNumber, String clientAddressApartmentNumber, String clientAddressApartmentFloor, String clientAddressApartmentEntrance, String clientAddressApartmentEntranceCode, String clientCity, String clientPostDepartmentNumber, String clientAddressStreetLat, String clientAddressStreetLng, Boolean clientAddressGpsPointInsideDeliveryBoundaries) {
        this.deliveryType = deliveryType;
        this.paymentType = paymentType;
        this.items = items;
        this.client = client;
        this.configuration = configuration;
        this.clientName = clientName;
        this.clientPhone = clientPhone;
        this.clientEmail = clientEmail;
        this.clientComments = clientComments;
        this.clientAddressStreetName = clientAddressStreetName;
        this.clientAddressBuildingNumber = clientAddressBuildingNumber;
        this.clientAddressApartmentNumber = clientAddressApartmentNumber;
        this.clientAddressApartmentFloor = clientAddressApartmentFloor;
        this.clientAddressApartmentEntrance = clientAddressApartmentEntrance;
        this.clientAddressApartmentEntranceCode = clientAddressApartmentEntranceCode;
        this.clientCity = clientCity;
        this.clientPostDepartmentNumber = clientPostDepartmentNumber;
        this.clientAddressStreetLat = clientAddressStreetLat;
        this.clientAddressStreetLng = clientAddressStreetLng;
        this.clientAddressGpsPointInsideDeliveryBoundaries = clientAddressGpsPointInsideDeliveryBoundaries;
    }

    public String clientName;
    public String clientPhone;
    public String clientEmail;
    public String clientComments;
    public String clientAddressStreetName;
    public String clientAddressBuildingNumber;
    public String clientAddressApartmentNumber;
    public String clientAddressApartmentFloor;
    public String clientAddressApartmentEntrance;
    public String clientAddressApartmentEntranceCode;
    public String clientCity;
    public String clientPostDepartmentNumber;
    public String clientAddressStreetLat;
    public String clientAddressStreetLng;
    public Boolean clientAddressGpsPointInsideDeliveryBoundaries;

    @PostLoad
    public void formatObject() {
        ShoppingCartClientAddressInfo addressInfo =
                new ShoppingCartClientAddressInfo(this.clientCity, this.clientAddressStreetName, this.clientAddressBuildingNumber,
                        this.clientAddressApartmentNumber, this.clientAddressApartmentFloor, this.clientAddressApartmentEntrance, this.clientAddressApartmentEntranceCode,
                        this.clientAddressStreetLat, this.clientAddressStreetLng, this.clientAddressGpsPointInsideDeliveryBoundaries);

        ShoppingCartClientPostDepartamentInfo postInfo =
                new ShoppingCartClientPostDepartamentInfo(this.clientCity, this.clientPostDepartmentNumber);

        ShoppingCartClientInfo client =
                new ShoppingCartClientInfo(this.clientName, this.clientPhone, this.clientEmail, this.clientComments, addressInfo, postInfo);
        this.client = client;


        ShopDTO shop = ShopDTO.find("byUuid", this.shopUuid).first();

        DeliveryCourierConfiguration courier =
                new DeliveryCourierConfiguration(shop.delivery.courierText, shop.delivery.isCourierAvailable, shop.delivery.courierFreeDeliveryLimit, shop.delivery.courierPrice);
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
