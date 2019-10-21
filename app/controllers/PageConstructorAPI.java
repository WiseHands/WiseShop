package controllers;

import models.PageConstructorDTO;
import models.ShopDTO;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.util.ArrayList;
import java.util.List;

public class PageConstructorAPI extends AuthController {

    public static void details(String client, String uuid) throws Exception {

        PageConstructorDTO pageConstructorDTO = PageConstructorDTO.findById(uuid);
        System.out.println("PageConstructorDTO " + pageConstructorDTO);

        renderJSON(json(pageConstructorDTO));
    }

    public static void create(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));

        String url = (String) jsonBody.get("url");
        String title = (String) jsonBody.get("title");
        String body = (String) jsonBody.get("body");

        PageConstructorDTO pageConstructor = new PageConstructorDTO(url, title, body, shop);
        pageConstructor.save();
        renderJSON(json(pageConstructor));
    }

    public static void all(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }

        List<PageConstructorDTO> pageConstructor = PageConstructorDTO.find("byShop", shop).fetch();
        System.out.println("PageConstructorDTO " + pageConstructor);
        renderJSON(json(pageConstructor));
    }

    public static void update(String client, String uuid) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));

        String url = (String) jsonBody.get("url");
        String title = (String) jsonBody.get("title");
        String body = (String) jsonBody.get("body");

        PageConstructorDTO pageConstructorDTO = PageConstructorDTO.findById(uuid);
        pageConstructorDTO.url = url;
        pageConstructorDTO.title = title;
        pageConstructorDTO.body = body;

        pageConstructorDTO.save();

        renderJSON(json(pageConstructorDTO));
    }

    public static void delete(String client, String uuid) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        PageConstructorDTO pageConstructorDTO = PageConstructorDTO.findById(uuid);

        pageConstructorDTO.delete();
        ok();
    }


}