# React-Native

* 基于RN编写的 安卓 应用

## 功能

* 读取本地图片
* 读取本地短信
* 手机接收短信后，读取短信内容
* 获取本机机型
* 封装广播

## 目录结构


 android 

    app

        src

            main

                java

                    com

                        yunfeiapp (原生方法)
                
                res (原生的界面构建)

## 运行

- npm install

- react-native run-android

## APK 打包

- cd android 

- gradlew assembleRelease (window 下可省略./)

### 记录

yunfeiApp-V-4 ：实现APP后台长时间运行（1像素方案）

yunfeiapp-V-5 : 实现热更新