package services;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.security.MessageDigest;
import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;

/**
 * Created by bohdaq on 8/28/16.
 */
public class SmsSenderImpl implements SmsSender {
    public void sendSms(String phone, String text) throws Exception {
        System.out.println("sendSms");
        final String PUBLIC_KEY = "4c4404453e03a68de05e5205ab50e605";
        final String PRIVATE_KEY = "6cd0d950d9c51d29f800e8db9c5377b6";
        final String API_VERSION = "3.0";
        final String ACTION = "sendSMS";
        final String SENDER = "Info";

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
        System.out.println(sum.toString());


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
        System.out.println(conrolSum);

        String url = BASE_URL +
                "?key=" + PUBLIC_KEY +
                "&sum=" + conrolSum +
                "&sender=" + SENDER +
                "&text=" + URLEncoder.encode(text, "ISO-8859-1") +
                "&phone=" + phone +
                "&datetime=" + DATETIME +
                "&sms_lifetime=" + LIFETIME;
        System.out.println(url);

        final String USER_AGENT = "Mozilla/5.0";


        URL obj = new URL(url);
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();

        // optional default is GET
        con.setRequestMethod("GET");

        //add request header
        con.setRequestProperty("User-Agent", USER_AGENT);

        int responseCode = con.getResponseCode();
        System.out.println("\nSending 'GET' request to URL : " + url);
        System.out.println("Response Code : " + responseCode);

        BufferedReader in = new BufferedReader(
                new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuffer response = new StringBuffer();

        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();

        //print result
        System.out.println(response.toString());
    }
}
