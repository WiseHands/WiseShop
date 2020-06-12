package controllers;

import enums.FeedbackRequestState;
import models.*;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class FeedbackCommentAPI extends AuthController{

    public static void createComment() throws Exception{
        long time = System.currentTimeMillis();
        DateFormat dateFormat = new SimpleDateFormat("dd MMM yyyy HH:mm:ss");
        Date date = new Date(time);

        System.out.println("create Comment to feedback => " + date + "\n"+ time);

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));

        String feedbackUuid = (String) jsonBody.get("feedbackUuid");
        String comment = (String) jsonBody.get("comment");

        FeedbackDTO feedback = FeedbackDTO.findById(feedbackUuid);
        FeedbackCommentDTO feedbackComment = new FeedbackCommentDTO(comment);
        feedback.feedbackComment = feedbackComment;
        feedback.save();
        renderJSON(feedback);

    }

}
