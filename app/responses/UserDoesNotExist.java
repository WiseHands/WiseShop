package responses;

import com.google.gson.annotations.Expose;

public class UserDoesNotExist {
    @Expose
    Integer code;
    @Expose
    public String status;
    @Expose
    public String statusUa;

    public UserDoesNotExist(){
        this.code = 10;
        this.status = "User with given phone number doesn't exist";
    }

    @Override
    public String toString() {
        return this.status;
    }
}
