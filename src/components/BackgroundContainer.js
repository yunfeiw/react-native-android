import React, { Component } from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';

const BackgroundContainer = (props) => {
    return (
        <View>
            <ImageBackground
                source={require('../assets/img/top.png')}
                style={styles.bg}
            >
                {props.children}
            </ImageBackground>
        </View>
    )
}

export default BackgroundContainer;

const styles = StyleSheet.create({
    bg: {
        width: '100%',
        height: '100%',
        resizeMode: "contain",
        backgroundColor: "#f8f9fe"
    }
});