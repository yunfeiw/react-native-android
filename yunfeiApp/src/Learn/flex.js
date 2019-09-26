import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class FlexBox extends Component{
    render(){
        return(
            <View style={{flex:1}}>
                <View style={{flex:1,backgroundColor:'red'}}></View>
                <View style={{flex:1,backgroundColor:'green'}}></View>
                <View style={{flex:1,backgroundColor:'yellow'}}></View>
            </View>
        )
    }
}