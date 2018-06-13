package responses;

import com.google.gson.annotations.Expose;

public class UserPhoneAlreadyExist {
    @Expose
    Integer code;
    @Expose
    public String status;
    @Expose
    public String statusUa;

    public UserPhoneAlreadyExist(){
        this.code = 30;
        this.status = "User with given phone number already exist";
        this.statusUa = "Користувач з таким номером телефону вже зареєстрований";
    }

    @Override
    public String toString() {
        return this.status;
    }
}