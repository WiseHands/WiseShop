package controllers;

import cz.jiripinkas.jsitemapgenerator.WebPage;
import cz.jiripinkas.jsitemapgenerator.generator.SitemapGenerator;
import models.CategoryDTO;
import models.PageConstructorDTO;
import models.ProductDTO;
import models.ShopDTO;

import java.util.ArrayList;
import java.util.List;

public class SitemapController extends  AuthController {
    public String sitemap(String client) {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        String homepage = "https://" + shop.domain;
        SitemapGenerator sitemap = SitemapGenerator.of(homepage);
        sitemap.addPage(WebPage.builder().maxPriorityRoot().build());

        WebPage webPage = WebPage.builder().name("/#!/contacts/").changeFreqDaily().build();
        sitemap.addPage(webPage);

        List<CategoryDTO> categories = CategoryDTO.find("byShop", shop).fetch();
        for (CategoryDTO category : categories) {
            String url = "/#!/category/" + category.uuid;
            webPage = WebPage.builder().name(url).changeFreqDaily().build();
            sitemap.addPage(webPage);
        }

        List<ProductDTO> products = ProductDTO.find("byShop", shop).fetch();
        for (ProductDTO product : products) {
            String url = "/#!/product/" + product.uuid;
            webPage = WebPage.builder().name(url).changeFreqDaily().build();
            sitemap.addPage(webPage);
        }

        List<PageConstructorDTO> pages = PageConstructorDTO.find("byShop", shop).fetch();
        for (PageConstructorDTO page : pages) {
            String url = "/#!/pages/" + page.uuid;
            webPage = WebPage.builder().name(url).changeFreqDaily().build();
            sitemap.addPage(webPage);
        }

        return sitemap.toString();
    }
}
