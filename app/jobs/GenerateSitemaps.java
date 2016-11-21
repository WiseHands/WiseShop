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

        if (isDevEnv) {
            List<ShopDTO> allShops = ShopDTO.findAll();
            for (ShopDTO shop: allShops){
                generateSitemapForShop(shop);
            }
        }


    }

    private void generateSitemapForShop(ShopDTO shop) throws IOException {
        List<ProductDTO> products = ProductDTO.find("byShop", shop).fetch();
        List<String> urls = new ArrayList<String>();
        for (ProductDTO product : products) {
            String url = "http://" + shop.domain + "/#!/product/" + product.uuid;
            urls.add(url);
        }
        List<CategoryDTO> categories = CategoryDTO.find("byShop", shop).fetch();
        for (CategoryDTO category : categories) {
            String url = "http://" + shop.domain + "/#!/category/" + category.uuid;
            urls.add(url);
        }

        urls.add("http://" + shop.domain + "/#!/contacts");
        urls.add("http://" + shop.domain + "/#!/");
        System.out.println(urls);


        String path = "app/views/Prerender/" + shop.uuid + "/";
        Files.createDirectories(Paths.get(path));

        WebSitemapGenerator sitemapGenerator = WebSitemapGenerator
                .builder("http://" +  shop.domain, new File(path))
                .build();

        for(String url : urls) {
            WebSitemapUrl sitemapUrl = new WebSitemapUrl.Options(
                    url)
                    .lastMod(new Date()).priority(1.0)
                    .changeFreq(ChangeFreq.HOURLY).build();
            sitemapGenerator.addUrl(sitemapUrl);
        }
        sitemapGenerator.write();

    }

}
