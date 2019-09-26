/**
 *处理文本输入 
*/
import React, { Component } from 'react'
import { Text, TextInput, View } from 'react-native'

export default class Pizza extends Component {
  state = { text: '' }
  change(text){
    console.log(text)
    this.setState({ text })
  }
  render() {
    return (
      <View style={{ padding: 10 }}>
        <TextInput
          placeholder='请输入'
          style={{ height: 40 }}
          onChangeText={ this.change.bind(this) }
          onSubmitEditing={() => alert(this.state.text)}
          value={this.state.text}
        />
        <Text style={{ padding: 10, fontSize: 42 }}>
          {this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
        </Text>
      </View>
    )
  }
}