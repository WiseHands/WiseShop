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
    public String orderUuid;

    @Expose
    public String userUuid;

    @Expose
    @Enumerated(EnumType.STRING)
    public OrderState state;

    public BalanceTransactionDTO(Double amount, OrderDTO order) {
        this.amount = amount;
        this.orderUuid = order.uuid;
        this.date = System.currentTimeMillis();
    }

    public BalanceTransactionDTO(Double amount, UserDTO user) {
        this.amount = amount;
        this.userUuid = user.uuid;
        this.date = System.currentTimeMillis();
    }
}
