package json.shoppingcart;

import com.google.gson.annotations.Expose;

public class ShoppingCartClientAddressInfo {
    @Expose
    public String city;
    @Expose
    public String street;
    @Expose
    public String building;
    @Expose
    public String appartment;

    public ShoppingCartClientAddressInfo(String clientCity, String clientAddressStreetName, String clientAddressBuildingNumber, String clientAddressAppartamentNumber) {
        this.city = clientCity;
        this.street = clientAddressStreetName;
        this.building = clientAddressBuildingNumber;
        this.appartment = clientAddressAppartamentNumber;
    }
}
