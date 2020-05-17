package com.taxsms;

import android.app.Application;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import cn.reactnative.modules.update.UpdatePackage;
import cn.reactnative.modules.update.UpdateContext;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import java.util.List;

/* ---引入原生方法--- */
// 获取全部短信
import com.taxsms.GetMessageInfoPackage;
// 获取机型
import com.taxsms.GetPhoneModelPackage;
// 监听短信
import com.taxsms.ListeningSmsGetModulePackage;
// 获取签名
import com.taxsms.GetSignaturePackage;
// 引入音频
import com.brentvatne.react.ReactVideoPackage;
// 启动亿像素
import com.taxsms.OnePXActivityStartPackage;

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
      packages.add(new GetMessageInfoPackage());
      packages.add(new GetPhoneModelPackage());
      packages.add(new ListeningSmsGetModulePackage());
      packages.add(new GetSignaturePackage());
      packages.add(new ReactVideoPackage());
      packages.add(new OnePXActivityStartPackage());
      packages.add(new UpdatePackage());
      // Packages that cannot be autolinked yet can be added manually here, for
      // example:
      // packages.add(new MyReactNativePackage());
      return packages;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }

    @Override
    protected String getJSBundleFile() {
        return UpdateContext.getBundleUrl(MainApplication.this);
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
    initializeFlipper(this); // Remove this line if you don't want Flipper enabled

    /* 注册 */
    ScreenStatusReceiver mScreenStatusReceiver = new ScreenStatusReceiver();// new一个接受者
    IntentFilter filterIF = new IntentFilter();// new一个intent过滤器
    filterIF.addAction("android.intent.action.SCREEN_ON");// 增加亮屏操作
    filterIF.addAction("android.intent.action.SCREEN_OFF");// 增加灭屏操作
    registerReceiver(mScreenStatusReceiver, filterIF);// 注册监听
    /* 播放音乐 */
    // startService(new Intent(getBaseContext(),MyService.class));
    // stopService(new Intent(getBaseContext(),PlayerMusicService.class));
    // startService(new Intent(getBaseContext(),PlayerMusicService.class));
  }

  /**
   * Loads Flipper in React Native templates.
   *
   * @param context
   */
  private static void initializeFlipper(Context context) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         * We use reflection here to pick up the class that initializes Flipper, since
         * Flipper library is not available in release mode
         */
        Class<?> aClass = Class.forName("com.facebook.flipper.ReactNativeFlipper");
        aClass.getMethod("initializeFlipper", Context.class).invoke(null, context);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
