package json.shoppingcart;

import com.google.gson.annotations.Expose;

import javax.persistence.Transient;

public class ShoppingCartClientInfo {
    @Expose
    public String name;

    @Expose
    public String phone;

    @Expose
    public String email;

    @Expose
    public String comments;

    @Expose
    @Transient
    public ShoppingCartClientAddressInfo address;

    @Expose
    @Transient
    public ShoppingCartClientPostDepartamentInfo postDepartamentInfo;

    public ShoppingCartClientInfo(String clientName, String clientPhone, String clientEmail, String clientComments, ShoppingCartClientAddressInfo address, ShoppingCartClientPostDepartamentInfo postInfo) {
        this.name = clientName;
        this.phone = clientPhone;
        this.email = clientEmail;
        this.comments = clientComments;
        this.address = address;
        this.postDepartamentInfo = postInfo;
    }
}
