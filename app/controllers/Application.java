package controllers;

import com.liqpay.LiqPay;
import play.*;
import play.mvc.*;
import org.apache.commons.codec.binary.Base64;

import java.util.*;

import models.*;

public class Application extends Controller {

    private static final String PUBLIC_KEY = Play.configuration.getProperty("liqpay.public.key");
    private static final String PRIVATE_KEY = Play.configuration.getProperty("liqpay.private.key");

    public static void index() {
        render();
    }
    public static void success(String data) {
        LiqPayLocal liqpay = new LiqPayLocal(PUBLIC_KEY, PRIVATE_KEY);

        String sign = liqpay.strToSign(
                PRIVATE_KEY +
                        data +
                        PRIVATE_KEY
        );

        byte[] decodedBytes = Base64.decodeBase64(data);
        System.out.println("decodedBytes " + new String(decodedBytes));

        System.out.println("\n\n\nApplication.success " + sign);
       ok();
    }

}