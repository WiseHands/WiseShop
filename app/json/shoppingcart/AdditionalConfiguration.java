package json.shoppingcart;

import com.google.gson.annotations.Expose;
import models.BannerDTO;

import javax.persistence.Transient;

public class AdditionalConfiguration {

    @Expose
    String labelForCustomerName;

    @Expose
    @Transient
    public BannerDTO banner;

    public AdditionalConfiguration(String labelForCustomerName, BannerDTO banner) {
        this.labelForCustomerName = labelForCustomerName;
        this.banner = banner;
    }
}
