package models;

import play.db.jpa.Model;

import javax.persistence.Entity;

@Entity
public class OrderModel extends Model {
    public String name;
    public String phone;
    public String address;
    public Integer numOfPortions;
    public Long time;
    public String status;
}
