package models;

import com.google.gson.annotations.Expose;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;

import javax.persistence.*;
import java.util.List;

@Entity
public class ProductPropertyDTO extends GenericModel {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Expose
    public String uuid;

    @Expose
    public String name;

    @Expose
    @OneToMany(cascade=CascadeType.ALL, orphanRemoval=true)
    public List<PropertyTagDTO> tags;

    @Expose
    public String categoryUuid;

    @Expose
    public String productUuid;

    @Expose
    public String shopUuid;


}
