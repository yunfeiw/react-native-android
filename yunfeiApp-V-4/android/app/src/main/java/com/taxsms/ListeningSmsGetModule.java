/**
 * date:2019/10/11
 * status:启用 
 * description：调用原生方法，触发RN监听
 * author: yunfei
 */
package com.taxsms;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import com.taxsms.ListeningSmsGetCallback;

public class ListeningSmsGetModule extends ReactContextBaseJavaModule {
    public ListeningSmsGetModule(ReactApplicationContext reactContext) {
        super(reactContext);
        ListeningSmsGetCallback.myContext = reactContext;
    }

    @Override
    public String getName() {
        return "ListeningSmsGetModule";
    }

    @ReactMethod
    public static void NativeMethod(String val) {
        // 调用Test类中的原生方法。
        new ListeningSmsGetCallback().fun(val);
    }
}
