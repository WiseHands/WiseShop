package models;

import play.db.jpa.Model;

import javax.persistence.Entity;

@Entity
public class OrderModel extends Model {
    public String name;
    public String email;
    public String phone;
    public String address;
    public String newPostDepartment;
    public String uuid;
    public Integer price;
    public Long time;
    public String status;

    public String toString(){
        return name + ", " + phone + ", " + address + ", " + newPostDepartment;
    }
}
