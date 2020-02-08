package controllers;

import models.ProductImage;
import models.ShopDTO;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import play.data.Upload;

import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

public class FileAPI extends AuthController {
    public static final String USERIMAGESPATH = "public/files/";

    public static void upload(String client, File fake) throws Exception {

        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }

        List<Upload> photos = (List<Upload>) request.args.get("__UPLOADS");

        Upload photo = photos.get(0);
        String filename = UUID.randomUUID()+".jpg";

        Path path = Paths.get(USERIMAGESPATH + shop.uuid);
        Files.createDirectories(path);

        String jsonFileName = USERIMAGESPATH + shop.uuid + "/" + filename;

        FileOutputStream out = new FileOutputStream(jsonFileName);


        out.write(photo.asBytes());
        out.close();
        ProductImage productImage = new ProductImage(filename, "/" + jsonFileName);
        productImage = productImage.save();

        renderJSON(json(productImage));

    }

}
