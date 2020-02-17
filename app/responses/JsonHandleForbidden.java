package responses;

public class JsonHandleForbidden {

    private int status;
    private String message;

    public JsonHandleForbidden(int status, String message){
        this.status = status;
        this.message = message;
    }

}
