
/**
 * 2019/9/25
 * 描述：获取手机型号
 * 状态：启用
 */
package com.yunfeiapp;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import android.os.Build;

public class GetPhoneModel extends ReactContextBaseJavaModule {
    /* 当前类继承于RN，使当前类可操作JS语法 */
    public GetPhoneModel(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    /*
     * 注意字符串只能为 双引号 ""； 重写getName方法用于暴漏当前包名
     */
    @Override
    public String getName() {
        return "GetPhoneModel";
    }

    /* 使用ReactMethod 暴漏方法给RN调用 */
    @ReactMethod
    private void getPhoneModel(Callback successCallback) {
        successCallback.invoke(Build.MODEL);
        // 系统版本
        // android.os.Build.VERSION.RELEASE;
    }
}