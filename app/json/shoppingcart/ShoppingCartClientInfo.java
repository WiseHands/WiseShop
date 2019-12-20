package json.shoppingcart;

import com.google.gson.annotations.Expose;
import models.ShoppingCartDTO;

import javax.persistence.Transient;

public class ShoppingCartClientInfo {
    @Expose
    public String name;

    @Expose
    public String phone;

    @Expose
    public String comments;

    @Expose
    @Transient
    public ShoppingCartClientAddressInfo address;

    public ShoppingCartClientInfo(String clientName, String clientPhone, String clientComments, ShoppingCartClientAddressInfo address) {
        this.name = clientName;
        this.phone = clientPhone;
        this.comments = clientComments;
        this.address = address;
    }
}
