package jobs;

import com.redfin.sitemapgenerator.ChangeFreq;
import com.redfin.sitemapgenerator.WebSitemapGenerator;
import com.redfin.sitemapgenerator.WebSitemapUrl;
import models.*;
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
public class GenerateVisualSettings extends Job {
    private static final boolean isDevEnv = Boolean.parseBoolean(Play.configuration.getProperty("dev.env"));

    public void doJob() throws Exception {
        SidebarColorScheme color = null;
        List<SidebarColorScheme> colors = SidebarColorScheme.findAll();
        if(colors == null || colors.size() == 0) {
            color = new SidebarColorScheme("blue", "Синій");
            color = color.save();
            color = new SidebarColorScheme("red", "Червоний");
            color = color.save();
            color = new SidebarColorScheme("purple", "Фіолетовий");
            color = color.save();
            color = new SidebarColorScheme("dark", "Темний");
            color = color.save();
            color = new SidebarColorScheme("grey", "Сірий");
            color = color.save();
            color = new SidebarColorScheme("mdb", "Блакитний");
            color = color.save();
            color = new SidebarColorScheme("deep-orange", "Оранжевий");
            color = color.save();
            color = new SidebarColorScheme("graphite", "Графіт");
            color = color.save();
            color = new SidebarColorScheme("pink", "Рожевий");
            color = color.save();
            color = new SidebarColorScheme("light-grey", "Світлосірий");
            color = color.save();
            color = new SidebarColorScheme("green", "Зелений");
            color = color.save();
        }

            List<ShopDTO> allShops = ShopDTO.findAll();
        for (int i=0; i<allShops.size(); i++) {
            ShopDTO shop = allShops.get(i);
            if(shop.visualSettingsDTO == null){
                VisualSettingsDTO visualSettings = new VisualSettingsDTO();
                visualSettings.navbarTextColor = "#fff";
                visualSettings.navbarColor = "#003830";
                visualSettings.navbarShopItemsColor = "#F44336";

                shop.visualSettingsDTO = visualSettings;
                shop.visualSettingsDTO.sidebarColorScheme = color;
                shop.visualSettingsDTO.save();
                shop.save();
            }
        }

    }


}
