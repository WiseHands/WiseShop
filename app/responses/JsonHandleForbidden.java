package responses;

import com.google.gson.annotations.Expose;

public class JsonHandleForbidden {

    @Expose
    private int status;
    @Expose
    private String message;

    public JsonHandleForbidden(int status, String message){
        this.status = status;
        this.message = message;
    }

}
