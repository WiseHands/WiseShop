package models;

import com.google.gson.annotations.Expose;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;

import javax.persistence.*;

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
    public Boolean onlinePaymentEnabled;

    @Expose
    public Double freeDeliveryLimit;

    @Expose
    public String manualPaymentTitle;

    @Expose
    public String onlinePaymentTitle;

    @Expose
    public String buttonPaymentTitle;

    @Expose
    public Double minimumPayment;

    @Expose
    public Boolean clientPaysProcessingCommission = false;

    public PaymentSettingsDTO(Boolean manualPaymentEnabled, Boolean onlinePaymentEnabled, Double freeDeliveryLimit, String manualPaymentTitle, String onlinePaymentTitle, String buttonPaymentTitle) {
        this.manualPaymentEnabled = manualPaymentEnabled;
        this.onlinePaymentEnabled = onlinePaymentEnabled;
        this.freeDeliveryLimit = freeDeliveryLimit;
        this.manualPaymentTitle = manualPaymentTitle;
        this.onlinePaymentTitle = onlinePaymentTitle;
        this.buttonPaymentTitle = buttonPaymentTitle;
    }
}
