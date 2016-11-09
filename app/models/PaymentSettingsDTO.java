package models;

import com.google.gson.annotations.Expose;
import com.sun.org.apache.xpath.internal.operations.Bool;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class PaymentSettingsDTO extends GenericModel {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Expose
    public String uuid;

    @Expose
    public Boolean manualPaymentEnabled;

    @Expose
    public Double freeDeliveryLimit;

    public PaymentSettingsDTO(Boolean manualPaymentEnabled, Double freeDeliveryLimit) {
        this.manualPaymentEnabled = manualPaymentEnabled;
        this.freeDeliveryLimit = freeDeliveryLimit;
    }
}
