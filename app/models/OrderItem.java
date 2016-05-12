package models;

import com.google.gson.annotations.Expose;
import play.db.jpa.Model;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
public class OrderItem extends Model{
    @Expose
    public String title;

    @Expose
    public Integer quantity;

    @ManyToOne
    public OrderDTO order;
}
