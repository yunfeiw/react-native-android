import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    StyleSheet,
    ImageBackground,
} from 'react-native';
import { Toast } from '../../util/Toast';
import SizeUtil from '../../util/SizeUtil';
import { getRule } from '../../Server/getRule';
import { getKeyWord } from '../../Server/getKeyWord';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import NoData from '../../assets/img/nodata.png';

import { Loading } from '../../components/Loading/index'

import AuthorizationScreen from '../AuthorizationScreen2';

export default class RuleScreen extends Component {
    static navigationOptions = {
        title: null,
        header: null
    };
    state = {
        arr: [],
        ruleLg: 0,
        loadingflag: false
    }
    // 刷新规则
    _refreshRuleFun = () => {
        this.setState({ loadingflag: true });
        getRule().then(res => {
            Toast({
                visible: true,
                message: '税务短信规则更新完成'
            })
            this.setState({ arr: res, ruleLg: res.length, loadingflag: false });

        });
        // 同时更新 关键字
        getKeyWord().then(res => { });
    }
    componentDidMount() {
        // 获取规则
        AsyncStorage.getItem('rule').then(res => {
            const Rarr = JSON.parse(res)
            this.setState({ arr: Rarr, ruleLg: Rarr.length });
        });
    }

    _keyExtractor = (item, index) => item.FilterTitle;
    render() {
        const { arr, ruleLg, loadingflag } = this.state
        return (
            <View>
                <ImageBackground
                    source={require('../../assets/img/top.png')}
                    // source={{ uri: 'http://pic1.win4000.com/wallpaper/c/53e872eecd821.jpg' }}
                    style={{
                        width: '100%', height: '100%',
                        backgroundColor: '#f8f9fe',
                        resizeMode: 'cover'
                    }}
                >
                    <View style={styles.header} >
                        <View style={{ flex: 3 }}></View>
                        <View style={{ flex: 5 }}>
                            <Text style={styles.header_tit}>
                                过 滤 规 则
                            </Text>
                        </View>
                        <View style={styles.clear}>
                            <Text style={styles.clear_font}>
                                <FontAwesome
                                    size={SizeUtil.setSpText(12)}
                                    color="#fff"
                                    name={'undo'}
                                />
                            </Text>
                            <Text style={styles.refresh} onPress={() => this._refreshRuleFun()}> 更新 </Text>
                        </View>
                    </View>

                    <View
                        style={{ height: "90%" }}
                    >
                        {arr.length ?
                            <FlatList
                                data={arr}
                                keyExtractor={this._keyExtractor}
                                VirtualizedList={this._keyExtractor}

                                renderItem={({ item }) => (
                                    <View style={styles.item}>
                                        {/* 记 */}
                                        <View style={styles.note}>
                                            <Text
                                                style={{ flex: 1, color: "#aaa", lineHeight: 20 }}>
                                                {item.FilterTitle || '【默认】'}</Text>
                                        </View>

                                        <Text
                                            style={{ paddingTop: 10, paddingBottom: 10, lineHeight: 18 }}
                                        >{item.Area}  {item.TaxType}</Text>
                                    </View>
                                )}
                            /> :
                            <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
                                <Image
                                    style={{ width: SizeUtil.autoWidth(180), height: SizeUtil.autoheight(100) }}
                                    resizeMode='contain'
                                    source={NoData} />
                                <Text style={{ textAlign: 'center', fontSize: SizeUtil.setSpText(12), lineHeight: 20 }}>暂无数据</Text>
                            </View>}
                        {/* 球 */}
                        <View style={styles.ball}>
                            <Text style={styles.balltxt}>{ruleLg}条</Text>
                        </View>
                        {/* 加载层 */}
                        <Loading showLoading={loadingflag}></Loading>
                    </View>
                </ImageBackground>
                <AuthorizationScreen />

            </View>
        )
    }
};
const styles = StyleSheet.create({
    /* ---列表元素--- */
    item: {
        height: 100,
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
    refresh: {
        color: "#fff",
        lineHeight: 50,
        fontSize: SizeUtil.setSpText(12),
        paddingRight: 10
    },
    /* ---球--- */
    ball: {
        position: 'absolute',
        top: '80%',
        right: 10,
        width: SizeUtil.autoWidth(50),
        height: SizeUtil.autoheight(50),
        borderRadius: 50,
        backgroundColor: '#5b85fe',
    },
    balltxt: {
        textAlign: 'center',
        color: '#fff',
        lineHeight: SizeUtil.autoheight(50),
        fontSize: SizeUtil.setSpText(14),
    }
})