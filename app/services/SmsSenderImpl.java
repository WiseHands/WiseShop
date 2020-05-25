package services;

import play.Play;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.MessageDigest;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;

public class SmsSenderImpl implements SmsSender {

    private static final String PUBLIC_KEY = Play.configuration.getProperty("atompark.public.key");
    private static final String PRIVATE_KEY = Play.configuration.getProperty("atompark.private.key");
    private static final boolean isDevEnv = Boolean.parseBoolean(Play.configuration.getProperty("dev.env"));


    public String sendSms(String phone, String text) throws Exception {
        String result = "";
        final String API_VERSION = "3.0";
        final String ACTION = "sendSMS";
        final String SENDER = "wisehands";

        final String LIFETIME = "0";
        final String DATETIME = "";

        final String BASE_URL = "http://atompark.com/api/sms/3.0/sendSMS";

        Map<String, String> params = new HashMap<String, String>();
        params.put("version", API_VERSION);
        params.put("action", ACTION);
        params.put("key", PUBLIC_KEY);
        params.put("sender", SENDER);
        params.put("text", text);
        params.put("phone", phone);
        params.put("datetime", DATETIME);
        params.put("sms_lifetime", LIFETIME);

        params = new TreeMap<String, String>(params);
        StringBuilder sum = new StringBuilder();
        for (Map.Entry<String, String> entry : params.entrySet()) {
            sum.append(entry.getValue());
        }
        sum.append(PRIVATE_KEY);


        MessageDigest md = MessageDigest.getInstance("MD5");
        md.update(sum.toString().getBytes());

        byte byteData[] = md.digest();

        StringBuffer hexString = new StringBuffer();
        for (int i=0;i<byteData.length;i++) {
            String hex=Integer.toHexString(0xff & byteData[i]);
            if(hex.length()==1) hexString.append('0');
            hexString.append(hex);
        }

        String conrolSum = hexString.toString();

        String url = BASE_URL +
                "?key=" + PUBLIC_KEY +
                "&sum=" + conrolSum +
                "&sender=" + SENDER +
                "&text=" + text.replaceAll(" ", "%20") +
                "&phone=" + phone +
                "&datetime=" + DATETIME +
                "&sms_lifetime=" + LIFETIME;

        final String USER_AGENT = "Mozilla/5.0";


        URL obj = new URL(url);
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();

        // optional default is GET
        con.setRequestMethod("GET");

        //add request header
        con.setRequestProperty("User-Agent", USER_AGENT);

        int responseCode = con.getResponseCode();
        System.out.println("inside SMS sender " + responseCode);

        BufferedReader in = new BufferedReader(
                new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuffer response = new StringBuffer();

        response.toString();

        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();

        System.out.println("inside SMS sender " + response);

        result = response.toString();

        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Date date = new Date();
        System.out.println("Sent SMS: " + text + ". Phone: " + phone + ". Time: " + dateFormat.format(date));

        return result;
    }

    public String sendSmsForFeedbackToOrder(String phone, String text) throws Exception {
        String result = "";
        final String API_VERSION = "3.0";
        final String ACTION = "sendSMS";
        final String SENDER = "wisehands";

        final String LIFETIME = "0";
        final String DATETIME = "";

        final String BASE_URL = "http://atompark.com/api/sms/3.0/sendSMS";

        Map<String, String> params = new HashMap<String, String>();
        params.put("version", API_VERSION);
        params.put("action", ACTION);
        params.put("key", PUBLIC_KEY);
        params.put("sender", SENDER);
        params.put("text", text);
        params.put("phone", phone);
        params.put("datetime", DATETIME);
        params.put("sms_lifetime", LIFETIME);

        params = new TreeMap<String, String>(params);
        StringBuilder sum = new StringBuilder();
        for (Map.Entry<String, String> entry : params.entrySet()) {
            sum.append(entry.getValue());
        }
        sum.append(PRIVATE_KEY);


        MessageDigest md = MessageDigest.getInstance("MD5");
        md.update(sum.toString().getBytes());

        byte byteData[] = md.digest();

        StringBuffer hexString = new StringBuffer();
        for (int i=0;i<byteData.length;i++) {
            String hex=Integer.toHexString(0xff & byteData[i]);
            if(hex.length()==1) hexString.append('0');
            hexString.append(hex);
        }

        String conrolSum = hexString.toString();

        String url = BASE_URL +
                "?key=" + PUBLIC_KEY +
                "&sum=" + conrolSum +
                "&sender=" + SENDER +
                "&text=" + text.replaceAll(" ", "%20") +
                "&phone=" + phone +
                "&datetime=" + DATETIME +
                "&sms_lifetime=" + LIFETIME;

        final String USER_AGENT = "Mozilla/5.0";


        URL obj = new URL(url);
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();

        // optional default is GET
        con.setRequestMethod("GET");

        //add request header
        con.setRequestProperty("User-Agent", USER_AGENT);

        int responseCode = con.getResponseCode();
        System.out.println("inside SMS sender " + responseCode);

        BufferedReader in = new BufferedReader(
                new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuffer response = new StringBuffer();

        response.toString();

        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();

        result = response.toString();

        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Date date = new Date();
        System.out.println("Sent SMS: " + text + ". Phone: " + phone + ". Time: " + dateFormat.format(date));

        return result;
    }

}
