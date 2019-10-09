/**
 * 2019/9/28
 * 
 * 描述：原生调用RN的方法；使用监听事件的方式返回给RN数据
 * 
 * 状态：启用
 */

package com.yunfeiapp;

import android.provider.Settings;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class Test {
    // 定义上下文对象
    public static ReactContext myContext;

    // 定义发送事件的函数
    public void sendEvent(ReactContext reactContext, String eventName, WritableMap params, String val) {
        System.out.println("reactContext=" + reactContext);
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, val);
    }

    public void fun(String val) {
        // 发送事件,事件名为EventName
        WritableMap et = Arguments.createMap();
        sendEvent(myContext, "laiduanxinle", et, val);
    }
}
