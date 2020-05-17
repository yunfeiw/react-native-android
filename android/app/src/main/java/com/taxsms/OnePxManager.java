package com.taxsms;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import java.lang.ref.WeakReference;
import androidx.appcompat.app.AppCompatActivity;

public class OnePxManager extends Activity {
    private static OnePxManager instance = new OnePxManager();

    public static OnePxManager getInstance() {
        return instance;

    }

    private OnePxManager() {
    }

    private WeakReference<Activity> weakReference;

    public void setActivity(Activity activity) {
        weakReference = new WeakReference<Activity>(activity);
    }

    public void startActivity(Context context) {
        Intent intent = new Intent(context, OnePXActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(intent);
    }

    public void finishActivity() {
        if (weakReference != null) {
            if (weakReference.get() != null) {
                weakReference.get().finish();
            }
        }
    }

    /* 启动动态广播 */
    public void intentFilterStart() {
        ScreenStatusReceiver mScreenStatusReceiver = new ScreenStatusReceiver();// new一个接受者
        IntentFilter filterIF = new IntentFilter();// new一个intent过滤器
        filterIF.addAction("android.intent.action.SCREEN_ON");// 增加亮屏操作
        filterIF.addAction("android.intent.action.SCREEN_OFF");// 增加灭屏操作
        registerReceiver(mScreenStatusReceiver, filterIF);// 注册监听
    }
}