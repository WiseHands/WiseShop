package responses;

import com.google.gson.annotations.Expose;
import models.ShopDTO;

public class JsonHandleForbidden {

    @Expose
    public int status;

    @Expose
    public String message;

    @Expose
    public ShopDTO shop;

    public JsonHandleForbidden(int status, String message){
        this.status = status;
        this.message = message;
    }

    public JsonHandleForbidden(int status, String message, ShopDTO shop){
        this.status = status;
        this.message = message;
        this.shop = shop;
    }

}
