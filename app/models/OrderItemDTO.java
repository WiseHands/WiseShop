package models;

import com.google.gson.annotations.Expose;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;

import javax.persistence.*;

@Entity
public class OrderItemDTO extends GenericModel{

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Expose
    public String uuid;

    @Expose
    public String name;

    @Column( length = 100000 )
    @Expose
    public String description;

    @Expose
    public Double price;

    @Expose
    public String fileName;

    @Expose
    public Integer quantity;

}
