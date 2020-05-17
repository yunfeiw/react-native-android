package com.taxsms;

import androidx.appcompat.app.AppCompatActivity;
import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.view.Gravity;
import android.view.Window;
import android.view.WindowManager;
import android.content.IntentFilter;

public class OnePXActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // setContentView(R.layout.activity_one_px);
        // Log.d("123", "onCreate: OnePxActivity...");
        createOnePxWindow();

        OnePxManager.getInstance().setActivity(this);
    }

    /**
     * 创建1像素窗体
     */
    private void createOnePxWindow() {
        Window window = getWindow();
        //放在左上角
        window.setGravity(Gravity.START | Gravity.TOP);
        WindowManager.LayoutParams attributes = window.getAttributes();
        //宽高为1个像素
        attributes.width = 1;
        attributes.height = 1;

        attributes.x = 0;
        attributes.y = 0;
        window.setAttributes(attributes);
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