package models;

import com.google.gson.annotations.Expose;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;

import javax.persistence.*;
import java.util.List;

@Entity
public class TranslationItemDTO extends GenericModel {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Expose
    public String uuid;

   @Expose
   public String language;

   @Expose
   public String content;

   @ManyToOne
   public TranslationBucketDTO translationBucket;

   public TranslationItemDTO(){}

   public TranslationItemDTO(String language, String content){
       this.language = language;
       this.content = content;
   }


}
