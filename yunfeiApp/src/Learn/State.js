/**
 * State
 */

import React, { Component } from 'react'
import { Text, View } from 'react-native'

class Blink extends Component {
    state = () => { isShowingText: true }
    componentDidMount() {
        setInterval(() => {
            this.setState(previouState => {
                return { isShowingText: !previouState.isShowingText }
            })
        }, 1000)
    }
    render() {
        if (!this.state.isShowingText) {
            return null
        }
        return (
            <Text> {this.props.text} </Text>
        )
    }
}
export default class BlinkApp extends Component {
    render() {
        return (
            <View>
                <Blink text='haha' />
                <Blink text='hehe' />
                <Blink text='xixi' />
                <Blink text='lele' />
            </View>
        )
    }
}
