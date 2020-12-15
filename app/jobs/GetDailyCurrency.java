package jobs;


import models.ShopDTO;
import play.jobs.Job;
import play.jobs.On;

import java.util.List;

@On("0 0 12 * * ?")
public class GetDailyCurrency extends Job {

    public void doJob() throws Exception {
        System.out.println("get currency for shop");

        List<ShopDTO> shopList = ShopDTO.findAll();
        for (ShopDTO shop : shopList){
            if (shop.currencyShop.currency != null){
                getCurrencyList(shop);
            }
        }

    }

    private void getCurrencyList(ShopDTO shop) {

    }


}
