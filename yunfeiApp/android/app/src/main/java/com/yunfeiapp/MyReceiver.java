
package com.yunfeiapp;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.telephony.SmsMessage;
import android.telephony.SmsManager;
import android.widget.Toast;
import android.util.Log;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReactContext;

import com.yunfeiapp.MyModule; // <-- 引入读取当前机型

public class MyReceiver extends BroadcastReceiver {
   @Override
   public void onReceive(Context context, Intent intent) {

      Object[] object = (Object[]) intent.getExtras().get("pdus");
      // StringBuilder sb = new StringBuilder();
      Map<String, Object> map = new HashMap<String, Object>(); // 承接数据
      for (Object pdus : object) {
         byte[] pdusMsg = (byte[]) pdus;
         SmsMessage sms = SmsMessage.createFromPdu(pdusMsg);
         String mobile = sms.getOriginatingAddress();// 发送短信的手机号
         String content = sms.getMessageBody();// 短信内容
         // 下面是获取短信的发送时间
         Date date = new Date(sms.getTimestampMillis());
         String date_time = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(date);
         // 追加到StringBuilder中
         map.put("num", mobile);// 短信发送号码
         map.put("mess", content);// 短信内容
         map.put("time", date_time);// 发送时间
      }

      // 
      MyModule.NativeMethod(JSONObject.toJSONString(map));
      // new MyModule().NativeMethod();
      Toast.makeText(context, "Intent Detected.", Toast.LENGTH_LONG).show();
   }
}