package services;

import jobs.AdditionalSettingForShop;
import models.*;
import play.Play;
import play.i18n.Messages;
import util.DomainValidation;

import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;
import java.util.List;

public class ShopServiceImpl implements ShopService{
    public static final String WISEHANDS_STATIC_MAPS_KEY = "AIzaSyCcBhIqH-XMcNu99hnEKvWIZTrazd9XgXg";
    public static final String WISEHANDS_MAPS_KEY = "AIzaSyAuKg9jszEEgoGfUlIqmd4n9czbQsgcYRM";
    public static final String SHOP_OPEN_FROM = "1969-12-31T22:00:00.000Z";
    public static final String SHOP_OPEN_UNTIL = "1970-01-01T21:59:00.000Z";
    public static final String SERVER_IP = "91.224.11.24";

    private static ShopService shopService;
    static {
        shopService = new ShopServiceImpl();
    }
    public static ShopService getInstance() {
        return shopService;
    }

    Double courierDeliveryPrice = 40.0;
    Double courierFreeDeliveryLimit = 9999.0;
    String courierDeliveryText = Messages.get("create.shop.courier.delivery.text", courierDeliveryPrice, courierFreeDeliveryLimit);
    String selfPickupDeliveryText = Messages.get("create.shop.selfpickup.delivery.text");
    String postServiceDelivery = Messages.get("create.shop.postservice.delivery.text");
    Double freeDeliveryLimit = 500.0;
    String navbarTextColor = "#fff";
    String navbarColor = "#072e6e";
    String navbarShopItemsColor = "#F44336";

    @Override
    public ShopDTO createShop(String name, String domain, UserDTO user) {
        DeliveryDTO delivery = new DeliveryDTO(
                true, courierDeliveryText,
                true, selfPickupDeliveryText,
                true, postServiceDelivery,
                courierDeliveryPrice,
                courierFreeDeliveryLimit, 50.0
        );
        delivery.save();

        PaymentSettingsDTO paymentSettings = new PaymentSettingsDTO(true, true, freeDeliveryLimit, "", "", "");
        paymentSettings.save();

        ContactDTO contact = new ContactDTO(user.phone, user.email, "", "", "");
        contact.save();

        List<UserDTO> users = new ArrayList<UserDTO>();
        users.add(user);

        BalanceDTO balance = new BalanceDTO();

        VisualSettingsDTO visualSettings = new VisualSettingsDTO();
        visualSettings.navbarTextColor = navbarTextColor;
        visualSettings.navbarColor = navbarColor;
        visualSettings.navbarShopItemsColor = navbarShopItemsColor;
        SidebarColorScheme color = (SidebarColorScheme) SidebarColorScheme.findAll().get(0);
        visualSettings.sidebarColorScheme = color;

        ShopDTO shop = new ShopDTO(users, paymentSettings, delivery, contact, balance, visualSettings, name, "", "", domain, "en_US");
        shop.startTime = SHOP_OPEN_FROM;
        shop.endTime = SHOP_OPEN_UNTIL;
        shop.googleStaticMapsApiKey = WISEHANDS_STATIC_MAPS_KEY;
        shop.googleMapsApiKey = WISEHANDS_MAPS_KEY;

        AdditionalSettingForShop additionalSettingForShop = new AdditionalSettingForShop();
        additionalSettingForShop.setWorkkingTime(shop);
        shop = shop.save();
        additionalSettingForShop.setPageListForFooter(shop);

        _appendDomainToList(domain);
        return shop = shop.save();
    }

    public DomainValidation validateShopDetails(String domain) {
        boolean isDevEnv = Boolean.parseBoolean(Play.configuration.getProperty("dev.env"));
        DomainValidation domainValidation = new DomainValidation();
        System.out.println("validateShopDetails " + isDevEnv);
        if(isDevEnv){
            domainValidation.isValid = domain.contains(".localhost");
            domainValidation.errorReason = "Domain in dev env should follow yourdomain.localhost pattern. You entered " + domain;
        } else {
            if(domain.contains("wisehands.me")) {
                domainValidation.isValid = true;
                return domainValidation;
            }
            String domainIp = null;
            try {
                domainIp = InetAddress.getByName(domain).getHostAddress();
                if (!domainIp.equals(SERVER_IP)) {
                    domainValidation.isValid = false;
                    domainValidation.errorReason = "domain ip address is not correct: " + domainIp;
                }
            } catch (UnknownHostException e) {
                e.printStackTrace();
                domainValidation.isValid = false;
                domainValidation.errorReason = "Unknown Host for domain enetered for shop: " + domain;
            }

        }

        boolean isDomainRegisteredAlready = !ShopDTO.find("byDomain", domain).fetch().isEmpty();
        if (isDomainRegisteredAlready) {
            domainValidation.isValid = false;
            domainValidation.errorReason = domain + " is used by another user. Please select other one";
        }
        return domainValidation;
    }

    private static void _appendDomainToList(String domainName) {
        String filename = "domains.txt";
        System.out.println("Appending domain name" + domainName + " to domains.txt");
        try {
            Files.write(Paths.get(filename), (domainName + System.lineSeparator()).getBytes(),StandardOpenOption.CREATE,StandardOpenOption.APPEND);
        }catch (IOException e) {
            System.out.println("_appendDomainToList" + e.getStackTrace());
        }
    }
}
