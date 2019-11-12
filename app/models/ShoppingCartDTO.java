package models;

import com.google.gson.annotations.Expose;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class ShoppingCartDTO extends GenericModel {
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Expose
    public String uuid;

    @OneToMany
    public List<LineItemDTO> lineItemList;

    public String userId;
}
