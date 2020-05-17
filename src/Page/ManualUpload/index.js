import React, { Component } from 'react';
import { View, Text, StyleSheet, Clipboard, ScrollView, DeviceEventEmitter } from "react-native";

const uuid = require('uuid');
const moment = require("moment");
import AsyncStorage from '@react-native-community/async-storage';

import BackgroundContainer from '../../components/BackgroundContainer';
import HeadCustom from '../../components/Head.react';
import { ButtonHighlight } from '../../components/Button/index'
import { Loading } from '../../components/Loading/index'

import SizeUtil from '../../util/SizeUtil';
import { uploadSMS } from '../../Server/uploadSMS';
import { Toast } from '../../util/Toast';

export default class ManualUpload extends Component {
    state = {
        value: '',
        loadingflag: false
    }
    onChangeText(v) {
        this.setState({ value: v })
    }
    onUpload() {
        const { value } = this.state;
        if (value != '') {
            const time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
            this.setState({ loadingflag: true });
            //上传
            uploadSMS(JSON.stringify({ mess: value, time })).then((res) => {
                const { Code, Message } = res;
                if (Code != 200) {
                    Toast({
                        visible: true,
                        message: Message
                    })
                    return
                }
                this.setState({ value: '', loadingflag: false })
                // 获取上传记录
                AsyncStorage.getItem('SMSlist').then(list => {
                    const newData = { mess: value, time, ...res, uuid: uuid.v1() };
                    if (list) {
                        let smslist = JSON.parse(list);
                        let arr = [newData, ...smslist];
                        AsyncStorage.setItem('SMSlist', JSON.stringify(arr));
                    } else {
                        AsyncStorage.setItem('SMSlist', JSON.stringify([]));
                    }
                    Toast({
                        visible: true,
                        message: Message
                    })
                    DeviceEventEmitter.emit('updateSMSlist', JSON.stringify(newData));
                });

            }).catch(() => {
                this.setState({ loadingflag: false })
            });
        } else {
            Toast({
                visible: true,
                message: '请粘贴需要上传的短信！'
            })
        }
    }
    onReset() {
        this.setState({ value: '' })
    }
    async _getContent() {
        const content = await Clipboard.getString();
        this.setState({ value: content });
    }
    async onPaste() {
        this._getContent()
    }
    render(h) {
        const { value, loadingflag } = this.state;
        return (
            <View>
                <BackgroundContainer>
                    {/* 头部 */}
                    <HeadCustom tit="手动上传" />
                    <View style={styles.container}>
                        <ScrollView contentContainerStyle={styles.contentContainer}>
                            <View style={styles.context}>
                                <Text selectable={true} style={styles.context_chart}>粘贴短信处</Text>
                                <Text onPress={() => this.onPaste()} style={styles.container_view}>
                                    {value}
                                </Text>
                                <Text style={styles.context_chart}>
                                    操作提示：点击空白区域，即可将复制短信粘贴
                            </Text>
                            </View>
                            <View style={styles.container_button}>
                                <ButtonHighlight onPress={() => this.onUpload()}>
                                    <Text style={{ color: '#fff' }}>
                                        上传
                                </Text>
                                </ButtonHighlight>
                                <ButtonHighlight style={{ marginTop: 10 }} type='reset' onPress={() => this.onReset()}>
                                    <Text style={{ color: '#4ba4f8' }}>
                                        重置
                                </Text>
                                </ButtonHighlight>
                            </View>
                        </ScrollView>
                    </View>
                </BackgroundContainer>
                {/* 加载层 */}
                <Loading showLoading={loadingflag}></Loading>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f8f9fe"
    },
    contentContainer: {
        paddingBottom: SizeUtil.autoheight(100)
    },
    context: {
        paddingTop: 20,
        paddingLeft: SizeUtil.autoWidth(20),
        paddingRight: SizeUtil.autoWidth(20),
        backgroundColor: '#ffffff'
    },
    context_chart: {
        color: "#aaaaaa",
        fontSize: SizeUtil.setSpText(15),
        lineHeight: SizeUtil.autoheight(30)
    },
    context_textAera: {
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
    },
    container_view: {
        paddingTop: SizeUtil.autoheight(30),
        paddingBottom: SizeUtil.autoheight(30),
        lineHeight: SizeUtil.autoheight(30),
        borderBottomWidth: 2,
        borderBottomColor: '#ebebeb',
        fontSize: SizeUtil.setSpText(14),

    },
    container_button: {
        marginTop: SizeUtil.autoheight(30),
        justifyContent: 'center',
        alignItems: 'center'
    }
})