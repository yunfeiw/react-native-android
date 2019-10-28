import React from 'react';
import {
    Button,
    View,
    Text,
    StyleSheet,
    ImageBackground,
} from 'react-native';

import SizeUtil from '../util/SizeUtil';
import GetPhoneModel from '../nativeJS/GetPhoneModel';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: null,
        header: null
    };
    state = {
        PhoneNum: '',
        rule: '',
        version: '2.1.2',
        phoneModel: '',
    }
    _navigationRule = () => {
        this.props.navigation.navigate('Rule');
    }

    _init = async () => {
        // 当前用户信息
        await AsyncStorage.getItem('userInfo').then(res => {
            this.setState({ PhoneNum: JSON.parse(res).PhoneNum });
        })
        await AsyncStorage.getItem('rule').then(res => {
            if (res) {
                this.setState({ rule: JSON.parse(res).length });
            }
        })
        // 当前手机型号
        GetPhoneModel.getPhoneModel((msg) => {
            this.setState({ phoneModel: msg });
        });
    }
    componentDidMount() {
        /* 获取用户 */
        this._init();
    }
    render() {
        const { PhoneNum, rule, version, phoneModel } = this.state
        return (
            <View style={{ flex: 1 }}>
                <ImageBackground
                    source={require('../assets/img/top.png')}
                    // source={{ uri: 'http://pic1.win4000.com/wallpaper/c/53e872eecd821.jpg' }}
                    style={{
                        width: '100%', height: '100%',
                        backgroundColor: '#f8f9fe',
                        resizeMode: 'cover'
                    }}
                >
                    <View>
                        <Text style={styles.header}>
                            税 务 短 信
                        </Text>
                    </View>
                    <View style={styles.body}>
                        <View style={styles.view}>
                            <Text style={{ flex: 1, fontSize: SizeUtil.setSpText(12) }}>登录手机号</Text>
                            <Text style={{ flex: 1, textAlign: 'right', fontSize: SizeUtil.setSpText(12) }}>{PhoneNum}</Text>
                        </View>
                        <View style={styles.view} >
                            <Text
                                onPress={() => this._navigationRule()}
                                style={{ flex: 1, fontSize: SizeUtil.setSpText(12) }}>过滤规则</Text>
                            <Text
                                onPress={() => this._navigationRule()}
                                style={{ flex: 1, textAlign: 'right' }}>
                                {rule}
                                <FontAwesome
                                    size={SizeUtil.setSpText(15)}
                                color="#d9d9d9"
                                    name={'angle-down'}
                                />
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                height: 50,
                                borderBottomWidth: 2,
                                borderTopWidth: 2,
                                borderColor: "#f1f1f1",
                                paddingTop: 10
                            }}
                        >
                            <Text style={{ flex: 1, fontSize: SizeUtil.setSpText(12) }}>版本号</Text>
                            <Text style={{ flex: 1, textAlign: 'right', fontSize: SizeUtil.setSpText(12) }}>{version}</Text>
                        </View>
                        <View style={styles.view} >
                            <Text style={{ flex: 1, fontSize: SizeUtil.setSpText(12) }}>当前机型</Text>
                            <Text
                                style={{ flex: 4, textAlign: 'right', fontSize: SizeUtil.setSpText(12) }}>
                                {phoneModel}
                            </Text>
                        </View>
                        
                        {/* <Button title='我的页面' /> */}
                        {/* <Button title="获取所有Storage" onPress={this._getStorageData} /> */}
                        <View style={{
                            paddingTop: 50
                        }}>
                            <Button title="退出登录" onPress={this._signOutAsync} />
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }

    _showMoreApp = () => {
        this.props.navigation.navigate('My');
    };

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };
}

const styles = StyleSheet.create({
    header: {
        fontSize: SizeUtil.setSpText(20),
        color: '#fff',
        lineHeight: 50,
        fontWeight: '700',
        textAlign: 'center',
    },
    body: {
        padding: 15,
        paddingTop: 30,
        paddingBottom: 30,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    view: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10
    }
})