package json;

import com.google.gson.annotations.Expose;

import java.math.BigInteger;

public class FrequentBuyer {

     @Expose
     BigInteger buyersCount;
     @Expose
     String name;
     @Expose
     String phone;
     @Expose
     Double total;

     public FrequentBuyer(BigInteger buyersCount, String name, String phone, Double total){
         this.buyersCount = buyersCount;
         this.name = name;
         this.phone = phone;
         this.total = total;
     }

}
