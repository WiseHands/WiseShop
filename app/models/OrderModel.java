package models;

import play.db.jpa.Model;

import javax.persistence.Entity;

@Entity
public class OrderModel extends Model {
    public String name;
    public String email;
    public String phone;
    public String address;
    public Integer price;
    public Long time;
    public String status;
}
