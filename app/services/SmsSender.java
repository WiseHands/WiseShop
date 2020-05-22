package services;

public interface SmsSender {
    String sendSms(String phone, String text) throws Exception;
    String sendSmsForFeedbackToOrder(String phone, String text) throws Exception;
}
