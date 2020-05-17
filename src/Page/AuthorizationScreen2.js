import React, { Component } from 'react'
import {
    View,
    Dimensions,
    StyleSheet,
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

const { width, height } = Dimensions.get('window');
import SizeUtil from '../util/SizeUtil';

import CourseScreen from './CourseScreen/index';

export default class AuthorizationScreen extends Component {
    state = {
        flag: true,
    }
    componentDidMount() {
        this.videoState();
    }
    // 观看状态
    videoState = async () => {
        const videoState = await AsyncStorage.getItem('videoState');
        videoState != 1 && this.setState({ flag: false });
    }
    // 关闭遮罩
    onCallback(e) {
        e && this.setState({ flag: false });
        AsyncStorage.setItem('videoState', 1);
    }

    render() {
        const { flag } = this.state;
        if (flag) {
            return (
                <View style={styles.container}>
                    {/* 遮罩 */}
                    <View style={styles.containerOPA}></View>
                    <View style={styles.content}>
                        <CourseScreen onCallback={(e) => this.onCallback(e)} />
                    </View>
                </View>
            )
        } else {
            return (
                <View></View>
            )
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        height,
        width,
        padding: 10,
        justifyContent: 'center',
        position: 'absolute',
    },//遮罩
    containerOPA: {
        height,
        flex: 1,
        width,
        opacity: 0.6,
        position: 'absolute',
        backgroundColor: '#000',
    },//内容
    content: {
        height: SizeUtil.autoheight(400),
        backgroundColor: '#fff',
        borderRadius: 5
    }
})