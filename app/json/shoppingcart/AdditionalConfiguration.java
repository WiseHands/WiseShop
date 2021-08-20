package json.shoppingcart;

import com.google.gson.annotations.Expose;
import models.VisualSettingsDTO;

import javax.persistence.Transient;

public class AdditionalConfiguration {

    @Expose
    String labelForCustomerName;

    @Expose
    @Transient
    public VisualSettingsDTO banner;

    public AdditionalConfiguration(String labelForCustomerName, VisualSettingsDTO banner) {
        this.labelForCustomerName = labelForCustomerName;
        this.banner = banner;
    }
}
