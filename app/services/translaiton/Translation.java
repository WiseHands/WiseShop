package services.translaiton;

import models.*;
import play.i18n.Lang;

import java.util.ArrayList;
import java.util.List;

public class Translation {

    public static ShopDTO setTranslationForShop(String language, ShopDTO shop){
        if(shop.shopNameTextTranslationBucket != null){
            List<TranslationItemDTO> translationNameList = shop.shopNameTextTranslationBucket.translationList;
            for(TranslationItemDTO item : translationNameList){
                if (item.language == null){
                    item.language = language;
                }
                if (item.language.equals(language) && !item.content.equals("")){
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
                if (item.language.equals(language) && !item.content.equals("")){
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
            }
        }
        if(product.productDescriptionTextTranslationBucket !=null){
            List<TranslationItemDTO> translationDescriptionList = product.productDescriptionTextTranslationBucket.translationList;
            for(TranslationItemDTO item : translationDescriptionList){
                if (item.language == null){
                    item.language = language;
                }
                if (item.language.equals(language) && !item.content.equals("")){
                    product.description = item.content;
                }
            }
        }
        translateProductAdditions(product.uuid, language);
        return product;
    }

    private static String showSpiciness(String content, ProductDTO product){
        String level = "";
        for(int i = 0; i < product.spicinessLevel; i++){
          level += "🌶️️️️️️";
        }
        if (content.isEmpty()) {
            return level + product.name;
        } else {
            return level + content;
        }
    }

    public static void changeTranslationBucketForProductName(ProductDTO product){
        TranslationItemDTO translationItem =
                product.productNameTextTranslationBucket
                .translationList.stream()
                .filter(item -> item.language.equals(Lang.get().split("_")[0]))
                .findAny()
                .orElse(null);
        if (translationItem != null){
            translationItem.content = product.name;
            translationItem.save();
        }
    }

    private static void translateProductAdditions(String uuid, String language) {
        List<SelectedAdditionDTO> additionList = new ArrayList<>();
        String additionListQuery = "select a from SelectedAdditionDTO a where a.productUuid = ?1";
        additionList = SelectedAdditionDTO.find(additionListQuery, uuid).fetch();
        if(!additionList.isEmpty()){
            for(SelectedAdditionDTO selectedAddition : additionList){
                if (selectedAddition.addition.additionNameTranslationBucket != null){
                    List<TranslationItemDTO> translationList = selectedAddition.addition.additionNameTranslationBucket.translationList;
                    for(TranslationItemDTO item : translationList){
                        if (item.language == null){
                            item.language = language;
                        }
                        if (item.language.equals(language) && !item.content.equals("")){
                            selectedAddition.addition.title = item.content;
                        }
                    }
                }
            }
        }

    }

    public static PageConstructorDTO setTranslationForPage(String language, PageConstructorDTO page) {
        if(page.pageTitleTextTranslationBucket != null){
            List<TranslationItemDTO> translationNameList = page.pageTitleTextTranslationBucket.translationList;
            for(TranslationItemDTO item : translationNameList){
                if (item.language == null){
                    item.language = language;
                }
                if (item.language.equals(language) && !item.content.equals("")){
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
                if (item.language.equals(language) && !item.content.equals("")){
                    page.body = item.content;
                }
            }
        }
        return page;
    }

}
