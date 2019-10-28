/**
 * date:2019/10/11
 * status:启动
 * description:原生调用RN
 * author: yunfei
 */

package com.taxsms;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;


public class ListeningSmsGetCallback {
    // 定义上下文对象
    public static ReactContext myContext;

    // 定义发送事件的函数
    public void sendEvent(ReactContext reactContext, String eventName, WritableMap params, String val) {
        // System.out.println("reactContext=" + reactContext);
        Toast.makeText(myContext, "真的的进来了"+eventName, Toast.LENGTH_LONG).show();
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, val);
    }

    public void fun(String val) {
        // 发送事件,事件名为EventName
        WritableMap et = Arguments.createMap();

        sendEvent(myContext, "laiduanxinle", et, val);
    }
}
