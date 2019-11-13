package models;

import com.google.gson.annotations.Expose;
import play.db.jpa.GenericModel;
import javax.persistence.*;
import java.util.List;

@Entity
public class ShoppingCartDTO extends GenericModel {
    @Id
    @Expose
    public String uuid;

    @Expose
    @OneToMany(orphanRemoval=true)
    public List<LineItemDTO> lineItemList;

}
