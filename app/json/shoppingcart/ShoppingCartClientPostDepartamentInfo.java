package json.shoppingcart;

import com.google.gson.annotations.Expose;
public class ShoppingCartClientPostDepartamentInfo {

    @Expose
    public String city;
    @Expose
    public String postDepartmentNumber;


    public ShoppingCartClientPostDepartamentInfo(String city, String postDepartmentNumber) {
        this.city = city;
        this.postDepartmentNumber = postDepartmentNumber;

    }
}
