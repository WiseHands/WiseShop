package services;

/**
 * Created by bohdaq on 8/28/16.
 */
public interface SmsSender {
    public void sendSms(String phone, String text) throws Exception;
}
