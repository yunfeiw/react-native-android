/**
 * 2019/9/26
 * 
 * 描述：调用使用android封装RN的类；其内包含了android调用RN的方法
 * 
 * 状态：启用
 */
package com.yunfeiapp;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.yunfeiapp.Test;

/**
 * Created by Administrator on 2016/10/30.
 */

public class MyModule extends ReactContextBaseJavaModule {
    public MyModule(ReactApplicationContext reactContext) {
        super(reactContext);
        // 给上下文对象赋值
        Test.myContext = reactContext;
    }

    @Override
    public String getName() {
        return "MyModule";
    }

    @ReactMethod
    public static void NativeMethod(String val) {
        // 调用Test类中的原生方法。
        new Test().fun(val);
    }
}
