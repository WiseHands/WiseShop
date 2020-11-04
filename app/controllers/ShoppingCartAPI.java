package controllers;

import org.json.simple.parser.ParseException;
import play.mvc.Before;
import services.ShoppingCartService;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.TimeZone;

//-Xverify:none export JAVA_TOOL_OPTIONS="-Xverify:none"

public class ShoppingCartAPI extends AuthController {

    private static DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");

    @Before
    public static void corsHeaders() {
        dateFormat.setTimeZone(TimeZone.getTimeZone("GMT"));
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
        response.setHeader("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization");
    }

    public static void allowCors(){
        response.setHeader("Access-Control-Allow-Origin", "*");
        ok();
    }

    public static void getCart(String client) {
        renderJSON(ShoppingCartService.getCart(client));
    }

    public static void addProduct(String client) throws ParseException {
        renderJSON(ShoppingCartService.addProduct(client));
    }

    public static void deleteProduct(String client) {
        renderJSON(ShoppingCartService.deleteProduct(client));
    }

    public static void updateQuantityProduct(String client) throws Exception{
        renderJSON(ShoppingCartService.updateQuantityProduct(client));
    }

    public static void increaseQuantityProduct(String client) {
        renderJSON(ShoppingCartService.increaseQuantityProduct(client));
    }

    public static void decreaseQuantityProduct(String client) {
        renderJSON(ShoppingCartService.decreaseQuantityProduct(client));
    }

    public static void selectDeliveryType(String client) {
        renderJSON(ShoppingCartService.selectDeliveryType(client));
    }

    public static void selectPaymentType(String client) {
        renderJSON(ShoppingCartService.selectPaymentType(client));
    }

    public static void setClientInfo(String client) {
        renderJSON(ShoppingCartService.setClientInfo(client));
    }

    public static void setAddressInfo(String client) throws Exception {
        renderJSON(ShoppingCartService.setAddressInfo(client));
    }

     public static void setPostDepartmentInfo(String client) {
         renderJSON(ShoppingCartService.setPostDepartmentInfo(client));
     }

}
