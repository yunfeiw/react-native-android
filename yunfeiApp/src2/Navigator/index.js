import React from 'react';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
/* 组件 */
import HomePage from '../Pages/HomePage'
import AboutPage from '../Pages/AboutPage';
import ListPage from "../Pages/ListPage";

const AppNavigator = createStackNavigator(
    {
        Home: {
            screen: HomePage,
            // navigationOptions: {
            //     headerTitle: '首页'
            // }
        },
        About: {
            screen: AboutPage,
            // navigationOptions: {
            //     headerTitle: '关于我们'
            // }
        },
        List: {
            screen: ListPage,
            // navigationOptions:{
            //     headerTitle:'列表界面'
            // }
        }
    }, {
        initialRouteName: 'Home',
        defaultNavigationOptions: {
            headerBackTitle: null,
            headerStyle: {
                backgroundColor: '#f4511e'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold'
            }
        }
    })
export default createAppContainer(AppNavigator)