package models;

import com.google.gson.annotations.Expose;
import enums.TransactionStatus;
import enums.TransactionType;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;

import javax.persistence.*;

@Entity
public class CoinTransactionDTO extends GenericModel {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Expose
    public String uuid;

    @Expose
    public double amount;

    @ManyToOne
    public CoinAccountDTO account;

    @Expose
    @Enumerated
    public TransactionType type;

    @Expose
    @Enumerated
    public TransactionStatus status;
}
