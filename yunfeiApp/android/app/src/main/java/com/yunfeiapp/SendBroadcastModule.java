/**
 * 原生模块
 * 
 * 用于RN调用 toast
 * 
 */
package com.yunfeiapp;

import android.content.Intent;
import android.content.IntentFilter;
import android.content.ComponentName;
import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.yunfeiapp.MyBroadcastReceiver;

public class SendBroadcastModule extends ReactContextBaseJavaModule {
    /* 该方法 使安卓原生支持 大部分JS */
    public SendBroadcastModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    /* 用于返回在R-N中使用别名 */
    @Override
    public String getName() {
        return "SendBroadcast";
    }

    @ReactMethod
    public void sendBroadcast() {
        // 发送广播
        Toast.makeText(getReactApplicationContext(), "测试...", Toast.LENGTH_SHORT).show();
        // Intent intent = new Intent();
        // intent.setAction("com.yunfeiapp.aaaa");
        // getReactApplicationContext().sendBroadcast(intent);

        Intent intent = new Intent("com.yunfeiapp.MonitorPhone");
        intent.setComponent(new ComponentName("com.yunfeiapp", "com.yunfeiapp.MyBroadcastReceiver"));
        intent.putExtra("data", "hello");
        getReactApplicationContext().sendBroadcast(intent);

        // receiver = new MyBroadcastReceiver();
        // IntentFilter filter = new IntentFilter("com.yunfeiapp.aaaa");
        // getActivity().registerReceiver(receiver, filter);
        // Intent intent = new Intent("com.yunfeiapp.aaaa");
        // getReactApplicationContext().sendBroadcast(intent);

    }

    @Override
    public boolean canOverrideExistingModule() {
        return true;
    }

}