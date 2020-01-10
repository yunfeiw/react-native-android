import React from 'react';
import {
    ActivityIndicator,
    StatusBar,
    View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
// import LoadingView from '../util/LoadingView.js'     //提示 暂时弃用

export default class AuthLoadingScreen extends React.Component {
    state = {
        showLoading: true
    }
    componentDidMount() {
        /**
         * 可用于 创建推广页之类的
         */
        this._bootstrapAsync();

    }
    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    };

    // Render any loading content that you like here
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size={50} />
                {/* <LoadingView showLoading={this.state.showLoading} /> */}
                <StatusBar barStyle="default" />
            </View>
        );
    }
}