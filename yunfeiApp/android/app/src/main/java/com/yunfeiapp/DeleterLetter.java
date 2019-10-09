
/**
 * 2019/10/8
 * 删除当前手机内的指定短信
 * 状态: 失效
 * 原因：android4.4以上版本出于安全考虑（第三方APP会增删改短信）
 * 关闭此方法；想使用需要将当前APP设置为默认短信处理系统；将当前
 * 手机接收到的短信手动录入到短信数据库
 */
package com.yunfeiapp;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

import android.content.Context;
import android.content.ContentResolver;
import android.database.Cursor;
import android.net.Uri;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

public class DeleterLetter extends ReactContextBaseJavaModule {
    private Uri SMS_INBOX = Uri.parse("content://sms/");
    private Context mContext;

    public DeleterLetter(ReactApplicationContext reactContext) {
        super(reactContext);
        this.mContext = reactContext;
    }

    @Override
    public String getName() {
        return "DeleterLetter";
    }

    @ReactMethod
    private void deleter(String id, Callback successCallback) {
        ContentResolver cr = mContext.getContentResolver();
        Uri mUri = Uri.parse("content://sms/");
        // cr.delete(mUri, "_id="+ id, null);
        cr.delete(mUri, "_id=" + id, new String[] { "_id" });
        successCallback.invoke(id);
    }
}
