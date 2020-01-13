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
    public String apartment;
    @Expose
    public String floor;
    @Expose
    public String entrance;
    @Expose
    public String entranceCode;
    @Expose
    public String lat;
    @Expose
    public String lng;

    public ShoppingCartClientAddressInfo(String clientCity, String clientAddressStreetName, String clientAddressBuildingNumber,
                                         String clientAddressApartmentNumber, String clientAddressApartmentFloor, String clientAddressApartmentEntrance, String clientAddressApartmentEntranceCode,
                                         String clientAddressStreetLat, String clientAddressStreetLng) {
        this.city = clientCity;
        this.street = clientAddressStreetName;
        this.building = clientAddressBuildingNumber;
        this.apartment = clientAddressApartmentNumber;
        this.floor = clientAddressApartmentFloor;
        this.entrance = clientAddressApartmentEntrance;
        this.entranceCode = clientAddressApartmentEntranceCode;
        this.lat = clientAddressStreetLat;
        this.lng = clientAddressStreetLng;
    }
}
