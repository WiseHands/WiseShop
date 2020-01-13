package models;

import com.google.gson.annotations.Expose;
import enums.OrderState;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;

import javax.persistence.*;
import java.util.List;

@Entity
public class OrderDTO extends GenericModel {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Expose
    public String uuid;

    @Expose
    public String name;

    @Expose
    public String phone;

    @Expose
    public String email;

    @Expose
    public String clientCity;
    @Expose
    public String clientAddressStreetName;
    @Expose
    public String clientAddressBuildingNumber;
    @Expose
    public String clientAddressApartmentEntrance;
    @Expose
    public String clientAddressApartmentEntranceCode;
    @Expose
    public String clientAddressApartmentFloor;
    @Expose
    public String clientAddressApartmentNumber;

    @Expose
    public String deliveryType;

    @Expose
    public String paymentType;

    @Expose
    public String clientPostDepartmentNumber;

    @Expose
    public Long time;

    @Expose
    public Double total;

    @Expose
    public String comment;

    @Expose
    public String couponId;

    @Expose
    public String clientAddressStreetLat;

    @Expose
    public String clientAddressStreetLng;

    @Expose
    public String userAgent;

    @Expose
    public String ip;

    @Expose
    public Boolean sentToCustomer;

    @Expose
    public Boolean sentToManager;

    @Expose
    public String errorReasonSentToCustomer;

    @Expose
    public String errorReasonSentToManager;

    @Expose
    public String amountTools;

    @Expose
    @Enumerated(EnumType.STRING)
    public OrderState state;

    @Expose
    @OneToMany(cascade = CascadeType.ALL)
    public List<OrderItemDTO> items;

    @ManyToOne(cascade=CascadeType.ALL)
    public ShopDTO shop;

    public OrderDTO(String name, String phone, String email,
                    String clientCity, String clientAddressStreetName, String clientAddressBuildingNumber, String clientAddressApartmentEntrance,
                    String clientAddressApartmentEntranceCode, String clientAddressApartmentFloor, String clientAddressApartmentNumber,
                    String amountTools, String deliveryType, String paymentType, String departmentNumber, String comment, ShopDTO shop, String destinationLat, String destinationLng, String userAgent, String ip) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.clientCity = clientCity;
        this.clientAddressStreetName = clientAddressStreetName;
        this.clientAddressBuildingNumber = clientAddressBuildingNumber;
        this.clientAddressApartmentEntrance = clientAddressApartmentEntrance;
        this.clientAddressApartmentEntranceCode = clientAddressApartmentEntranceCode;
        this.clientAddressApartmentFloor = clientAddressApartmentFloor;
        this.clientAddressApartmentNumber = clientAddressApartmentNumber;
        this.amountTools = amountTools;
        this.deliveryType = deliveryType;
        this.paymentType = paymentType;
        this.clientPostDepartmentNumber = departmentNumber;
        this.time = System.currentTimeMillis();
        this.state = OrderState.NEW;
        this.comment = comment;
        this.shop = shop;
        this.clientAddressStreetLat = destinationLng;
        this.clientAddressStreetLng = destinationLat;
        this.userAgent = userAgent;
        this.ip = ip;
    }

    private String returnIfNotNull(String target){
        if(target != null){
            return target;
        } else {
            return "";
        }
    }

    @Override
    public String toString() {
        return  "Name: " + this.name + "\n" +
                "Phone: " + this.phone +  "\n" +
                "Delivery: " + this.deliveryType + "\n" +
                "Payment: " + this.paymentType + "\n" +
                "ShoppingCartClientAddressInfo: " + returnIfNotNull(this.clientCity) + "\n" +
                "Department: " + returnIfNotNull(this.clientPostDepartmentNumber) + "\n" +
                "Total: " + total + "\n" +
                "Details: " + "http://" + this.shop.domain + "/admin#/details/" + this.uuid;
    }
}
