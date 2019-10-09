import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native';
// 读取当前手机短信
import GetSmsInPhone from "./src/GetMessageInfo";
import DeleterLetter from "./src/DeleterLetter";

export default class PermissionAndroidView extends Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         msg: [],
    //     }
    // }
    state = { msg: [] }
    /* ---获取手机短信--- */
    getWechat() {
        const that = this
        GetSmsInPhone.getSmsInPhone(msg => {
            alert(typeof msg)
            that.setState({ msg: JSON.parse(msg) })
        })
    }
    /* ---删除短信--- */
    deleterLetter() {
        DeleterLetter.deleter('2075', (val) => {
            alert(val)
        })
    }
    _keyExtractor = (item, index) => item._id;
    render() {
        const { msg } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.containerT}>
                    <Text onPress={this.getWechat.bind(this)}>获取短信</Text>
                    <Text onPress={this.deleterLetter.bind(this)}>删除2075</Text>
                </View>
                <View style={styles.containerB}>
                    <FlatList
                        data={msg}
                        keyExtractor={this._keyExtractor}
                        renderItem={({ item }) =>
                            <View style={styles.views}>
                                <View><Text style={styles.item1}>序  号：{item._id}</Text></View>
                                <View><Text style={styles.item2}>对话号：{item.thread_id}</Text></View>
                                <View><Text style={styles.item3}>手机号：{item.num}</Text></View>
                                <View><Text style={styles.item4}>内  容：{item.mess}</Text></View>
                            </View>
                        }
                    />
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    containerT: {
        flex: 1,
    },
    containerB: {
        flex: 5,
    },
    views: {
        borderBottomWidth: 2,
        borderBottomColor: "#000",
    },
    item1: {
        padding: 10,
        fontSize: 18,
        fontWeight: "800",
        backgroundColor: "#3a7af4",
    },
    item2: {
        padding: 10,
        fontSize: 18,
        backgroundColor: "#46f5dd",
    },
    item3: {
        padding: 10,
        fontSize: 16,
        backgroundColor: "#daec4e",
    },
    item4: {
        padding: 10,
        fontSize: 14,
    },
})