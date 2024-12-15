package services.querying;

import models.AdditionDTO;
import models.FeedbackDTO;
import models.ProductDTO;
import models.SelectedAdditionDTO;
import play.db.jpa.JPA;

import java.util.ArrayList;
import java.util.List;

public class DataBaseQueries {


//    public static List<OrderDTO> getOrderList

    public static List<FeedbackDTO> getFeedbackList(ProductDTO product) {
        String query = "SELECT customerName, feedbackTime, quality, review, FeedbackCommentDTO.comment FROM FeedbackDTO" +
                " LEFT JOIN FeedbackCommentDTO" +
                " ON FeedbackDTO.feedbackComment_uuid = FeedbackCommentDTO.uuid" +
                " WHERE showReview = 1 and productUuid = '%s' order by feedbackTime desc";
        String feedbackListQuery = formatQueryString(query, product);
        List<Object[]> resultList = JPA.em().createNativeQuery(feedbackListQuery).getResultList();
        List<FeedbackDTO> feedbackResultList = new ArrayList<FeedbackDTO>();

        for (Object[] item: resultList){
            FeedbackDTO feedback = createFeedbackDTO(item);
            feedbackResultList.add(feedback);
        }

        return feedbackResultList;
    }

    private static FeedbackDTO createFeedbackDTO(Object[] item) {
        String customerName = (String) item[0];
        Long feedbackTime = Long.valueOf(String.valueOf(item[1]));
        String quality = (String) item[2];
        String review = (String) item[3];
        String comment = (String) item[4];
        System.out.println("FeedbackDTO => " + customerName + feedbackTime + quality + review + comment);
        FeedbackDTO feedback = new FeedbackDTO(quality, review, customerName, feedbackTime);
        feedback.comment = comment;
        return feedback;
    }

    private static String formatQueryString(String query, ProductDTO product) {
        String formattedQuery = String.format(
                query,
                product.uuid);
        return formattedQuery;
    }

    public static List<SelectedAdditionDTO> checkIsAdditionDefaultToProduct(ProductDTO product) {
        List<SelectedAdditionDTO> defaultAdditionList = new ArrayList<>();
        String additionIsDefaultQuery = "select a from SelectedAdditionDTO a where a.isDefault = true and a.productUuid = ?1";
        defaultAdditionList = SelectedAdditionDTO.find(additionIsDefaultQuery, product.uuid).fetch();
        if (!defaultAdditionList.isEmpty()){
            return defaultAdditionList;
        } else {
            return defaultAdditionList;
        }
    }

    public static List<String> getDefaultAdditionsUuid(ProductDTO product) {
        List<String> additionList = new ArrayList<>();
        String query = "select addition_uuid from SelectedAdditionDTO where isDefault = 1 and productUuid = '%s'";
        String additionsUuidQuery = formatQueryString(query, product);
        additionList = JPA.em().createNativeQuery(additionsUuidQuery).getResultList();
        if (additionList.isEmpty()){
            return additionList;
        } else {
            return additionList;
        }

    }

    public static int getTotalPriceForDefaultAdditions(String productUuid) {
        String query = "SELECT sum(price) FROM AdditionDTO WHERE" +
                " uuid IN (SELECT addition_uuid FROM SelectedAdditionDTO" +
                " where productUuid='%s' AND isDefault = true);";
        String stringQueryFormat = String.format(query, productUuid);
        Double totalPrice = (Double) JPA.em().createNativeQuery(stringQueryFormat).getSingleResult();
        if (totalPrice == null)
            return 0;
        else {
            int total = totalPrice.intValue();
            return total;
        }
    }

    public static ProductDTO hideDefaultAddition(ProductDTO product) {
        product.defaultAdditions = new ArrayList<>();
        product.priceWithAdditions = 0.0;
        return product;
    }

}
