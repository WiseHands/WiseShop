package models;

import com.google.gson.annotations.Expose;
import enums.OrderState;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;

import javax.persistence.*;

@Entity
public class BalanceTransactionDTO extends GenericModel {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Expose
    public String uuid;

    @Expose
    public Double amount;

    @Expose
    public Long date;

    @Expose
    @Enumerated(EnumType.STRING)
    public OrderState state;

    public BalanceTransactionDTO(Double amount) {
        this.amount = amount;
        this.date = System.currentTimeMillis();
    }
}
