package controllers;

import com.liqpay.LiqPay;
import play.*;
import play.mvc.*;

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
        System.out.println("\n\n\nApplication.success " + sign);
       ok();
    }

}