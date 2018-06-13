package jobs;

import models.OrderDTO;
import models.ShopDTO;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import play.i18n.Messages;
import play.jobs.Job;
import services.SmsSender;
import services.SmsSenderImpl;

import javax.inject.Inject;


public class SendSmsJob extends Job {
    static SmsSender smsSender = new SmsSenderImpl();
    private OrderDTO order;
    private ShopDTO shop;

    public SendSmsJob(OrderDTO order, ShopDTO shop) {
        this.order = order;
        this.shop = shop;
    }

    public void doJob() throws Exception {

        this.order = OrderDTO.find("byUuid", order.uuid).first();

        String smsText = Messages.get("order.is.processing", order.name, order.total);
        String response = smsSender.sendSms(order.phone, smsText);

        JSONParser parser = new JSONParser();
        JSONObject jsonObject = (JSONObject) parser.parse(response);
        Object error = jsonObject.get("error");
        if(error == null) {
            order.sentToCustomer = true;
        } else {
            order.errorReasonSentToCustomer = String.valueOf(error);
        }
        order.save();

        smsText =  Messages.get("new.order.total", order.name, order.total);
        response = smsSender.sendSms(shop.contact.phone, smsText);
        jsonObject = (JSONObject) parser.parse(response);
        error = jsonObject.get("error");
        if(error == null) {
            order.sentToManager = true;
        } else {
            order.errorReasonSentToManager = String.valueOf(error);
        }
        order.save();
    }

}
