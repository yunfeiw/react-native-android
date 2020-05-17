package com.taxsms;


import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.widget.Toast;
import android.util.Log;

public class ScreenStatusReceiver extends BroadcastReceiver {
    String TAG = "yunfei";
    @Override
    public void onReceive(Context context, Intent intent) {
        Toast.makeText(context,"税务短信运行中",Toast.LENGTH_LONG).show();
        Log.d(TAG,intent.getAction());
        if("android.intent.action.SCREEN_ON".equals(intent.getAction())) {
            closeActivity();
        } else if("android.intent.action.SCREEN_OFF".equals(intent.getAction())) {
            openActivity(context);
        }
    }
    /**
     * 开启1像素Activity
     * @param context
     */
    private void openActivity(Context context) {
        OnePxManager.getInstance().startActivity(context);
    }

    /**
     * 关闭Activity
     */
    private void closeActivity() {
        OnePxManager.getInstance().finishActivity();
    }
}
