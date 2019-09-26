import React ,{Component} from 'react'
import { StyleSheet, View,Text} from 'react-native'

export default class LotsOfStyles extends Component{
    render() {
        return(
            <View>
                <Text style={styles.red}>1111</Text>
                <Text style={styles.bigBlue}>2222</Text>
                <Text style={styles.red}>3333</Text>
                <Text style={styles.bigBlue}>4444</Text>
            </View>
        )
    }
}
/* ---样式--- */
let styles = StyleSheet.create({
    bigBlue:{
        color:'blue',
        fontWeight:'bold',
        fontSize:30
    },
    red:{
        color:'red'
    }
})