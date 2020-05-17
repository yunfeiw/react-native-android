import React, { Component } from 'react';
import {
    View,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Modal
} from 'react-native';

import loadingImage from '../../assets/gif/loading3.gif'

const { width, height } = Dimensions.get('window')

const Loading = (props) => {

    const { showLoading, opacity, backgroundColor, loadingViewClick } = props

    return (
        <Modal visible={showLoading} transparent>
            <View style={[styles.loadingView, { opacity: opacity || 0.3, backgroundColor: backgroundColor || '#000' }]}></View>
            <View style={styles.loadingImageView}>
                <View style={styles.loadingImage}>
                    {
                        loadingViewClick ?
                            <TouchableOpacity onPress={loadingViewClick}>
                                <Image style={styles.loadingImage} source={loadingImage} />
                            </TouchableOpacity>
                            :
                            <Image style={styles.loadingImage} source={loadingImage} />
                    }
                </View>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    loadingView: {
        flex: 1,
        height,
        width,
        position: 'absolute'
    },
    loadingImage: {
        width: 150,
        height: 100,
    },
    loadingImageView: {
        position: 'absolute',
        width,
        height,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Loading