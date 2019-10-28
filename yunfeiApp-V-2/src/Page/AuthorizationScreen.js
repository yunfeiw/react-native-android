import React, { Component } from 'react'
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    ToastAndroid,
    TouchableOpacity,
    PermissionsAndroid,
} from 'react-native'
const { width, height } = Dimensions.get('window')
import SizeUtil from '../util/SizeUtil';


export default class AuthorizationScreen extends Component {
    state = {
        flag1: false,
        flag2: false,
        Time: 6,
        cTime: null,
    }
    componentDidMount() {
        if (this.state.cTime) {
            clearInterval(this.state.cTime);
        }
        let cTime = setInterval(() => {
            let { Time } = this.state
            if (Time > 0) {
                this.setState({ Time: --Time });
            } else {
                clearInterval(this.state.cTime);
            }
        }, 1000);
        this.setState({ cTime: cTime });
        // 接收短信权限
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.RECEIVE_SMS).then(res => {
            //未授权
            if (!res) {
                this.setState({ flag1: true });
            }
            else {
                this.setState({ flag1: false })
            }
        })
        // 读取短信权限
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_SMS).then(res => {
            if (!res) {
                this.setState({ flag2: true });
            }
            else {
                this.setState({ flag2: false });
            }
        })
    }
    render() {
        const { flag1, flag2, Time } = this.state;
        if (flag1 || flag2) {
            return (
                <View style={styles.container}>
                    {/* 遮罩 */}
                    <View style={styles.containerOPA}></View>
                    <View style={{ ...styles.bg_view, marginBottom: 20 }}>
                        <Text style={{ padding: 10, color: "#fff", fontSize: SizeUtil.setSpText(18), fontWeight: '800', backgroundColor: '#2fa5de' }}>
                            请确认好当前权限已全部放开；否则APP功能将无法使用哦！
                        </Text>
                        <Text style={{ padding: 10, fontSize: SizeUtil.setSpText(16), textAlign: 'left', width: '100%' }}>
                            注意：
                        </Text>
                        <Text style={{ padding: 10, lineHeight: SizeUtil.setSpText(20) }}>
                            <Text style={{ color: 'red' }}>
                                [小米手机]
                            </Text>
                            的用户要手动更改下哦！！！同时要将
                            <Text style={{ color: 'red' }}>
                                通知类短息权限
                            </Text>
                            对本APP开放才可使用
                        </Text>
                        <Text style={{ padding: 10, lineHeight: SizeUtil.setSpText(20) }}>
                            <Text style={{ color: 'red' }}>
                                [VIVO手机]
                            </Text>
                            的用户要手动更改下哦！！！同时要将
                            <Text style={{ color: 'red' }}>
                                验证码安全保护权限
                            </Text>
                            对本APP开放才行嘞
                        </Text>
                        <Text>
                            华为、oppo无需此类设置；其余类型手机安装后请查看是否有存在上述类型权限，有则对本APP放开此权限
                        </Text>
                        <View style={{ flexDirection: 'row', marginTop: 20 }}>
                            {
                                flag1 ? <TouchableOpacity style={{ ...styles.button_view }}
                                    onPress={this.requestRECEIVESMSPermission.bind(this)}>
                                    <Text style={styles.button_text}>监听短信权限</Text>
                                </TouchableOpacity>:<Text></Text>
                            }
                            {

                                flag2 ? <TouchableOpacity style={{ ...styles.button_view }}
                                    onPress={this.requestREADSMSPermission.bind(this)}>
                                    <Text style={styles.button_text}>读取短信权限</Text>
                                </TouchableOpacity>:<Text></Text>
                            }
                        </View>
                    </View>
                </View>
            )
        } else {
            return (
                <View></View>
            )
        }
    }

    show(data) {
        ToastAndroid.show(data, ToastAndroid.SHORT)
    }
    shutDown() {
        this.setState({ flag1: false, flag2: false });
    }
    async requestRECEIVESMSPermission() {
        try {
            //返回string类型
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
                // {
                //     'title': '监听短信权限',
                //     'message': 'APP需要监听税务短信验证码，需要放开此权限，以保证申报功能正常运行！ '
                // }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.show("你已获取了 监听短信权限")
                this.setState({ flag1: false });
            } else {
                this.show("获取监听短信权限失败")
            }
        } catch (err) {
            this.show(err.toString())
        }
    }

    async requestREADSMSPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_SMS,
                // {
                //     'title': '读取短信权限',
                //     'message': '该权限用来，读取前5分钟内手机接收的税务短信验证码；避免您因APP未开启，需要重新提交申请的问题'
                // }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.show("你已获取了读取短信权限! ")
                this.setState({ flag2: false });

            } else {
                this.show("获取读取短信权限失败")
            }
        } catch (err) {
            this.show(err.toString())
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
    },
    containerOPA: {
        height,
        flex: 1,
        width,
        opacity: 0.6,
        position: 'absolute',
        backgroundColor: '#000',
    },
    bg_view: {
        margin: 4,
        padding: 7,
        borderRadius: 6,
        backgroundColor: '#FFF',
        alignItems: 'center',
    },
    button_view: {
        margin: 4,
        padding: 3,
        fontSize: SizeUtil.setSpText(12),
        borderRadius: 6,
        backgroundColor: '#e7eaee',
        alignItems: 'center',
    },
    button_text: {
        padding: 6,
        fontWeight: '600',
        fontSize: SizeUtil.setSpText(13),
    }
})