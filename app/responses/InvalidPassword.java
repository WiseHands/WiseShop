package responses;

import com.google.gson.annotations.Expose;

public class InvalidPassword {
    @Expose
    Integer code;
    @Expose
    public String status;
    @Expose
    public String statusUa;

    public InvalidPassword(){
        this.code = 20;
        this.status = "Invalid Password";
        this.statusUa = "Неправильний пароль";
    }

    @Override
    public String toString() {
        return this.status;
    }
}
