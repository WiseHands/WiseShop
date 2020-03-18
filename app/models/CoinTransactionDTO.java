package models;

import com.google.gson.annotations.Expose;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class CoinTransactionDTO extends GenericModel {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Expose
    public String uuid;

    public enum Type { REFILL, TRANSFER }

    @Expose
    public CoinAccountDTO from;

    @Expose
    public CoinAccountDTO to;

    @Expose
    public Type type;

    public CoinTransactionDTO(){}

}
