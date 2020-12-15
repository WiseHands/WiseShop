package jobs;

import models.PageConstructorDTO;
import models.ShopDTO;

public class AdditionalSettingForShop {

    private static final String OPLATA = "<p>Оплата відбувається одним з наступних способів:</p><ul>\t<li>готівкою при отриманні</li>\t<li>оплата по безготівковому рахунку</li>\t<li>онлайн оплата на сайті</li>\t<li>переказ на картку</li></ul><p>При оформленні замовлення до вас зателефонує менеджер та уточнить усі деталі.</p>";
    private static final String DOSTAVKA = "<p>Доставка доступна у таких варіантах:</p><ul>\t<li>самовивіз по адресі</li>\t<li>доставка кур&#39;єром у межах міста</li>\t<li>відправлення на відділення Нової Пошти</li></ul><p>При оформленні замовлення до вас зателефонує менеджер та уточнить усі деталі.</p>";
    private static final String POVERNENNYA = "<p>Повернення товару здійснюється відповідно до Закону України &laquo;Про захист прав споживачів&raquo;. У період 14 днів, не враховуючи дня покупки, можна оформити повернення товару за умов:</p><ul>\t<li>товар не був у експлуатації</li>\t<li>цілісність комплекту та упаковки не порушена</li>\t<li>збережений документ, який підтверджує оплату</li>\t<li>виріб не належить до переліку товарів неналежної якості, повернення яких обмежено рішенням Кабінету Міністрів України (постанова від 19 березня 1994 року №172)</li></ul><p>&nbsp;</p>";


    public AdditionalSettingForShop(){

    }

    public void setWorkingTime(ShopDTO shop){

        if(shop.monStartTime == null) {
            shop.monStartTime = "04:20";
            shop.monEndTime = "16:21";
        }

        if(shop.tueStartTime == null) {
            shop.tueStartTime = "04:20";
            shop.tueEndTime = "16:21";
        }

        if(shop.wedStartTime == null) {
            shop.wedStartTime = "04:20";
            shop.wedEndTime = "16:21";
        }

        if(shop.thuStartTime == null) {
            shop.thuStartTime = "04:20";
            shop.thuEndTime = "16:21";
        }
        if(shop.friStartTime == null) {
            shop.friStartTime = "04:20";
            shop.friEndTime = "16:21";
        }
        if(shop.satStartTime == null) {
            shop.satStartTime = "04:20";
            shop.satEndTime = "16:21";
        }
        if(shop.sunStartTime == null) {
            shop.sunStartTime = "04:20";
            shop.sunEndTime = "16:21";
        }
    }


    public void setPageListForFooter(ShopDTO shop){
        Contract contract = new Contract();
        String contacts =
                "<p>Наші контакти для Вас: </p><ul>\t<li>Телефон "
                        + shop.contact.phone + "</li>\t<li>Емейл "
                        + shop.contact.email + "</li>\t<li>Адреса "
                        + shop.contact.addressCity + "</li>\t</ul>" +
                        "<p>&nbsp;</p>";

        String aboutUs = "Про нас...";

        PageConstructorDTO page = new PageConstructorDTO("/page/", "Оплата", OPLATA, shop);
        PageConstructorDTO page1 = new PageConstructorDTO("/page/", "Доставка", DOSTAVKA, shop);
        PageConstructorDTO page2 = new PageConstructorDTO("/page/", "Повернення", POVERNENNYA, shop);
        PageConstructorDTO page3 = new PageConstructorDTO("/page/", "Контакти", contacts, shop);
        PageConstructorDTO page4 = new PageConstructorDTO("/page/", "Про нас", aboutUs, shop);
        PageConstructorDTO page5 = new PageConstructorDTO("/page/", "Договір", contract.createContract(shop), shop);
        page.save();
        page1.save();
        page2.save();
        page3.save();
        page4.save();
        page5.save();
    }

}
