/**
 * Props
 * 大多数组件在创建时可以使用各种参数来进行定制。用于定制的这些参数就称为props(属性)
 * 
 * 括号的意思是括号内部为一个js变量或表达式，需要执行后取值。可把任何合法的JavaScript表达式
 * 通过括号嵌入到JSX语句内
 * 
 * 
 */
import React, { Component } from 'react'
import { Image, Text, View } from 'react-native'
export default class Bananas extends Component {
    render() {
        let pic = {
            uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
        }
        return (
            <View style={{ alignItems: 'center' }}>
                <Image source={pic} style={{ width: 193, height: 110 }} />
                <Greeting name='11' />
                <Greeting name='22' />
                <Greeting name='333' />
            </View>
        )
    }
}
class Greeting extends Component {
    render() {
        return (
            <View style={{ alignItems: 'center', marginTop: 50 }}>
                <Text>Hello {this.props.name}</Text>
            </View>
        )
    }
}