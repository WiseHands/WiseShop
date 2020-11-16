package emails;

import controllers.OrderAPI;
import models.*;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class MailOrder {
    public long orderNumber;
    public String phone;
    public String time;
    public String email;
    public String total;
    public String shopName;
    public String orderName;
    public String deliveryType;
    public String paymentType;
    public String clientAddressCity;
    public String clientAddressStreetName;
    public String clientPostDepartmentNumber;
    public String uuid;
    public String comment;
    public List<OrderItemDTO> orderItems;
    public String clientAddressBuildingNumber;
    public String clientAddressApartmentEntrance;
    public String clientAddressApartmentEntranceCode;
    public String clientAddressApartmentFloor;
    public String clientAddressApartmentNumber;
    public String language;
    public String clientName;
    public List<MailOrderItem> orderItemList = new ArrayList<>();

    public MailOrder(OrderDTO order, ShopDTO shop, String language) {
        this.language = language;
        this.shopName = OrderAPI.getTranslatedShopName(shop, language);
        this.orderNumber = OrderDTO.find("byShop", shop).fetch().size();
        this.phone = order.phone;
        Date resultDate = new Date(order.time);
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd.MM.yyyy HH:mm");
        DecimalFormat format = new DecimalFormat("0.##");
        String total = format.format(order.total);
        this.time = simpleDateFormat.format(resultDate);
        this.email = order.email;
        this.total = total;
        this.orderName = order.name;
        this.deliveryType = order.deliveryType;
        this.paymentType = order.paymentType;
        this.clientAddressCity = order.clientCity;
        this.clientAddressStreetName = order.clientAddressStreetName;
        this.clientPostDepartmentNumber = order.clientPostDepartmentNumber;
        this.uuid = order.uuid;
        this.comment = order.comment;
        this.orderItems = order.items;
        this.clientName = order.name;
        this.clientAddressBuildingNumber = order.clientAddressBuildingNumber;
        this.clientAddressApartmentEntrance = order.clientAddressApartmentEntrance;
        this.clientAddressApartmentEntranceCode = order.clientAddressApartmentEntranceCode;
        this.clientAddressApartmentFloor = order.clientAddressApartmentFloor;
        this.clientAddressApartmentNumber = order.clientAddressApartmentNumber;

        for(OrderItemDTO orderItem : order.items) {
            MailOrderItem mailOrderItem = createMailOrderItem(orderItem);
            this.orderItemList.add(mailOrderItem);
        }

    }

    public MailOrderItem createMailOrderItem(OrderItemDTO item) {
        MailOrderItem mailOrderItem = new MailOrderItem();
        ProductDTO product = ProductDTO.find("byUuid", item.productUuid).first();
        List<TranslationItemDTO> translationList = product.productNameTextTranslationBucket.translationList;
        TranslationItemDTO translationItemDTO = translationList.stream().filter(language -> language.language.equals(this.language)).collect(Collectors.toList()).get(0);
        mailOrderItem.name = translationItemDTO.content;
        mailOrderItem.price = item.price;
        mailOrderItem.quantity = item.quantity;
        mailOrderItem.imagePath = item.imagePath;
        return mailOrderItem;
    }
}
