package models;

import com.google.gson.annotations.Expose;
import play.db.jpa.Model;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

@Entity
public class OrderItem extends Model{
    @Expose
    public String title;

    @Expose
    public Integer quantity;

    @Expose
    @OneToOne
    public Product product;

    @ManyToOne
    public Order order;
}
