package controllers;

import play.*;
import play.mvc.*;

import java.util.*;

import models.*;

public class Application extends Controller {

    public static void index() {
        render();
    }
    public static void success(String data) {
        System.out.println("\n\n\nApplication.success " + data);
       ok();
    }

}