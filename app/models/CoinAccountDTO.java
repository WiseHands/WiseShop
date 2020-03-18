package models;


import com.google.gson.annotations.Expose;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
public class CoinAccountDTO extends GenericModel {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Expose
    public String uuid;

    @Expose
    public Double balance;

    @OneToMany
    public List<CoinTransactionDTO> coinTransactionDTO;

    public CoinAccountDTO(Double balance, List<CoinTransactionDTO> coinTransactionDTO) {
        this.balance = balance;
        this.coinTransactionDTO = coinTransactionDTO;
    }

}
