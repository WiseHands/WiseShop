package models;

import com.google.gson.annotations.Expose;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class SmsVerificationDTO extends GenericModel {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Expose
    public String uuid;

    @Expose
    public double balance;

    @Expose
    @OneToMany(cascade=CascadeType.ALL)
    List<BalanceTransactionDTO> balanceTransactions;

    @OneToOne(cascade=CascadeType.ALL)
    public ShopDTO shop;

    public SmsVerificationDTO() {
        if(balanceTransactions == null) {
            balanceTransactions = new ArrayList<BalanceTransactionDTO>();
        }
    }

    public void addTransaction(BalanceTransactionDTO tx) {
        this.balanceTransactions.add(tx);
    }


}
