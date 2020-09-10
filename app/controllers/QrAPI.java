package controllers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import models.ProductDTO;
import models.QrDTO;
import models.ShopDTO;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import javax.swing.text.html.parser.Parser;
import java.util.ArrayList;
import java.util.List;

public class QrAPI extends AuthController {

    public static void create(String client) throws ParseException {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }

        JSONParser parser = new JSONParser();
        JSONObject jsonObject = (JSONObject) parser.parse(params.get("body"));
        String name = (String) jsonObject.get("name");
        System.out.println("name " + jsonObject);
        QrDTO qr = new QrDTO(name);
        qr.save();
        List<QrDTO> qrList;
        if(shop.qrList == null){
            qrList = new ArrayList<QrDTO>();
        }
        shop.qrList.add(qr);
        shop.save();
        renderJSON(json(qr));
    }

    public static void list(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        List<QrDTO> qrList = shop.qrList;

        System.out.println("qrList => " + qrList);
        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        String json = gson.toJson(qrList);
        renderJSON(json);
    }
}
