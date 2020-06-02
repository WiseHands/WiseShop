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
    public String description;

    @Expose
    public String quality;

    @Expose
    public long feedbackTime;

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

    public FeedbackDTO(String quality, String description, long feedbackTime) {
        this.quality = quality;
        this.description = description;
        this.feedbackTime = feedbackTime;
    }

}
