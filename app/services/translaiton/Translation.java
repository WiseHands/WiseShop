package services.translaiton;

import models.ProductDTO;
import models.TranslationItemDTO;

import java.util.List;

public class Translation {

    public static ProductDTO setTranslationForProduct(String language, ProductDTO product){
        List<TranslationItemDTO> translationNameList = product.productNameTextTranslationBucket.translationList;
        for(TranslationItemDTO item : translationNameList){
            if (item.language == null){
                item.language = language;
            }
            if (item.language.equals(language)){
                product.name = item.content;
            }
        }
        List<TranslationItemDTO> translationDescriptionList = product.productDescriptionTextTranslationBucket.translationList;
        for(TranslationItemDTO item : translationDescriptionList){
            if (item.language == null){
                item.language = language;
            }
            if (item.language.equals(language)){
                product.description = item.content;
            }
        }
        return product;
    }
}
