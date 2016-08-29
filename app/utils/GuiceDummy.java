package utils;

import com.google.inject.*;
import services.*;

public class GuiceDummy extends AbstractModule {
    public void configure() {
        System.out.println("configure \n\n");
        bind(SmsSender.class).to(SmsSenderImpl.class).in(Singleton.class);
        bind(MailSender.class).to(MailSenderImpl.class).in(Singleton.class);
        bind(LiqPayService.class).to(LiqPayServiceImpl.class).in(Singleton.class);
        //your bindings should come here
    }
}
