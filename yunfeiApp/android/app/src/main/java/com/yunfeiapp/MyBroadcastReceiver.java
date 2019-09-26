/**
 * 自定义广播
 */
package com.yunfeiapp;

import android.content.BroadcastReceiver;
import android.widget.Toast;
import android.content.Context;
import android.content.Intent;

public class MyBroadcastReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context arg0, Intent arg1) {
        String string = arg1.getStringExtra("data");
        Toast.makeText(arg0, "监听到了:" + string, Toast.LENGTH_SHORT).show();
    }
    // public void onReceive(Context context, Intent intent) {
    // Toast.makeText(context, "Intent Detected.", Toast.LENGTH_LONG).show();
    // }
}
