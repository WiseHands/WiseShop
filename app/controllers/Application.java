package controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import enums.FeedbackRequestState;
import play.Play;
import play.db.jpa.JPA;
import play.i18n.Lang;
import play.i18n.Messages;
import play.mvc.*;

import models.*;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;


public class Application extends Controller {

    public static final boolean isDevEnv = Boolean.parseBoolean(Play.configuration.getProperty("dev.env"));
    private static DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
    public static final int PAGE_SIZE = 6;

    @Before
    static void corsHeaders() {
        dateFormat.setTimeZone(TimeZone.getTimeZone("GMT"));
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
        response.setHeader("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization");
    }

    public static void main(String client) {
            if(client.equals("wisehands.me") || isDevEnv) {
                String googleOauthClientId = Play.configuration.getProperty("google.oauthweb.client.id");
                String googleMapsApiKey = Play.configuration.getProperty("google.maps.api.key");
                String googleAnalyticsId = Play.configuration.getProperty("google.analytics.id");
                renderTemplate("WiseHands/index.html", googleOauthClientId, googleMapsApiKey, googleAnalyticsId);
            }
            redirect("https://wisehands.me/login", true);

        }


    public static void allowCors(){
        ok();
    }

    public static void login(String client) {
        if(client.equals("wisehands.me") || isDevEnv) {
            String googleOauthClientId = Play.configuration.getProperty("google.oauthweb.client.id");
            String googleMapsApiKey = Play.configuration.getProperty("google.maps.api.key");
            String googleAnalyticsId = Play.configuration.getProperty("google.analytics.id");
            renderTemplate("WiseHands/login.html", googleOauthClientId, googleMapsApiKey, googleAnalyticsId);
        }
        redirect("https://wisehands.me/login", true);

    }

    public static void uaSignin(String client) {
        String googleOauthClientId = Play.configuration.getProperty("google.oauthweb.client.id");
        String googleMapsApiKey = Play.configuration.getProperty("google.maps.api.key");
        String googleAnalyticsId = Play.configuration.getProperty("google.analytics.id");
        renderTemplate("Application/uaSignin.html", googleOauthClientId, googleMapsApiKey, googleAnalyticsId);
    }

    public static void uaShopLocation(String client) {
        String googleOauthClientId = Play.configuration.getProperty("google.oauthweb.client.id");
        String googleMapsApiKey = Play.configuration.getProperty("google.maps.api.key");
        String googleAnalyticsId = Play.configuration.getProperty("google.analytics.id");
        renderTemplate("Application/uaShopLocation.html", googleOauthClientId, googleMapsApiKey, googleAnalyticsId);
    }

    public static void orderFeedback(String client, String uuid) {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        OrderDTO order = OrderDTO.find("byUuid",uuid).first();
        boolean isSendRequest = order.feedbackRequestState.equals(FeedbackRequestState.REQUEST_SENT);
        String currency = Messages.get("shop.balance.currency");
        renderTemplate("Application/orderFeedback.html", shop, order, isSendRequest, currency);
    }

    public static void uaSignup(String client) {
        String googleOauthClientId = Play.configuration.getProperty("google.oauthweb.client.id");
        String googleMapsApiKey = Play.configuration.getProperty("google.maps.api.key");
        String googleAnalyticsId = Play.configuration.getProperty("google.analytics.id");
        renderTemplate("Application/uaSignup.html", googleOauthClientId, googleMapsApiKey, googleAnalyticsId);
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
        if (client.equals("wstore.pro")){
            String googleOauthClientId = Play.configuration.getProperty("google.oauthweb.client.id");
            String googleMapsApiKey = Play.configuration.getProperty("google.maps.api.key");
            String googleAnalyticsId = Play.configuration.getProperty("google.analytics.id");
            renderTemplate("Application/landing.html", googleOauthClientId, googleMapsApiKey, googleAnalyticsId);
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
        CoinAccountDTO coinAccount = CoinAccountDTO.find("byShop", shop).first();
        if (coinAccount != null && coinAccount.balance < 0) {
            renderTemplate("Application/closedDueToInsufficientFunds.html", shop);
        }

        generateCookieIfNotPresent(shop);


        List<ProductDTO> products;
        String query = "select p from ProductDTO p, CategoryDTO c where p.category = c and p.shop = ?1 and c.isHidden = ?2 and p.isActive = ?3 order by p.sortOrder asc";
              products = ProductDTO.find(query, shop, false, true).fetch();

        List<PageConstructorDTO> pageList = PageConstructorDTO.find("byShop", shop).fetch();
        shop.pagesList = pageList;

        renderTemplate("Application/shop.html", shop, products);
    }

    private static void generateCookieIfNotPresent(ShopDTO shop) {
        String agent = request.headers.get("user-agent").value();

        Http.Cookie userTokenCookie = request.cookies.get("JWT_TOKEN");
        if(userTokenCookie == null) {
            ShoppingCartDTO shoppingCart = new ShoppingCartDTO();
            shoppingCart.shopUuid = shop.uuid;
            shoppingCart.save();

            String token = generateTokenForCookie(shoppingCart.uuid, agent);
            response.setCookie("JWT_TOKEN", token);
        }
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

        List<PageConstructorDTO> pageList = PageConstructorDTO.find("byShop", shop).fetch();
        render(shop, pageList);
    }

    public static void footerShop(String client){
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }

        if (shop.locale.equals("uk_UA")){
            Lang.change("uk_UA");
        }
        if (shop.locale.equals("en_US")){
            Lang.change("en_US");
        }
        if (shop.locale.equals("pl_PL")){
            Lang.change("pl_PL");
        }
        Map<String, Object> map = new HashMap<String, Object>();
        String lowBalanceLabel = Messages.get("balance.transaction.low.shop.balance");
        map.put("lowBalanceLabel", lowBalanceLabel);
        renderTemplate("tags/footer-shop.html", shop, map);
    }

