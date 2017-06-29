package services;

import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class WebPushService {
    public static void post(String completeUrl, String body) throws Exception {
        String type = "application/json";
        URL u = new URL(completeUrl);
        HttpURLConnection conn = (HttpURLConnection) u.openConnection();
        conn.setDoOutput(true);
        conn.setRequestMethod("POST");
        conn.setRequestProperty( "Content-Type", type );
        conn.setRequestProperty( "Content-Length", String.valueOf(body.length()));
        OutputStream os = conn.getOutputStream();
        os.write(body.getBytes());
    }
}
