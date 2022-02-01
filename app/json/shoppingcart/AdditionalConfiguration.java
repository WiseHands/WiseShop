package json.shoppingcart;

import com.google.gson.annotations.Expose;
import models.BannerDTO;
import models.PaymentSettingsDTO;

import javax.persistence.Transient;

public class AdditionalConfiguration {

    @Expose
    String labelForCustomerName;

    @Expose
    @Transient
    public BannerDTO banner;

    @Expose
    @Transient
    public PaymentSettingsDTO additionalPayment;

    public AdditionalConfiguration(String labelForCustomerName, BannerDTO banner, PaymentSettingsDTO additionalPayment) {
        this.labelForCustomerName = labelForCustomerName;
        this.banner = banner;
        this.additionalPayment = additionalPayment;
    }
}
