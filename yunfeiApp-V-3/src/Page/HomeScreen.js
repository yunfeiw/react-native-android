import React from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    StyleSheet,
    ImageBackground,
    DeviceEventEmitter,
} from 'react-native';

const uuid = require('uuid');
const moment = require("moment");
import { Toast } from '../util/Toast';
import SizeUtil from '../util/SizeUtil';
import AlertView from '../util/AlertView.js';
import { uploadSMS } from '../Server/uploadSMS';
import { ValidateSms } from '../util/ValidateSms';
import GetMessageInfo from '../nativeJS/GetMessageInfo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import NoData from '../assets/img/nodata.png';

export default class HomeScreen extends React.Component {
    state = {
        deleteid: '',
        outTime: null,
        arr: [
            // {
            //     _id: '',
            //     thread_id: '',
            //     num: '',
            //     mess: '',
            //     date: '',
            //     Code:'', //提交状态
            //     Message:'', //上传失败描述
            //     uuid:''  //唯一标识
            // }
        ],
    }
    componentDidMount() {
        // 5分钟内短信
        this.GetMessageInfo1();
        // 获取上传记录
        AsyncStorage.getItem('SMSlist').then(list => {
            if (list) {
                this.setState({ arr: JSON.parse(list) });
            }
        });
        //收到监听
        DeviceEventEmitter.addListener('updateSMSlist', (message) => {
            // 倒序排列
            let arr = [JSON.parse(message), ...this.state.arr];
            AsyncStorage.setItem('SMSlist', JSON.stringify(arr));
            this.setState({ arr: arr });
        })
        // 重置短信
        if (this.state.outTime) {
            clearTimeout(this.state.outTime);
        };
        let outTime = setTimeout(() => {
            console.log('更新短信 5分钟内的');
            const dTime = 1000 * 60 * 60 * 24;   //24小时前
            // const dTime = 1000 * 60 * 50;
            const eTime = new Date().getTime();
            const sTime = moment(new Date(eTime - dTime)).format('YYYY-MM-DD HH:mm:ss');
            //超过一天删选短信
            AsyncStorage.getItem('SMSlist').then(async res => {
                if (!res) {
                    return
                };
                let arr = JSON.parse(res);
                if (arr.length == 0) {
                    // 短信无，终止
                    return;
                };
                let newarr = [];
                arr.map((e, i) => {
                    if (e.time > sTime) {
                        console.log('删选后的短信：', e);
                        newarr.push(e);
                    };
                });
                // 保存删选后短信
                AsyncStorage.setItem('SMSlist', JSON.stringify(newarr));
                this.setState({ arr: newarr });

            });
        }, 1000 * 20);
        this.setState({ outTime: outTime });
    }


    //读取手机5分钟内的短信
    GetMessageInfo1 = () => {
        GetMessageInfo.getSmsInPhone((list) => {
            let nowTime = new Date();
            let second = nowTime.getTime() - 60 * 1000 * 5;
            let SMS = JSON.parse(list);
            let newSMS = [];
            SMS.map((e, i) => {
                if (e.time >= second) {
                    newSMS.push(e)
                }
            })
            console.log('删选5分钟内的短信', newSMS);
            newSMS.map((e, i) => {
                //校验是否符合规则
                ValidateSms(e['mess'], (valid) => {
                    //上传
                    uploadSMS(JSON.stringify(e)).then(res => {
                        if (valid) {
                            e.time = moment(new Date(Number(e.time))).format('YYYY-MM-DD HH:mm:ss');
                            let arr = [{ ...e, ...res, uuid: uuid.v1() }, ...this.state.arr];
                            AsyncStorage.setItem('SMSlist', JSON.stringify(arr));
                            this.setState({ arr: arr });
                        };
                    });
                });
            });
        });
    }
    /* 删除 */
    _clearSmsFun = (val) => {
        this.refs.deleteI.showDialog();
        this.setState({ deleteid: val });
    }
    _clearSmsFunOK = () => {
        let deleteid = this.state.deleteid;
        let arr = this.state.arr;
        let newarr = arr.filter((e, i) => e.time != deleteid);
        AsyncStorage.setItem('SMSlist', JSON.stringify(newarr));
        this.setState({ arr: newarr });
    }
    /* 删除全部 */
    _clearAllSmsFun = () => {
        const { arr } = this.state;
        if (arr.length == 0) {
            Toast({
                visible: true,
                message: '暂无数据'
            })
        } else {
            this.refs.deleteAll.showDialog();
        }
    }
    _clearAllSmsFunOK = () => {
        AsyncStorage.setItem('SMSlist', JSON.stringify([]));
        this.setState({ arr: [] });
    }
    _keyExtractor = (item, index) => item.uuid;

