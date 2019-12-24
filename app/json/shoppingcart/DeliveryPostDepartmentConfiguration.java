package json.shoppingcart;

import com.google.gson.annotations.Expose;

public class DeliveryPostDepartmentConfiguration {

    @Expose
    String label;

    @Expose
    Boolean isPostDepartmentActive;

    public DeliveryPostDepartmentConfiguration(String label, Boolean isPostDepartmentActive){
        this.label = label;
        this.isPostDepartmentActive = isPostDepartmentActive;
    }

}
