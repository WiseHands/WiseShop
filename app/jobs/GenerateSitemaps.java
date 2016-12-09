package jobs;

import com.redfin.sitemapgenerator.ChangeFreq;
import com.redfin.sitemapgenerator.WebSitemapGenerator;
import com.redfin.sitemapgenerator.WebSitemapUrl;
import models.CategoryDTO;
import models.ProductDTO;
import models.ShopDTO;
import play.Play;
import play.jobs.Job;
import play.jobs.OnApplicationStart;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@OnApplicationStart
public class GenerateSitemaps extends Job {
    private static final boolean isDevEnv = Boolean.parseBoolean(Play.configuration.getProperty("dev.env"));

    public void doJob() throws Exception {

        if (!isDevEnv) {
            List<ShopDTO> allShops = ShopDTO.findAll();
            for (ShopDTO shop: allShops){
                generateSitemapForShop(shop);
            }
        }


    }

    private void generateSitemapForShop(ShopDTO shop) throws IOException {

        List<ProductDTO> products = ProductDTO.find("byShop", shop).fetch();
        List<String> urls = new ArrayList<String>();
        urls.add("http://" + shop.domain + "/#!/contacts");

        for (ProductDTO product : products) {
            String url = "http://" + shop.domain + "/#!/product/" + product.uuid;
            urls.add(url);
        }
        List<CategoryDTO> categories = CategoryDTO.find("byShop", shop).fetch();
        for (CategoryDTO category : categories) {
            String url = "http://" + shop.domain + "/#!/category/" + category.uuid;
            urls.add(url);
        }

        String path = "app/views/Prerender/" + shop.uuid;
        Files.createDirectories(Paths.get(path));

        WebSitemapGenerator sitemapGenerator = WebSitemapGenerator
                .builder("http://" +  shop.domain, new File(path))
                .build();

        WebSitemapUrl homeUrl = new WebSitemapUrl.Options(
                "http://" + shop.domain + "/")
                .lastMod(new Date()).priority(1.0)
                .changeFreq(ChangeFreq.DAILY).build();
        sitemapGenerator.addUrl(homeUrl);

        for(String url : urls) {
            WebSitemapUrl sitemapUrl = new WebSitemapUrl.Options(
                    url)
                    .lastMod(new Date()).priority(0.6)
                    .changeFreq(ChangeFreq.DAILY).build();
            sitemapGenerator.addUrl(sitemapUrl);
        }

        System.out.println("\n\n\n GENERETING SITEMAP: ");
        System.out.println(urls);
        System.out.println(path);
        sitemapGenerator.write();

    }

}
