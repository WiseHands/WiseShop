package models;

import com.google.gson.annotations.Expose;
import enums.TransactionStatus;
import enums.TransactionType;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
public class CoinTransactionDTO extends GenericModel {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Expose
    public String uuid;

    @Expose
    public double amount;

    @Expose
    public double transactionBalance;

    @ManyToOne
    public CoinAccountDTO account;

    @Expose
    public String orderUuid;

    @Expose
    @Enumerated
    public TransactionType type;

    @Expose
    @Enumerated
    public TransactionStatus status;

    @Expose
    public BigDecimal time;

    @Expose
    public Long confirmationTime;

    @Expose
    public Long expirationTime;

    public CoinTransactionDTO() {

    }

    public CoinTransactionDTO(double amount, TransactionStatus status, BigDecimal time, double transactionBalance, TransactionType type) {
        this.amount = amount;
        this.status = status;
        this.time = time;
        this.transactionBalance = transactionBalance;
        this.type = type;
    }

}
