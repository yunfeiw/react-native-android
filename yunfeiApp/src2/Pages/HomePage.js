import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native'
export default class HomePage extends Component {
    /**
     * 设置标题栏 
     * navigationOptions
     * 
     * 因为他是一个静态属性，所以this是不会指向一个组件的实例
     * 因此没有props可用；
     * 
     * 如果我们将navigationOptions作为一个函数，那么将包含
     * navigation navigationOptions，screenProps
     */
    // static navigationOptions = {
    //     title: '^_^ 首页'
    // }
    static navigationOptions = ({ navigation }) => {
        return {
            title:navigation.getParam('otherParam','一个首页'),
        }
    }
    constructor(props) {
        super(props)
        this.state = {
            text: '首页'
        }
    }
    componentDidMount() {
        // alert('componentDidMount：home')
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
                <Text>我是{this.state.text}界面</Text>
                <Button
                    title='关于'
                    onPress={() => this.props.navigation.navigate('About',
                        {
                            id: '123',
                            name: '测试'
                        }
                    )}
                />
                <Button
                    title='标题变化'
                    onPress={
                        () => this.props.navigation.setParams({ otherParam: '我是变化后的首页' })
                    }
                />
            </View>
        )
    }
    componentWillUnMount() {
        // alert('componentWillUnMount：home')
    }
}
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})