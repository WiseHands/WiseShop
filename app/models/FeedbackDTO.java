package models;

import com.google.gson.annotations.Expose;
import enums.FeedbackRequestState;
import enums.OrderState;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;

import javax.persistence.*;

@Entity
public class FeedbackDTO extends GenericModel {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Expose
    public String uuid;

    @Expose
    public String generalReview;

    @Expose
    public String customerName;

    @Expose
    public String review;

    @Expose
    public String quality;

    @Expose
    public long feedbackTime;

    @Expose
    public boolean hideReview;

    @OneToOne
    public OrderDTO order;

    @OneToOne
    public OrderItemDTO orderItem;

    @ManyToOne
    public ProductDTO product;

    public FeedbackDTO(String quality, long feedbackTime) {
        this.quality = quality;
        this.feedbackTime = feedbackTime;
    }

    public FeedbackDTO(String quality, String generalReview, long feedbackTime) {
        this.quality = quality;
        this.generalReview = generalReview;
        this.feedbackTime = feedbackTime;
    }

    public FeedbackDTO(String quality, String review, String customerName, long feedbackTime) {
        this.quality = quality;
        this.review = review;
        this.customerName = customerName;
        this.feedbackTime = feedbackTime;
    }

}
