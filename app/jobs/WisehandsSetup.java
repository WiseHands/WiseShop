package jobs;

import models.*;
import play.Play;
import play.jobs.Job;
import play.jobs.OnApplicationStart;

import java.util.ArrayList;
import java.util.List;

@OnApplicationStart
public class WisehandsSetup extends Job {
    private static final String SVYAT = "sviatoslav.p5@gmail.com";
    private static final String BOGDAN = "bohdaq@gmail.com";
    private static final String VOVA = "patlavovach@gmail.com";
    private static final String VOA = "voa@shalb.com";
    private static final String TARAS = "research.010@gmail.com";
    private static final String SERHIY = "ivaneyko.serhiy@gmail.com";

    private static final String HAPPYBAG_PUBLIC_LIQPAY_KEY = "i65251982315";
    private static final String HAPPYBAG_PRIVATE_LIQPAY_KEY = "NLsgd1zKW30EvBkPNeuQodXzmvcA7shcrQ7o0Mbs";


    private static final String PASSWORD = "rjylbnth";

    private static final boolean isDevEnv = Boolean.parseBoolean(Play.configuration.getProperty("dev.env"));

    public void doJob() throws Exception {

        boolean isDBEmpty = UserDTO.findAll().size() == 0;
        if (isDBEmpty){
            if (isDevEnv) {
                createShop("wisehands", "localhost");
            } else {
                createShop("HappyBag", "happybag.me");
            }
        }
    }

    private void createShop(String shopName, String domain) {



        List<UserDTO> users = new ArrayList<UserDTO>();
        UserDTO user = new UserDTO(BOGDAN, PASSWORD, "380630386173", false);
        user.isSuperUser = true;
        users.add(user);

        user = new UserDTO(VOVA, PASSWORD, "380631206871", false);
        user.isSuperUser = true;
        users.add(user);

        user = new UserDTO(VOA, PASSWORD, "380632441621", false);
        user.isSuperUser = true;
        users.add(user);

        user = new UserDTO(TARAS, PASSWORD, "380938864304", false);
        user.isSuperUser = true;
        users.add(user);

        user = new UserDTO(SERHIY, PASSWORD, "380630211035", false);
        user.isSuperUser = true;
        users.add(user);

        if(!isDevEnv) {
            user = new UserDTO(SVYAT, PASSWORD, "380932092108", false);
            user.isSuperUser = true;
            users.add(user);

            user = new UserDTO(VOVA, PASSWORD, "380631206871", false);
            user.isSuperUser = true;
            users.add(user);
        }

        Double courierDeliveryPrice = 40.0;
        Double courierFreeDeliveryPrice = 9999.0;
        DeliveryDTO delivery = new DeliveryDTO(
                true, "Courier",
                true, "Selftake",
                true, "Post Service",
                courierDeliveryPrice, courierFreeDeliveryPrice
        );
        ContactDTO contact = new ContactDTO("380932092108", "me@email.com", "Lviv", "49.848596,24.0229203", "Description");
        PaymentSettingsDTO paymentSettings = new PaymentSettingsDTO(true, true, (double) 500);
        BalanceDTO balance = new BalanceDTO();

        VisualSettingsDTO visualSettings = new VisualSettingsDTO();
        visualSettings.navbarTextColor = "#fff";
        visualSettings.navbarColor = "#072e6e";
        visualSettings.navbarShopItemsColor = "#F44336";
        SidebarColorScheme color = (SidebarColorScheme) SidebarColorScheme.findAll().get(0);
        visualSettings.sidebarColorScheme = color;

        ShopDTO shop = new ShopDTO(users, paymentSettings, delivery, contact, balance, visualSettings, shopName, HAPPYBAG_PUBLIC_LIQPAY_KEY, HAPPYBAG_PRIVATE_LIQPAY_KEY, domain, "en_US");
        shop.googleStaticMapsApiKey = "AIzaSyCcBhIqH-XMcNu99hnEKvWIZTrazd9XgXg";
        shop.googleMapsApiKey = "AIzaSyAuKg9jszEEgoGfUlIqmd4n9czbQsgcYRM";
        shop.save();

    }


}
