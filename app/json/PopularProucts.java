package json;

import com.google.gson.annotations.Expose;

import java.math.BigDecimal;

public class PopularProucts {

    @Expose
    String uuid;
    @Expose
    String name;
    @Expose
    BigDecimal quantity;

    public PopularProucts(String uuid, String name, BigDecimal quantity){
        this.uuid = uuid;
        this.name = name;
        this.quantity = quantity;
    }

}
