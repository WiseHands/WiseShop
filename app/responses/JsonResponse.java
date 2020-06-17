package responses;

import com.google.gson.annotations.Expose;
import models.ShopDTO;

public class JsonResponse {

    @Expose
    public int status;

    @Expose
    public String message;

    @Expose
    public ShopDTO shop;

    public JsonResponse(int status, String message){
        this.status = status;
        this.message = message;
    }

    public JsonResponse(int status, String message, ShopDTO shop){
        this.status = status;
        this.message = message;
        this.shop = shop;
    }

}
