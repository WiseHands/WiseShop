package util;
import org.apache.commons.codec.binary.Hex;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.SignatureException;
import java.util.Base64;

import static sun.security.pkcs11.wrapper.Functions.toHexString;

public class HMAC {

//    public static void main(String[] args) throws Exception {
//        System.out.println(hmacDigest("The quick brown fox jumps over the lazy dog", "key", "HmacSHA1"));
//    }

    public static String hmacDigest(String msg, String keyString, String algo) {
        String digest = null;
        try {
            SecretKeySpec key = new SecretKeySpec((keyString).getBytes("UTF-8"), algo);
            Mac mac = Mac.getInstance(algo);
            mac.init(key);

            byte[] bytes = mac.doFinal(msg.getBytes("UTF-8"));

            StringBuffer hash = new StringBuffer();
            for (int i = 0; i < bytes.length; i++) {
                String hex = Integer.toHexString(0xFF & bytes[i]);
                if (hex.length() == 1) {
                    hash.append('0');
                }
                hash.append(hex);
            }
            digest = hash.toString();
        } catch (InvalidKeyException e) {
        } catch (NoSuchAlgorithmException e) {
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return digest;
    }

    public static String encodeHmacMD5(String key, String message) throws SignatureException, NoSuchAlgorithmException, InvalidKeyException, UnsupportedEncodingException {
        SecretKeySpec secretKeySpec = new SecretKeySpec(key.getBytes("UTF-8"), "HmacMD5");
        Mac mac = Mac.getInstance("HmacMD5");
        mac.init(secretKeySpec);
        return toHexString(mac.doFinal(message.getBytes()));
    }

    private static String doBASE64(byte[] bytes) {
        Base64.Encoder encoder = Base64.getEncoder();
        String base64 = encoder.encodeToString(bytes);
        return base64;
    }

    public static String HMAC_MD5_encode(String key, String message) throws Exception {

        SecretKeySpec keySpec = new SecretKeySpec(
                key.getBytes(),
                "HmacMD5");

        Mac mac = Mac.getInstance("HmacMD5");
        mac.init(keySpec);
        byte[] rawHmac = mac.doFinal(message.getBytes());

        return Hex.encodeHexString(rawHmac);
    }


}
