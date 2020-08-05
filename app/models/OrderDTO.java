package models;

import com.google.gson.annotations.Expose;
import enums.FeedbackRequestState;
import enums.OrderState;
import enums.PaymentState;
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
    public String clientLanguage;

    @Expose
    public String chosenClientLanguage;

    @Expose
    @Enumerated(EnumType.STRING)
    public OrderState state;

    @Expose
    @Enumerated(EnumType.STRING)
    public PaymentState paymentState;

    @Expose
    @Enumerated(EnumType.STRING)
    public FeedbackRequestState feedbackRequestState;

    @Expose
    @OneToMany(cascade = CascadeType.ALL)
    public List<OrderItemDTO> items;

    @Expose
    @OneToOne(cascade=CascadeType.ALL)
    public FeedbackDTO orderFeedback;

    @ManyToOne
    public ShopDTO shop;

    public OrderDTO(ShoppingCartDTO cart, ShopDTO shop, String userAgent, String ip) {
        this.name = cart.clientName;
        this.phone = cart.clientPhone;
        this.email = cart.clientEmail;
        this.clientCity = cart.clientCity;
        this.clientAddressStreetName = cart.clientAddressStreetName;
        this.clientAddressBuildingNumber = cart.clientAddressBuildingNumber;
        this.clientAddressApartmentEntrance = cart.clientAddressApartmentEntrance;
        this.clientAddressApartmentEntranceCode = cart.clientAddressApartmentEntranceCode;
        this.clientAddressApartmentFloor = cart.clientAddressApartmentFloor;
        this.clientAddressApartmentNumber = cart.clientAddressApartmentNumber;
        this.deliveryType = cart.deliveryType.name();
        this.paymentType = cart.paymentType.name();
        this.clientPostDepartmentNumber = cart.clientPostDepartmentNumber;
        this.time = System.currentTimeMillis();
        this.state = OrderState.NEW;
        this.comment = cart.clientComments;
        this.shop = shop;
        this.clientAddressStreetLat = cart.clientAddressStreetLat;
        this.clientAddressStreetLng = cart.clientAddressStreetLng;
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
