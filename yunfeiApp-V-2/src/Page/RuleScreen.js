import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ImageBackground,
} from 'react-native';
import { Toast } from '../util/Toast';
import SizeUtil from '../util/SizeUtil';
import { getRule } from '../Server/getRule';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
export default class RuleScreen extends Component {
    static navigationOptions = {
        title: null,
        header: null
    };
    state = {
        arr: []
    }
    _refreshRuleFun = () => {
        getRule().then(res => {
            Toast({
                visible: true,
                message: '税务短信规则更新完成'
            })
            this.setState({ arr: res });

        });
    }
    componentDidMount() {
        // 获取规则
        AsyncStorage.getItem('rule').then(res => {
            this.setState({ arr: JSON.parse(res) });
        });
    }

    _keyExtractor = (item, index) => item.FilterTitle;
    render() {
        const { arr } = this.state
        return (
            <View>
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
                        <View style={{ flex: 3, paddingTop: 10 }}>
                            <View style={{ paddingLeft: 20 }}>
                                <FontAwesome
                                    size={30}
                                    color="#fff"
                                    name={'angle-left'}
                                    style={{ paddingLeft: 10 }}
                                    onPress={() => this.props.navigation.navigate('MyMain')}
                                />
                            </View>
                        </View>
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
                            <Text style={styles.clear_tit} onPress={() => this._refreshRuleFun()}> 刷新 </Text>
                        </View>
                    </View>
                    <Text>

                    </Text>
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
                            <View>
                                <Text style={{ textAlign: 'center', fontSize: SizeUtil.setSpText(20), lineHeight: 30 }}>暂无数据</Text>
                            </View>}
                    </View>
                </ImageBackground>
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
        flexDirection: 'row',
        justifyContent: 'center'
    },
    header_tit: {
        fontSize: SizeUtil.setSpText(20),
        color: '#fff',
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
        paddingRight: 10
    }
})