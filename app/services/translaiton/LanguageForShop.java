package services.translaiton;

import play.i18n.Lang;
import play.mvc.Http;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

public class LanguageForShop {

    public static String setLanguageForShop(String languageFromParams, String languageFromHeaders) {
        String mainLanguage = checkMainLanguage(languageFromParams, languageFromHeaders);
        ArrayList<String> supportLanguages = createSupportLanguagesList();
        mainLanguage = selectSupportedLanguage(mainLanguage, supportLanguages);
        System.out.println("setlanguageForShop => " + mainLanguage);
        Lang.change(mainLanguage);
        return mainLanguage;
    }

    private static String checkMainLanguage(String languageFromParams, String languageFromHeaders) {
        String mainLanguage = "";
        if (languageFromParams == null){
            mainLanguage = languageFromHeaders;
        }
        if (!(languageFromParams.equals(languageFromHeaders))){
            mainLanguage = languageFromParams;
        }
        return mainLanguage;
    }

    private static ArrayList<String> createSupportLanguagesList() {
        ArrayList<String> supportList = new ArrayList<String>();
        supportList.add("uk");
        supportList.add("en");
        return supportList;
    }

    private static String selectSupportedLanguage(String language, ArrayList<String> supportedLanguages) {
        String supportLanguage = null;
        for(String _language: supportedLanguages){
            if(language.equals(_language)){
                supportLanguage = _language;
            }
        }
        if (supportLanguage == null) {
            supportLanguage = "en";
        }
        if(language.equals("ru")){
            supportLanguage = "uk";
        }
        System.out.println("get language => " + language);
        System.out.println("get supportLanguage => " + supportLanguage);
        return supportLanguage;
    }

    public static String getLanguageFromAcceptHeaders(Http.Header acceptLanguage) {

        String language = "";
        if (acceptLanguage != null){
            String acceptLanguageValue = acceptLanguage.value();
            List<Locale.LanguageRange> languageList = Locale.LanguageRange.parse(acceptLanguageValue);

            String languageFromAccept = languageList.get(0).getRange();
            String[] strings = languageFromAccept.split("-");
            language = strings[0];

        }
        return language;
    }



}
