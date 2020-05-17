import React, { Component } from 'react';
import { View, ToastAndroid } from 'react-native';
import { WebView } from 'react-native-webview';
import { Loading } from '../../components/Loading';
/* 注入到 webView */
const injectedJavascript = `(function() {
    window.postMessage = function(data) {
      window.ReactNativeWebView.postMessage(data);
    };
  })()`
export default class CourseScreen extends Component {
    state = {
        showLoading: true,
        err: false
    }
    /* 加载成功 */
    onLoad() {
        this.setState({ showLoading: false })
    }
    /* 加载失败 */
    onError() {
        this.setState({ err: true })
    }
    /* 状态 */
    onMessage(v) {
        // console.log()
        const { onCallback } = this.props;
        onCallback(true);
        ToastAndroid.show('已完成', ToastAndroid.SHORT);
    }
    render() {
        const { showLoading, err } = this.state;
        if (err) {
            return (
                <View style={{ flex: 1 }}>
                    <Text>
                        网络异常 o(╥﹏╥)o
                    </Text>
                </View>
            )
        }
        return (
            <View style={{ flex: 1 }}>

                < WebView
                    injectedJavaScript={injectedJavascript}
                    onError={() => this.onError()}
                    onLoad={() => this.onLoad()}
                    onMessage={(event) => this.onMessage(event.nativeEvent.data)}
                    mediaPlaybackRequiresUserAction={false}
                    source={{ uri: 'http://172.18.9.89:3000/' }}
                    style={{ marginTop: 20 }}
                />
                <Loading showLoading={showLoading} opacity={1} />
            </View>
        )
    }
}
