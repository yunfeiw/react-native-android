import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    Button,
    Dimensions,
    StyleSheet,
    ToastAndroid,
    PermissionsAndroid,
} from 'react-native'
const { width, height } = Dimensions.get('window')
import SizeUtil from '../util/SizeUtil';
import tip from '../assets/img/tip.png';


export default class AuthorizationScreen extends Component {
    state = {
        flag1: false,
        flag2: false,
    }
    componentDidMount() {

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
        const { flag1, flag2 } = this.state;
        if (flag1 || flag2) {
            return (
                <View style={styles.container}>
                    {/* 遮罩 */}
                    <View style={styles.containerOPA}></View>
                    <View style={styles.content}>
                        {/* 标识 */}
                        <View style={styles.mark}></View>
                        <Text style={styles.tit}>新手必读</Text>
                        <Text style={styles.titp}>请求确认，以下权限已授权；否则APP功能将无法正常使用！</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            {
                                flag1 ? <Button
                                    title="监听短信权限"
                                    color="#6586f1"
                                    accessibilityLabel="监听短信权限"
                                    onPress={this.requestRECEIVESMSPermission.bind(this)}
                                /> : <Text></Text>
                            }
                            <View style={{ width: SizeUtil.autoWidth(50) }}></View>

                            {
                                flag2 ? <Button
                                    title="读取短信权限"
                                    color="#ff959e"
                                    onPress={this.requestREADSMSPermission.bind(this)}
                                    accessibilityLabel="读取短信权限"
                                /> : <Text></Text>
                            }
                        </View>
                        <Image
                            style={{ width: SizeUtil.autoWidth(300), height: SizeUtil.autoheight(150) }}
                            resizeMode='contain'
                            source={tip} />
                        <Text style={{ fontSize: SizeUtil.setSpText(14),lineHeight: SizeUtil.autoheight(28)}}>请注意！因手机品牌的系统差异；会额外添加类似权限：<Text style={{ color: '#535dcc' }}>通知类短信</Text>、<Text style={{ color: '#535dcc' }}>验证码安全保护</Text>、<Text style={{ color: '#535dcc' }}>禁止读取未知来源短信</Text>等。这些权限请手动添加。</Text>
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
        paddingLeft: SizeUtil.autoWidth(20),
        paddingRight: SizeUtil.autoWidth(20),
        paddingTop: SizeUtil.autoWidth(15),
        paddingBottom: SizeUtil.autoWidth(15),
        backgroundColor: '#fff',
        borderRadius: 5
    },//标签
    mark: {
        marginTop: SizeUtil.autoWidth(10),
        marginBottom: SizeUtil.autoWidth(10),
        width: SizeUtil.autoWidth(55),
        height: SizeUtil.autoheight(10),
        backgroundColor: '#535dcc',
    },
    tit: {
        fontSize: SizeUtil.setSpText(30),
        fontWeight: '800',
        marginBottom: SizeUtil.autoheight(10)
    },
    titp: {
        fontSize: SizeUtil.setSpText(16),
        marginBottom: SizeUtil.autoWidth(20),
        color: '#666666'
    }
})