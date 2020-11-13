package controllers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import models.OrderDTO;
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

        QrDTO qr = new QrDTO(name, shop.uuid);
        qr.save();
        renderJSON(json(qr));
    }

    public static void edit(String client) throws ParseException {

        JSONParser parser = new JSONParser();
        JSONObject parseObject = (JSONObject) parser.parse(params.get("body"));
        String name = (String) parseObject.get("name");

        QrDTO qr = QrDTO.findById(parseObject.get("uuid"));
        qr.name = name;
        qr.save();
        renderJSON(json(qr));
    }

    public static void list(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        List<QrDTO> qrList;
        String query = "select q from QrDTO q where q.isQrDeleted = 0 and q.shopUuid = ?1";
        qrList = QrDTO.find(query, shop.uuid).fetch();

        System.out.println("qrList => " + qrList);
        renderJSON(json(qrList));
    }

    public static void info(String client) {
        renderJSON(json(QrDTO.findById(request.params.get("uuid"))));
    }

    public static void save(String client) throws ParseException{
        JSONParser parser = new JSONParser();
        JSONObject jsonObject = (JSONObject) parser.parse(params.get("body"));
        String uuid = (String) jsonObject.get("uuid");
        String name = (String) jsonObject.get("name");
        System.out.println(uuid + "\n" + name);
        QrDTO qr = QrDTO.findById(uuid);
        qr.name = name;
        qr.save();
        renderJSON(json(qr));
    }

    public static void delete(String client) {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        System.out.println("delete");
        QrDTO qr = QrDTO.findById(request.params.get("uuid"));
        qr.delete();
        //qr.isQrDeleted = true;
        //qr.save();
        ok();
    }
}
