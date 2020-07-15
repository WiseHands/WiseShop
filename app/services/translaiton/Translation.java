package services.translaiton;

import models.CategoryDTO;
import models.PageConstructorDTO;
import models.ProductDTO;
import models.TranslationItemDTO;

import java.util.List;

public class Translation {

    public static CategoryDTO setTranslationForCategory(String language, CategoryDTO category){
        if(category.categoryNameTextTranslationBucket != null){
            List<TranslationItemDTO> translationNameList = category.categoryNameTextTranslationBucket.translationList;
            for(TranslationItemDTO item : translationNameList){
                if (item.language == null){
                    item.language = language;
                }
                if (item.language.equals(language)){
                    category.name = item.content;
                }
            }
        }
        return category;
    }

    public static ProductDTO setTranslationForProduct(String language, ProductDTO product){
        if(product.productNameTextTranslationBucket != null){
            List<TranslationItemDTO> translationNameList = product.productNameTextTranslationBucket.translationList;
            for(TranslationItemDTO item : translationNameList){
                if (item.language == null){
                    item.language = language;
                }
                if (item.language.equals(language)){
                    product.name = item.content;
                }
            }
        }
        if(product.productDescriptionTextTranslationBucket !=null){
            List<TranslationItemDTO> translationDescriptionList = product.productDescriptionTextTranslationBucket.translationList;
            for(TranslationItemDTO item : translationDescriptionList){
                if (item.language == null){
                    item.language = language;
                }
                if (item.language.equals(language)){
                    product.description = item.content;
                }
            }
        }
        return product;
    }

    public static PageConstructorDTO setTranslationForPage(String language, PageConstructorDTO page) {
        if(page.pageTitleTextTranslationBucket != null){
            List<TranslationItemDTO> translationNameList = page.pageTitleTextTranslationBucket.translationList;
            for(TranslationItemDTO item : translationNameList){
                if (item.language == null){
                    item.language = language;
                }
                if (item.language.equals(language)){
                    page.title = item.content;
                }
            }
        }
        return page;
    }
}
