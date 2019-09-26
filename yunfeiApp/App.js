import React from 'react';
import { View, Text } from 'react-native';
import AppContainer from "./src2/Navigator/index";
const handleNavigationChange = (prevState, newState, action) => {
  console.log(prevState, newState, action)
}
export default class App extends React.Component {

  render() {
    return (
      <View style={{ flex: 1 }}>
        <AppContainer
          onNavigationStateChange={handleNavigationChange}
          uriPrefix="/app"
        />
      </View>)
  }
}