/**
 * Time:2019/10/12
 * status:启用
 * description: 生成登录签名
 * author: yunfei
 */

package com.taxsms;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.security.Provider;

import com.facebook.react.bridge.Callback;

import android.os.Build;
// 加密方法

import java.security.NoSuchAlgorithmException;
// import com.taxsms.SignatureSecurity;

public class GetSignature extends ReactContextBaseJavaModule {
    public GetSignature(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "GetSignature";
    }

    @ReactMethod
    private static void getSignatureFun(String str, String pw, Callback successCallback) {
        byte[] a = { 1, 2, 3 };
        byte[] b = { 1, 2, 3 };
        String c = null;
        // try {
            // Signature = SignatureSecurity.getSignature(data.getBytes("UTF-8"),
            // c = SignatureSecurity.getSignatureForCoordination(str.getBytes("UTF-8"), pw.getBytes("UTF-8"));
            // c =  SignatureSecurity.getSignatureForCoordination(str.getBytes("UTF-8"), pw.getBytes("UTF-8"));
        // } catch (NoSuchAlgorithmException e) {
        // }
        // successCallback.invoke(SignatureSecurity.aaa(str.getBytes("UTF-8"), pw.getBytes("UTF-8")));
    }
}