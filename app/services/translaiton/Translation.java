package services.translaiton;

import models.*;

import java.util.List;

public class Translation {

    public static ShopDTO setTranslationForShop(String language, ShopDTO shop){
        if(shop.shopNameTextTranslationBucket != null){
            List<TranslationItemDTO> translationNameList = shop.shopNameTextTranslationBucket.translationList;
            for(TranslationItemDTO item : translationNameList){
                if (item.language == null){
                    item.language = language;
                }
                if (item.language.equals(language)){
                    shop.shopName = item.content;
                }
            }
        }
        return shop;
    }

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
        if(page.pageBodyTextTranslationBucket != null){
            List<TranslationItemDTO> translationList = page.pageBodyTextTranslationBucket.translationList;
            for(TranslationItemDTO item : translationList){
                if (item.language == null){
                    item.language = language;
                }
                if (item.language.equals(language)){
                    page.body = item.content;
                }
            }
        }
        return page;
    }

}
