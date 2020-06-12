package models;

import com.google.gson.annotations.Expose;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;

import javax.persistence.*;

@Entity
public class FeedbackCommentDTO extends GenericModel {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Expose
    public String uuid;

    @Expose
    String comment;

    @OneToOne
    public FeedbackDTO feedback;

    public FeedbackCommentDTO(String comment) {
        this.comment = comment;
    }

}
