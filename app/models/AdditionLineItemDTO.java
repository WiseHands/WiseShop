package models;

import com.google.gson.annotations.Expose;
import json.shoppingcart.LineItem;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class AdditionLineItemDTO extends GenericModel {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Expose
    public String uuid;

    @Expose
    public String title;

    @Expose
    public Double price;

    @Expose
    public Long quantity;

    @Expose
    public String imagePath;

    @ManyToOne
    public LineItem lineItem;

}
