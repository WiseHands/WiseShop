package responses;

import com.google.gson.annotations.Expose;

public class UserNotAllowedToPerformActionError {
    @Expose
    Integer code;
    @Expose
    public String status;
    @Expose
    public String statusUa;

    public UserNotAllowedToPerformActionError(){
        this.code = 10;
        this.status = "User is not allowed to perform this action";
    }

    @Override
    public String toString() {
        return this.status;
    }
}
