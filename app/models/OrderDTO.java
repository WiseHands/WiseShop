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
    public String address;

    @Expose
    public String deliveryType;

    @Expose
    public String departmentNumber;

    @Expose
    public Long time;

    @Expose
    public Double total;

    @Expose
    @Enumerated(EnumType.STRING)
    public OrderState state;

    @Expose
    @OneToMany(cascade = CascadeType.ALL)
    public List<OrderItemDTO> items;

    public OrderDTO(String name, String phone, String address, String deliveryType, String departmentNumber) {
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.deliveryType = deliveryType;
        this.departmentNumber = departmentNumber;
        this.time = System.currentTimeMillis();
        this.state = OrderState.NEW;
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
        return this.name + "\n" +
                this.phone +  "\n" +
                this.deliveryType +
                returnIfNotNull(this.address) + "\n" +
                returnIfNotNull(this.departmentNumber) + "\n" +
                total + "\n" +
                "http://happybag.me/admin#/details/" + this.uuid;
    }
}
