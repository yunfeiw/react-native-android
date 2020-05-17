import React, { Component, useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    StyleSheet,
    ImageBackground,
} from 'react-native';
import SizeUtil from '../../util/SizeUtil';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import help1 from '../../assets/img/help1.png';
import help2 from '../../assets/img/help2.png';
import help4 from '../../assets/img/help4.png';
import help41 from '../../assets/img/help41.png';
export default class HelpScreen extends Component {
    static navigationOptions = {
        title: null,
        header: null
    };
    state = {
        arr: [
            {
                tit: 'vivo与oppo',
                txt: '需要为其开放额外权限，如下图所示：',
                src: help1
            }, {
                tit: '小米',
                txt: '由于系统拦截；可能导致短信权限未被授予；需手动开启。同时需要‘通知类短信’权限。如下图所示：',
                src: help2
            }, {
                tit: '华为',
                txt: '华为手机，个别系统版本不信任第三方短信（即：通讯录内未保存的联系人），导致无法读取短信或监听短信。需要手动开启该权限。',
                // src: help2
            }, {
                tit: '温馨提示',
                txt: '上述授权操作可参照下图查找；',
                src: help4,
                src2: help41,
            }
        ]
    }

    componentDidMount() { }

    _keyExtractor = (item, index) => item.tit;
    render() {
        const { arr } = this.state
        return (
            <View>
                <ImageBackground
                    source={require('../../assets/img/help_bg.jpg')}
                    style={{
                        width: '100%', height: '100%',
                        backgroundColor: '#f8f9fe',
                        resizeMode: 'contain'
                    }}
                >

                    <View style={styles.header} >
                        <View style={{ flex: 3 }}>
                            <FontAwesome
                                size={30}
                                color="#fff"
                                name={'angle-left'}
                                style={{ paddingLeft: 10 }}
                                onPress={() => this.props.navigation.navigate('MyMain')}
                            />
                        </View>
                        <View style={{ flex: 5 }}>
                            <Text style={styles.header_tit}>
                                帮 助 中 心
                            </Text>
                        </View>
                        <View style={{ flex: 3 }}></View>
                    </View>

                    <View style={{ height: "90%" }} >
                        <FlatList
                            data={arr}
                            keyExtractor={this._keyExtractor}
                            VirtualizedList={this._keyExtractor}
                            renderItem={({ item }) => (
                                <View style={styles.item}>
                                    {/* 标题 */}
                                    <View style={{ alignItems: 'center' }}>
                                        <ImageBackground
                                            source={require('../../assets/img/help_tit.png')}
                                            style={{
                                                width: SizeUtil.autoWidth(200),
                                                height: SizeUtil.autoheight(30),
                                                resizeMode: 'contain'
                                            }}
                                        >
                                            <Text style={styles.itemtit}>{item.tit}</Text>
                                        </ImageBackground>
                                    </View>
                                    {/* 描述 */}
                                    <Text style={styles.itemtxt}>{item.txt}</Text>
                                    {
                                        item.src ? <Image
                                            style={{
                                                width: SizeUtil.autoWidth(300),
                                                height: SizeUtil.autoheight(200),
                                                resizeMode: 'contain'
                                            }}
                                            source={item.src}
                                        /> : <Text></Text>
                                    }
                                    {
                                        item.src2 ? <View style={{width:'100%', height:20,borderBottomWidth:2,borderBottomColor:'#ccc'}}></View>:<View></View>
                                    }
                                    {
                                        item.src2 ? <Image
                                            style={{
                                                width: SizeUtil.autoWidth(200),
                                                height: SizeUtil.autoheight(200),
                                                resizeMode: 'contain'
                                            }}
                                            source={item.src2}
                                        /> : <Text></Text>
                                    }
                                </View>
                            )}
                        />
                    </View>
                </ImageBackground>
            </View>
        )
    }
};
const styles = StyleSheet.create({
    /* ---列表元素--- */
    item: {
        marginTop: 10,
        borderRadius: 10,
        marginBottom: 10,
        marginLeft: '5%',
        marginRight: '5%',
        padding: 10,
        alignItems: 'center',
        backgroundColor: "#fff",
    },
    itemtit: {
        textAlign: 'center',
        fontSize: SizeUtil.setSpText(14),
        fontWeight: '900',
        lineHeight: SizeUtil.autoheight(30),
        color: '#fff'

    },
    itemtxt: {
        margin: SizeUtil.autoheight(20),

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
    }
})