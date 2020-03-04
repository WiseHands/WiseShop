package json.shoppingcart;

import com.google.gson.annotations.Expose;

public class AdditionalConfiguration {

    @Expose
    String labelForCustomerName;

    public AdditionalConfiguration(String labelForCustomerName){
        this.labelForCustomerName = labelForCustomerName;
    }

}
