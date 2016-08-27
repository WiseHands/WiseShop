package utils;

import com.google.inject.*;
import services.SmsSender;
import services.SmsSenderImpl;

public class GuiceDummy extends AbstractModule {
    public void configure() {
        System.out.println("configure \n\n");
        bind(SmsSender.class).to(SmsSenderImpl.class).in(Singleton.class);
        //your bindings should come here
    }
}
