package models;

import com.google.gson.annotations.Expose;
import play.db.jpa.Model;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.List;
import java.util.UUID;

@Entity
public class Order extends Model {
    @Expose
    public String name;

    @Expose
    public Double total;

    @Expose
    public String departmentNumber;

    @Expose
    public String address;

    @Expose
    public String deliveryType;

    @Expose
    public Long time;

    @Expose
    public String phone;

    @Expose
    public String uuid;

    @Expose
    @OneToMany
    public List<OrderItem> orders;

}
