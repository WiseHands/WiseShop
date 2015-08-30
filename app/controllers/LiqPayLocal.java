package controllers;

import com.liqpay.LiqPay;

public class LiqPayLocal extends LiqPay{
    public LiqPayLocal(String publicKey, String privateKey) {
        super(publicKey, privateKey);
    }

    public String strToSign(String str){
        return  super.str_to_sign(str);
    }

    @Override
    protected String str_to_sign(String str) {
        return super.str_to_sign(str);
    }
}
