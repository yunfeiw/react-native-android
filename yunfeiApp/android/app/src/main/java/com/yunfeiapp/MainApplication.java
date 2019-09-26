package com.yunfeiapp;

import android.app.Application;
import android.util.Log;

import com.facebook.react.PackageList;
import com.facebook.hermes.reactexecutor.HermesExecutorFactory;
import com.facebook.react.bridge.JavaScriptExecutorFactory;
import com.facebook.react.ReactApplication;
import com.swmansion.rnscreens.RNScreensPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.soloader.SoLoader;

// 引入图片读取
// import com.reactnativecommunity.cameraroll.CameraRollPackage;
import com.yunfeiapp.MyToastReactPaket; // <-- 引入测试包
import com.yunfeiapp.SendBroadcastPackage; // <-- 引入广播包
import com.yunfeiapp.GetMessageInfoPackage; // <-- 引入读取短信包
import com.yunfeiapp.GetPhoneModelPackage; // <-- 引入读取当前机型
import com.yunfeiapp.MyPackage; // <-- 引入读取当前机型

import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      packages.add(new MyToastReactPaket()); // <-- 添加这一行，类名替换成你的Package类的名字.
      packages.add(new SendBroadcastPackage()); // 注册广播模块
      packages.add(new GetMessageInfoPackage()); // 注册读取所有短信
      packages.add(new GetPhoneModelPackage()); // 注册读取当前机型
      packages.add(new MyPackage()); // 原生=》RN

      // packages.add(new CameraRollPackage());
      // Packages that cannot be autolinked yet can be added manually here, for
      // example:
      // packages.add(new MyReactNativePackage());
      return packages;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