    render() {
        const { arr } = this.state
        return (
            <View>
                <ImageBackground
                    source={require('../assets/img/top.png')}
                    // source={{ uri: 'http://pic1.win4000.com/wallpaper/c/53e872eecd821.jpg' }}
                    style={{
                        width: '100%',
                        backgroundColor: '#f8f9fe',
                        resizeMode: 'cover'
                    }}
                >
                    <View style={styles.header} >
                        <View style={{ flex: 3 }}></View>
                        <View style={{ flex: 5 }}>
                            <Text style={styles.header_tit}>
                                税 务 短 信
                            </Text>
                        </View>
                        <View style={styles.clear}>
                            <Text style={styles.clear_font}>
                                <FontAwesome
                                    size={SizeUtil.setSpText(12)}
                                    color="#fff"
                                    name={'trash-o'}
                                />
                            </Text>
                            <Text style={styles.clear_tit} onPress={() => this._clearAllSmsFun()}> 全部删除 </Text>
                        </View>
                    </View>
                    <View
                        style={{ height: "90%" }}
                    >
                        {
                            arr.length ?
                                <FlatList
                                    data={arr}
                                    keyExtractor={this._keyExtractor}
                                    renderItem={({ item }) => (
                                        <View style={styles.item}>
                                            {/* 记 */}
                                            <View style={styles.note}>
                                                <Text
                                                    style={{ flex: 1, color: "#aaa", lineHeight: 20 }}>
                                                    {item.time}</Text>
                                                {
                                                    item.Code == 200 ?
                                                        <Text
                                                            style={{
                                                                flex: 1,
                                                                textAlign: 'right',
                                                                color: '#3bd29b',
                                                                lineHeight: 20
                                                            }}
                                                        >已上传</Text> : <Text
                                                            style={{
                                                                flex: 1,
                                                                textAlign: 'right',
                                                                color: '#eb1010',
                                                                lineHeight: 20
                                                            }}
                                                        >失败</Text>
                                                }
                                            </View>

                                            <Text
                                                onLongPress={() => this._clearSmsFun(item.uuid)}
                                                style={{ paddingTop: 10, fontSize: SizeUtil.setSpText(12), paddingBottom: 10, lineHeight: 18 }}
                                            >{item.mess}</Text>
                                        </View>
                                    )}
                                /> :
                                <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
                                    <Image
                                        style={{ width: SizeUtil.autoWidth(180), height: SizeUtil.autoheight(100) }}
                                        resizeMode='contain'
                                        source={NoData} />
                                    <Text style={{ textAlign: 'center', fontSize: SizeUtil.setSpText(12), lineHeight: 20 }}>暂无数据</Text>
                                </View>
                        }

                    </View>

                </ImageBackground>
                {/* 删除 */}
                <AlertView
                    ref='deleteI'
                    alertTitle='提示'
                    alertContent='确定要删除此条数据吗？'
                    cancleName='取消'
                    conformName='确定'
                    comformClik={this._clearSmsFunOK.bind(this)}
                />
                {/* 删除全部 */}
                <AlertView
                    ref='deleteAll'
                    alertTitle='提示'
                    alertContent='确定要删除全部数据吗？'
                    cancleName='取消'
                    conformName='确定'
                    comformClik={this._clearAllSmsFunOK.bind(this)}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    /* ---列表元素--- */
    item: {
        marginTop: 10,
        borderRadius: 10,
        marginBottom: 10,
        marginLeft: '5%',
        marginRight: '5%',
        padding: 10,
        backgroundColor: "#fff",
    },
    note: {
        paddingBottom: 10,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: "#EBEBEB"
    },
    /* ---标题--- */
    header: {
        height: '10%',
        paddingTop: SizeUtil.setSpText(10),
        flexDirection: 'row',
        justifyContent: 'center'
    },
    header_tit: {
        fontSize: SizeUtil.setSpText(20),
        color: '#FFF',
        lineHeight: 50,
        fontWeight: '700',
        textAlign: 'center',
    },
    /* ---删除--- */
    clear: {
        flex: 3,
        textAlign: "right",
        flexDirection: 'row',
        justifyContent: "flex-end"
    },
    clear_font: {
        lineHeight: 50,
    },
    clear_tit: {
        color: "#fff",
        lineHeight: 50,
        fontSize: SizeUtil.setSpText(12),
    }
})