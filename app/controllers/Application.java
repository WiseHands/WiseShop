package controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import play.Play;
import play.i18n.Lang;
import play.mvc.*;

import models.*;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;
import java.util.UUID;


public class Application extends Controller {

    private static final boolean isDevEnv = Boolean.parseBoolean(Play.configuration.getProperty("dev.env"));
    private static DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
    public static final int PAGE_SIZE = 6;

    @Before
    static void corsHeaders() {
        dateFormat.setTimeZone(TimeZone.getTimeZone("GMT"));
        response.setHeader("Access-Control-Allow-Origin", "*");
    }

    public static void login(String client) {
        if(client.equals("wisehands.me") || isDevEnv) {
            String googleOauthClientId = Play.configuration.getProperty("google.oauthweb.client.id");
            String googleMapsApiKey = Play.configuration.getProperty("google.maps.api.key");
            String googleAnalyticsId = Play.configuration.getProperty("google.analytics.id");
            renderTemplate("WiseHands/index.html", googleOauthClientId, googleMapsApiKey, googleAnalyticsId);
        }
        redirect("https://wisehands.me/", true);
    }

    public static void wisehands(String client) {
        String googleOauthClientId = Play.configuration.getProperty("google.oauthweb.client.id");
        String googleMapsApiKey = Play.configuration.getProperty("google.maps.api.key");
        String googleAnalyticsId = Play.configuration.getProperty("google.analytics.id");
        renderTemplate("WiseHands/index.html", googleOauthClientId, googleMapsApiKey, googleAnalyticsId);
    }

    public static void index(String client) {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }

        String locale = "en_US";
        if(shop != null && shop.locale != null) {
            locale = shop.locale;
        }
        Lang.change(locale);

        if (client.equals("wisehands.me")){
            String googleOauthClientId = Play.configuration.getProperty("google.oauthweb.client.id");
            String googleMapsApiKey = Play.configuration.getProperty("google.maps.api.key");
            String googleAnalyticsId = Play.configuration.getProperty("google.analytics.id");
            renderTemplate("WiseHands/index.html", googleOauthClientId, googleMapsApiKey, googleAnalyticsId);
        }

        Date date = new Date();


        Http.Header xforwardedHeader = request.headers.get("x-forwarded-for");
        String ip = "";
        if (xforwardedHeader != null){
            ip = xforwardedHeader.value();
        }

        String agent = request.headers.get("user-agent").value();
        System.out.println("User with ip " + ip + " and user-agent " + agent + " opened shop " + shop.shopName + " at " + dateFormat.format(date));

        if (shop.isTemporaryClosed) {
            renderTemplate("Application/temporaryClosed.html", shop);
        }

        Http.Cookie userTokenCookie = request.cookies.get("userToken");
        if(userTokenCookie == null) {
            UUID uuid = UUID.randomUUID();
            String token = generateTokenForCookie(uuid.toString(), agent);
            response.setCookie("userToken", token);
        }


        List<ProductDTO> products;
        String query = "select p from ProductDTO p, CategoryDTO c where p.category = c and p.shop = ?1 and c.isHidden = ?2 order by p.sortOrder asc";
        products = ProductDTO.find(query, shop, false).fetch(PAGE_SIZE);
        System.out.println("\n\n\nODUUCTTTTSSSS: " + products.size());

        renderTemplate("Application/shop.html", shop, products);
    }

    public static void shop(String client) {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }

        Date date = new Date();

        Http.Header xforwardedHeader = request.headers.get("x-forwarded-for");
        String ip = "";
        if (xforwardedHeader != null){
            ip = xforwardedHeader.value();
        }
        String agent = request.headers.get("user-agent").value();
        System.out.println("User with ip " + ip + " and user-agent " + agent + " opened SHOP " + shop.shopName + " at " + dateFormat.format(date));

        render(shop);
    }

    public static void allProductsInShop(String client) {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }

        Date date = new Date();

        Http.Header xforwardedHeader = request.headers.get("x-forwarded-for");
        String ip = "";
        if (xforwardedHeader != null){
            ip = xforwardedHeader.value();
        }
        String agent = request.headers.get("user-agent").value();
        System.out.println("User with ip " + ip + " and user-agent " + agent + " opened SHOP " + shop.shopName + " at " + dateFormat.format(date));

        render(shop);
    }



    public static void page(String client, String uuid) {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }

        PageConstructorDTO page = PageConstructorDTO.findById(uuid);
        System.out.println("page for render " + page.getBody());

        List<PageConstructorDTO> pageList = PageConstructorDTO.find("byShop", shop).fetch();

        render(shop, page, pageList);
    }

    public static void category(String client, String uuid){
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        CategoryDTO category = CategoryDTO.findById(uuid);
        List<ProductDTO> productList = ProductDTO.find("byCategory", category).fetch();
        System.out.println("\n\n\nCATEGORY" + uuid + category.name + productList.size());
        render(shop, category, productList);
    }

    public static void product(String client, String uuid){
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null){
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        ProductDTO product = ProductDTO.findById(uuid);
        System.out.println("\n\n\nCATEGORY" + uuid + product.name);
        CategoryDTO category = product.category;

        render(product, category, shop);
    }

    public static void shoppingCart(String client, String uuid){
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null){
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
//        ProductDTO product = ProductDTO.findById(uuid);

        render(shop);
    }


    public static void done(String client) {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }

        DeliveryDTO delivery = shop.delivery;
        if(delivery.orderMessage == null || delivery.orderMessage.equals("")) {
            delivery.orderMessage = "Замовлення успішно завершено. Очікуйте, з вами зв'яжуться.";
            delivery = delivery.save();
        }
        render(delivery);
    }

    public static void fail(String client) {
        render();
    }

    public static void admin(String client) {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }

        Date date = new Date();

        Http.Header xforwardedHeader = request.headers.get("x-forwarded-for");
        String ip = "";
        if (xforwardedHeader != null){
            ip = xforwardedHeader.value();
        }

        String agent = request.headers.get("user-agent").value();
        System.out.println("User with ip " + ip + " and user-agent " + agent + " opened ADMIN " + shop.shopName + " at " + dateFormat.format(date));

        render(shop);
    }

    public static void superAdmin(String client) {
        render();
    }

    public static void sitemap(String client) throws IOException {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }


        Date date = new Date();


        Http.Header xforwardedHeader = request.headers.get("x-forwarded-for");
        String ip = "";
        if (xforwardedHeader != null){
            ip = xforwardedHeader.value();
        }

        String agent = request.headers.get("user-agent").value();
        System.out.println("User with ip " + ip + " and user-agent " + agent + " opened sitemap " + shop.shopName + " at " + dateFormat.format(date));


        renderTemplate("Prerender/" + shop.uuid + "/" + "sitemap.xml");


    }

    public static void manifestAdmin(String client) throws IOException {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        render(shop);
    }


    private static String generateTokenForCookie(String userId, String userAgent) {
        String token = "";
        try {
            String encodingSecret = Play.configuration.getProperty("jwt.secret");
            Algorithm algorithm = Algorithm.HMAC256(encodingSecret);

            long nowMillis = System.currentTimeMillis();
            Date now = new Date(nowMillis);

            token = JWT.create()
                    .withIssuedAt(now)
                    .withSubject(userId)
                    .withClaim("userAgent", userAgent)
                    .withIssuer("wisehands")
                    .sign(algorithm);
        } catch (JWTCreationException exception){
            //Invalid Signing configuration / Couldn't convert Claims.
        }
        return token;
    }



}
