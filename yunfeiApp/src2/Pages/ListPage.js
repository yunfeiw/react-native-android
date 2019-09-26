import React, { Component } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native'
class LogoTitle extends Component {
    render() {
        return (
            <Image
                source={require('./1.jpg')}
                style={{ width: 30, height: 30 }}
            />
        );
    }
}
export default class ListPage extends Component {
    // static navigationOptions = {
    //     headerTitle: <LogoTitle />,
    //     headerRight: (
    //         <Button
    //             title='info'
    //             onPress={() => alert('this is a button')}
    //             color='#fff'
    //         />
    //     )
    // }
    constructor(props) {
        super(props)
        this.state = {
            text: '列表',
            count: 1
        }
    }
    // state = {
    //     count: 0,
    // };
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: <LogoTitle />,
            headerLeft: null,
            headerRight: (
                <Button
                    title='+1'
                    onPress={navigation.getParam('increaseCount')}
                    color='#000'
                />
            )
        }
    }


    componentDidMount() {
        this.props.navigation.setParams({ increaseCount: this._increaseCount })
    }
    /**
     * 注意这里的 this 指向问题
     * 
     * 采取箭头函数 用于指向 当前函数
     * 切勿使用 (){}来进行声明，因为其会指向当前的调用函数，即点击tab
     */
    _increaseCount= () => {
        this.setState({ count: this.state.count + 1 })
    }
    render() {
        return (
            <View style={Styles.container}>
                <Text>计数器的值：{this.state.count}</Text>
                <Text>我是{this.state.text}界面</Text>
                <Button
                    title='关于'
                    onPress={() => this.props.navigation.navigate('About')}
                />
                <Button
                    title='首页'
                    onPress={() => this.props.navigation.navigate('Home')}
                />
                <Button
                    title='返回顶部'
                    onPress={() => this.props.navigation.popToTop()}
                />
            </View>
        )
    }
    componentWillUnMount() {
        // alert('componentWillUnMount：list')
    }
}
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})