    public static void shopNetworks(String client) {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }

        ShopNetworkDTO network = shop.getNetwork();
        network.retrieveShopList();

        render(shop, network);
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

    public static void selectAddress(String client) {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        render(shop);
    }

    public static void page(String client, String uuid) {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }

        PageConstructorDTO page = PageConstructorDTO.findById(uuid);

        List<PageConstructorDTO> pageList = PageConstructorDTO.find("byShop", shop).fetch();
        shop.pagesList = pageList;
        render(shop, page, pageList);
    }

    public static void category(String client, String uuid){
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        CategoryDTO category = CategoryDTO.findById(uuid);

        List<ProductDTO> productList;
        String query = "select p from ProductDTO p, CategoryDTO c where p.category = c and p.shop = ?1 and c.isHidden = ?2 and p.isActive = ?3 and p.categoryUuid = ?4 order by p.sortOrder asc";
        productList = ProductDTO.find(query, shop, false, true, category.uuid).fetch();

        List<PageConstructorDTO> pageList = PageConstructorDTO.find("byShop", shop).fetch();
        shop.pagesList = pageList;

        render(shop, category, productList);
    }

    public static void product(String client, String uuid){
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null){
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        List<PageConstructorDTO> pageList = PageConstructorDTO.find("byShop", shop).fetch();
        shop.pagesList = pageList;

        ProductDTO product = ProductDTO.findById(uuid);
        CategoryDTO category = product.category;

        product.feedbackList = getFeedbackListFromDB(product);
        System.out.println("product.feedbackList => " + product.feedbackList);
        List<AdditionDTO> additionList = AdditionDTO.find("byProduct", product).fetch();
        product.additions = additionList;

        render(product, category, shop);
    }

    private static List<FeedbackDTO> getFeedbackListFromDB(ProductDTO product) {
        String query = "SELECT customerName, feedbackTime, quality, review, FeedbackCommentDTO.comment FROM FeedbackDTO" +
                " LEFT JOIN FeedbackCommentDTO" +
                " ON FeedbackDTO.feedbackComment_uuid = FeedbackCommentDTO.uuid" +
                " WHERE showReview = 1 and productUuid = '%s' order by feedbackTime desc";
        String feedbackListQuery = formatQueryString(query, product);
        List<Object[]> resultList = JPA.em().createNativeQuery(feedbackListQuery).getResultList();
        List<FeedbackDTO> feedbackResultList = new ArrayList<FeedbackDTO>();

        for (Object[] item: resultList){
            FeedbackDTO feedback = createFeedbackDTO(item);
            feedbackResultList.add(feedback);
        }

        return feedbackResultList;
    }

    private static FeedbackDTO createFeedbackDTO(Object[] item) {
        String customerName = (String) item[0];
        Long feedbackTime = Long.valueOf(String.valueOf(item[1]));
        String quality = (String) item[2];
        String review = (String) item[3];
        String comment = (String) item[4];
        System.out.println("FeedbackDTO => " + customerName + feedbackTime + quality + review + comment);
        FeedbackDTO feedback = new FeedbackDTO(quality, review, customerName, feedbackTime);
        feedback.comment = comment;
        return feedback;
    }

    private static String formatQueryString(String query, ProductDTO product) {
        String formattedQuery = String.format(
                query,
                product.uuid);
        return formattedQuery;
    }

    public static void shoppingCart(String client, String uuid){
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null){
            shop = ShopDTO.find("byDomain", "localhost").first();
        }

        List<PageConstructorDTO> pageList = PageConstructorDTO.find("byShop", shop).fetch();
        shop.pagesList = pageList;

        render(shop);
    }

    public static void done(String client) {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }

        DeliveryDTO delivery = shop.delivery;
        if(delivery.orderMessage == null || delivery.orderMessage.equals("")) {
            delivery.orderMessage = "Замовлення успішно завершене. Очікуйте, з вами зв'яжуться.";
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


        VisualSettingsDTO visualSettings = VisualSettingsDTO.find("byShop", shop).first();

        render(shop, visualSettings);
    }

    public static void superAdmin(String client) {
        render();
    }

    public static void marketing(String client) {
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

    public static String generateTokenForCookie(String shoppingCartId, String userAgent) {
        String token = "";
        try {
            String encodingSecret = Play.configuration.getProperty("jwt.secret");
            Algorithm algorithm = Algorithm.HMAC256(encodingSecret);

            long nowMillis = System.currentTimeMillis();
            Date now = new Date(nowMillis);

            token = JWT.create()
                    .withIssuedAt(now)
                    .withSubject(shoppingCartId)
                    .withClaim("userAgent", userAgent)
                    .withIssuer("wisehands")
                    .sign(algorithm);
        } catch (JWTCreationException exception){
            //Invalid Signing configuration / Couldn't convert Claims.
        }
        return token;
    }

    public static void landing(String client){
            render();
    }
    public static void uaContract(String client){
            render();
    }
    public static void privacy(String client){
            render();
    }

    public static void uaWizard(String client){
        renderTemplate("Application/uaNewWizard.html");
    }
    public static void serverError(String client){
            render();
    }
    public static void userDashboard(String client) {
        renderTemplate("wstore/userDashboard.html");
    }

    public static void termsofservice(String client){
        renderTemplate("WiseHands/termsofservice.html");
    }
    public static void privacypolicy(String client){
        renderTemplate("WiseHands/privacypolicy.html");
    }
    public static void cookiespolicy(String client){
        renderTemplate("WiseHands/cookiespolicy.html");
    }
    public static void refunds(String client){
        renderTemplate("WiseHands/refunds.html");
    }
    public static void hireFrontendDevelopers(String client){
        renderTemplate("WiseHands/Services/hireFrontendDevelopers.html");
    }
    public static void hireBackendDevelopers(String client){
        renderTemplate("WiseHands/Services/hireBackendDevelopers.html");
    }
    public static void hireDevopsDevelopers(String client){
        renderTemplate("WiseHands/Services/hireDevopsDevelopers.html");
    }
    public static void hireMobileDevelopers(String client){
        renderTemplate("WiseHands/Services/hireMobileDevelopers.html");
    }
    public static void hireReactDevelopers(String client){
        renderTemplate("WiseHands/Services/hireReactDevelopers.html");
    }
    public static void hireAngularDevelopers(String client){
        renderTemplate("WiseHands/Services/hireAngularDevelopers.html");
    }
    public static void hireVuejsDevelopers(String client){
        renderTemplate("WiseHands/Services/hireVuejsDevelopers.html");
    }
    public static void hirePolymerDevelopers(String client){
        renderTemplate("WiseHands/Services/hirePolymerDevelopers.html");
    }
    public static void hireGoDevelopers(String client){
        renderTemplate("WiseHands/Services/hireGoDevelopers.html");
    }
    public static void hireJavaDevelopers(String client){
        renderTemplate("WiseHands/Services/hireJavaDevelopers.html");
    }
    public static void hireNodejsDevelopers(String client){
        renderTemplate("WiseHands/Services/hireNodejsDevelopers.html");
    }
    public static void hirePythonDevelopers(String client){
        renderTemplate("WiseHands/Services/hirePythonDevelopers.html");
    }
    public static void hireAwsDevelopers(String client){
        renderTemplate("WiseHands/Services/hireAwsDevelopers.html");
    }
    public static void hireGooglecloudDevelopers(String client){
        renderTemplate("WiseHands/Services/hireGooglecloudDevelopers.html");
    }
    public static void hireAzureDevelopers(String client){
        renderTemplate("WiseHands/Services/hireAzureDevelopers.html");
    }
    public static void hireKubernetesDevelopers(String client){
        renderTemplate("WiseHands/Services/hireKubernetesDevelopers.html");
    }
    public static void hireIosDevelopers(String client){
        renderTemplate("WiseHands/Services/hireIosDevelopers.html");
    }
    public static void hireAndroidDevelopers(String client){
        renderTemplate("WiseHands/Services/hireAndroidDevelopers.html");
    }
}
