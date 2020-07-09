package models;

import com.google.gson.annotations.Expose;
import org.hibernate.annotations.GenericGenerator;
import play.db.jpa.GenericModel;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class TranslationBucketDTO extends GenericModel {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Expose
    public String uuid;
         
    @Expose
    @OneToMany
    public List<TranslationItemDTO> translationList;

    @OneToOne
    public DeliveryDTO delivery;

    @OneToOne
    public ProductDTO product;

    public void addTranslationItem(TranslationItemDTO translationItem) {
        if(this.translationList == null) {
            this.translationList = new ArrayList<TranslationItemDTO>();
        }
        this.translationList.add(translationItem);
    }
    
    public TranslationBucketDTO(){}

    public TranslationBucketDTO(List<TranslationItemDTO> translationList) {
        this.translationList = translationList;
    }
}
