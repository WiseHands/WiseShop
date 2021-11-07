package controllers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import models.*;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import play.data.Upload;

import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class VisualSettingsAPI extends AuthController {
    public static final String USERIMAGESPATH = "public/shop_logo/";


    public static void details(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        renderJSON(json(shop.visualSettingsDTO));
    }

    public static void update(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        VisualSettingsDTO visualSettings = shop.visualSettingsDTO;

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));
        visualSettings.navbarColor = (String) jsonBody.get("navbarColor");
        visualSettings.navbarTextColor = (String) jsonBody.get("navbarTextColor");
        visualSettings.navbarShopItemsColor = (String) jsonBody.get("navbarShopItemsColor");
        visualSettings.logoHref = (String) jsonBody.get("logoHref");
        visualSettings.isFooterOn = Boolean.parseBoolean(String.valueOf(jsonBody.get("isFooterOn")));

        visualSettings = visualSettings.save();
        shop.save();

        renderJSON(json(visualSettings));
    }

    public static void uploadLogo(String client, File fake) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        VisualSettingsDTO visualSettings = shop.visualSettingsDTO;

        List<Upload> photos = (List<Upload>) request.args.get("__UPLOADS");
        for(Upload photo: photos) {
            String filename = UUID.randomUUID()+".jpg";
            Path path = Paths.get(USERIMAGESPATH + shop.uuid);
            Files.createDirectories(path);
            FileOutputStream out = new FileOutputStream(USERIMAGESPATH + shop.uuid + "/" + filename);
            out.write(photo.asBytes());
            out.close();
            visualSettings.shopLogo = filename;
        }
        visualSettings = visualSettings.save();
        renderJSON(json(visualSettings.shopLogo));
    }

    public static void uploadFavicon(String client, File fake) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        VisualSettingsDTO visualSettings = shop.visualSettingsDTO;


        List<Upload> photos = (List<Upload>) request.args.get("__UPLOADS");
        for(Upload photo: photos) {
            String filename = UUID.randomUUID()+".jpg";
            Path path = Paths.get(USERIMAGESPATH + shop.uuid);
            Files.createDirectories(path);
            FileOutputStream out = new FileOutputStream(USERIMAGESPATH + shop.uuid + "/" + filename);
            out.write(photo.asBytes());
            out.close();
            visualSettings.shopFavicon = filename;
        }
        visualSettings = visualSettings.save();
        renderJSON(json(visualSettings.shopFavicon));
    }

    public static void deleteLogo(String client, File fake) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        VisualSettingsDTO visualSettings = shop.visualSettingsDTO;

        File file = new File(USERIMAGESPATH + shop.uuid + "/" + visualSettings.shopLogo);
        if(!file.delete()){
            error("error deleting file: " + USERIMAGESPATH + shop.uuid + "/" + visualSettings.shopLogo);
        }

        visualSettings.shopLogo = "";
        visualSettings = visualSettings.save();
        renderJSON(json(visualSettings));
    }

    public static void deleteFavicon(String client, File fake) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        VisualSettingsDTO visualSettings = shop.visualSettingsDTO;

        File file = new File(USERIMAGESPATH + shop.uuid + "/" + visualSettings.shopFavicon);
        if(!file.delete()){
            error("error deleting file: " + USERIMAGESPATH + shop.uuid + "/" + visualSettings.shopFavicon);
        }

        visualSettings.shopFavicon = "";
        visualSettings = visualSettings.save();
        renderJSON(json(visualSettings));
    }


}