/**
 * Time:2019/10/11
 * status:启用
 * description: 读取当前机型
 * author: yunfei
 */

package com.taxsms;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.security.Provider;

import com.facebook.react.bridge.Callback;

import android.os.Build;

public class GetPhoneModel extends ReactContextBaseJavaModule {
    public GetPhoneModel(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "GetPhoneModel";
    }

    @ReactMethod
    private void getPhoneModel(Callback successCallback) {
        /**
         * 
         * 系统版本号 Build.VERSION.RELEASE;
         * 获取手机型号 Build.MODEL;
         * 获取手机厂商 Build.BRAND
         * 
         */
        successCallback.invoke(Build.BRAND + "—" + Build.MODEL + "—" + Build.VERSION.RELEASE);
    }
}