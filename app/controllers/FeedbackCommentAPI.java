package controllers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import enums.FeedbackRequestState;
import models.*;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import play.i18n.Messages;
import services.MailSender;
import services.MailSenderImpl;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class FeedbackCommentAPI extends AuthController{

    static MailSender mailSender = new MailSenderImpl();

    public static void createComment(String client) throws Exception{
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));

        String feedbackUuid = (String) jsonBody.get("feedbackUuid");
        String comment = (String) jsonBody.get("comment");

        FeedbackDTO feedback = FeedbackDTO.findById(feedbackUuid);
        FeedbackCommentDTO feedbackComment = new FeedbackCommentDTO(comment);
        feedbackComment.save();
        feedback.feedbackComment = feedbackComment;
        feedback.showReview = true;
        feedback.save();

        String customerMail = (String) jsonBody.get("customerMail");
        String customerName = (String) jsonBody.get("customerName");
        String productUuid = (String) jsonBody.get("productUuid");
        ProductDTO product = ProductDTO.findById(productUuid);

        mailSender.sendEmailCommentForFeedback(shop, customerMail, customerName, product, Messages.get("feedback.email.title", shop.shopName));


        renderJSON(feedback);
    }

}
