/**
 * 广播的package
 * 
 */
package com.yunfeiapp;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
// import com.yunfeiapp.SendBroadcastModule; // <-- 引入广播包

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by Administrator on 2017/4/15.
 */

public class SendBroadcastPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new SendBroadcastModule(reactContext));
        return modules;
    }

    // @Override
    // public List<Class<? extends JavaScriptModule>> createJSModules() {
    // return Collections.emptyList();
    // }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
