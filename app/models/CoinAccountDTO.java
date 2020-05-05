package models;


import com.google.gson.annotations.Expose;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class CoinAccountDTO extends GenericModel {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Expose
    public String uuid;

    @Expose
    public double balance;

    @OneToOne
    public ShopDTO shop;

    @Expose
    @OneToMany
    public List<CoinTransactionDTO> transactionList;

    public CoinAccountDTO(ShopDTO shop) {
        this.shop = shop;
    }

    public void addTransaction(CoinTransactionDTO transaction) {
        if(this.transactionList == null) {
            this.transactionList = new ArrayList<CoinTransactionDTO>();
        }
        this.transactionList.add(transaction);
    }

    public void setBalance(double balance) {
        this.balance = Math.round(balance * 100.0) / 100.0;
    }

}
