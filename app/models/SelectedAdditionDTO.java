package models;

import com.google.gson.annotations.Expose;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;

import javax.persistence.*;

@Entity
public class SelectedAdditionDTO extends GenericModel {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Expose
    public String uuid;

    @Expose
    public String productUuid;

    @Expose
    public boolean isDefault = false;

    @Expose
    public boolean isSelected = false;

    @ManyToOne
    @JoinColumn(name="product_uuid")
    private ProductDTO product;

    @Expose
    @OneToOne(cascade=CascadeType.ALL)
    public AdditionDTO addition;

}
