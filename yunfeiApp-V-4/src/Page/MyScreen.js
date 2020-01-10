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
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: null,
        header: null
    };
    state = {
        PhoneNum: '',
        version: '1.0.1',
        phoneModel: '',
    }
    _navigationHelp = () => {
        this.props.navigation.navigate('Help');
    }

    _init = async () => {
        // 当前用户信息
        await AsyncStorage.getItem('userInfo').then(res => {
            this.setState({ PhoneNum: JSON.parse(res).PhoneNum });
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
        const { PhoneNum, version, phoneModel } = this.state
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
                    <View style={styles.header} >
                        <View style={{ flex: 5 }}>
                            <Text style={styles.header_tit}>
                                个 人 中 心
                            </Text>
                        </View>
                    </View>
                    <View style={styles.body}>
                        <View style={styles.view}>
                            <Text style={{ flex: 1, fontSize: SizeUtil.setSpText(12) }}>登录手机号</Text>
                            <Text style={{ flex: 1, textAlign: 'right', fontSize: SizeUtil.setSpText(12) }}>{PhoneNum}</Text>
                        </View>

                        <View style={styles.view} >
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
                        <View style={styles.view} >
                            <Text
                                onPress={() => this._navigationHelp()}
                                style={{ flex: 1, fontSize: SizeUtil.setSpText(12) }}>帮助中心</Text>
                            <Text
                                onPress={() => this._navigationHelp()}
                                style={{ flex: 1, textAlign: 'right' }}>
                                <Ionicons
                                    size={SizeUtil.setSpText(15)}
                                    color="#3385ff"
                                    name={'md-help-circle'}
                                />
                            </Text>
                        </View>
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
        paddingBottom: 10,
        borderBottomWidth: 2,
        // borderTopWidth: 2,
        borderColor: "#f1f1f1",
    }
})