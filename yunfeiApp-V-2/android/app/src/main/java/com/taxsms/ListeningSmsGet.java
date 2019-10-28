/**
 * date:2019/10/11
 * status:启用
 * description:监听短信，解析信息
 * author: yunfei
 */

package com.taxsms;

import android.content.BroadcastReceiver;
import android.telephony.SmsMessage;
import android.content.Context;
import android.content.Intent;
import android.widget.Toast;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;



import com.taxsms.ListeningSmsGetModule;

public class ListeningSmsGet extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {

        Object[] object = (Object[]) intent.getExtras().get("pdus");
        Map<String, Object> map = new HashMap<String, Object>(); // 承接数据
        for (Object pdus : object) {
            byte[] pdusMsg = (byte[]) pdus;
            SmsMessage sms = SmsMessage.createFromPdu(pdusMsg);
            String mobile = sms.getOriginatingAddress();
            String content = sms.getMessageBody();
            Date date = new Date(sms.getTimestampMillis());
            String date_time = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(date);
            map.put("num", mobile);// 短信发送号码
            map.put("mess", content);// 短信内容
            map.put("time", date_time);// 发送时间
        }
        ListeningSmsGetModule.NativeMethod(JSONObject.toJSONString(map));
        // Toast.makeText(context, "Intent Detected.", Toast.LENGTH_LONG).show();
    }
}