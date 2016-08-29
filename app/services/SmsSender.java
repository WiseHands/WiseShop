package services;

public interface SmsSender {
    void sendSms(String phone, String text) throws Exception;
}
