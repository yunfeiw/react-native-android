import React from "react";
/* 组件 */
import AuthLoadingScreen from '../Page/AuthLoadingScreen'
import SignInScreen from '../Page/SignInScreen'
import HomeScreen from '../Page/HomeScreen'
import RuleScreen from '../Page/RuleScreen'
import HelpScreen from '../Page/HelpScreen'
import MyScreen from '../Page/MyScreen'

/* 导航 */
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
/* 图标 */
import Ionicons from 'react-native-vector-icons/Ionicons';

const MyMain = createStackNavigator(
  { MyMain: MyScreen, Help: HelpScreen },
  { initialRouteName: 'MyMain' });


const AppStack = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: "短信",
      tabBarIcon: ({ tintColor }) => {
        return (
          <Ionicons name={"md-chatbubbles"} size={25} color={tintColor} />
        );
      }
    }
  },
  Rule: {
    screen: RuleScreen,
    navigationOptions: {
      tabBarLabel: '规则',
      tabBarIcon: ({ tintColor }) => {
        return (
          <Ionicons name={'ios-paper'} size={25} color={tintColor} />
        );
      }
    }
  },
  My: {
    screen: MyMain,
    navigationOptions: {
      tabBarLabel: '我的',
      tabBarIcon: ({ tintColor }) => {
        return (
          <Ionicons name={'ios-person'} size={25} color={tintColor} />
        );
      }
    }
  }
});
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);

import { Toast } from '../util/Toast';
import { ValidateSms } from '../util/ValidateSms';
import { uploadSMS } from '../Server/uploadSMS';
import AsyncStorage from "@react-native-community/async-storage";
import { DeviceEventEmitter } from 'react-native';
const uuid = require('uuid');
// //监听事件名为EventName的事件
DeviceEventEmitter.addListener('laiduanxinle', function (SMS) {
  /*当前是否为登录状态 ;flag: 是，则校验当前短信*/
  AsyncStorage.getItem('userToken').then(flag => {
    if (flag) {
      const sms = JSON.parse(SMS);
      //校验是否符合规则
      ValidateSms(sms['mess'], (valid) => {
        //上传
        uploadSMS(SMS).then(res => {
          console.log('监听到的短信内容', res)
          Toast({
            visible: true,
            message: '神州云合税务短信app：' + res.Message
          })
          console.log('返回值', valid)
          if (valid) {
            DeviceEventEmitter.emit('updateSMSlist', JSON.stringify({ ...JSON.parse(SMS), ...res, uuid: uuid.v1() }));
            // DeviceEventEmitter.emit('updateSMSlist', JSON.stringify({ ...JSON.parse(SMS), ...res}));
          };
        })
      });
    }
  });
});
// 短信清除
/*
  当前日期 保存
  打开app 获取当前日期
  比对现在日期
  时间差为1天
  过滤短信
  删除
*/
