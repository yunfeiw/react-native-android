/**
 * Time:2020/04/27
 * status:启用
 * description: 启动动态广播
 * author: yunfei
 */

package com.taxsms;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.security.Provider;

import com.facebook.react.bridge.Callback;

import android.os.Build;
import android.widget.Toast;

public class OnePXActivityStart extends ReactContextBaseJavaModule {

    public OnePXActivityStart(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "OnePXActivityStart";
    }

    @ReactMethod
    private void OnePXActivityStartFun() {
    }
}