import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native'

/*  */

export default class AboutPage extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('name','关于我们')
        }
    }
    constructor(props) {
        super(props)
        this.state = {
            text: '关于'
        }
    }
    componentDidMount() {
        // alert('componentDidMount：about')
    }

    render() {
        /**
         *  这个alert 会闪现一下
         *  估计原因： rende 导致界面重新绘制
        */
        // alert(this.props.navigation.state.params)
        const { navigation } = this.props;
        /**
         * getParam
         * 获取路由所传参数， 
         * param1 : key
         * param2 : 默认值
         * 
         * 如果你想通过 prop 直接访问 params（例如： this.props.itemId）
         * 而不是this.props.navigation.getParam，
         * 您可以使用社区开发的 react-navigation-props-mapper软件包。
         */
        const itemId = navigation.getParam('id', 'NO-ID');
        const otherParam = navigation.getParam('name', 'some default value');

        return (
            <View style={Styles.container}>
                <Text>首页传值ID为：{itemId}</Text>
                <Text>首页传值NAME为：{otherParam}</Text>
                <Text>我是{this.state.text}界面</Text>
                <Button
                    title='添加列表页历史记录'
                    onPress={() => this.props.navigation.push('About')}
                />
                <Button
                    title='列表页'
                    onPress={() => this.props.navigation.navigate('List')}
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
        // alert('componentWillUnMount：about')
    }
}
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})