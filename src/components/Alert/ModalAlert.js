import React from 'react';

import {
    View,
    Modal,
    Dimensions,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

let { width, height } = Dimensions.get("window");
const ModalAlert = (props) => {
    const { visible } = props;

    //蒙层背景
    const renderMongoliaView = () => {
        return (
            <TouchableOpacity style={styles.bgContainViewStyle}>
                <View></View>
            </TouchableOpacity>
        );
    }

    if (!visible) {
        return null;
    } else {
        return (
            <Modal
                visible={visible}
                animationType={'fade'}
                transparent={true}
                onRequestClose={() => { }}
            >
                <View style={styles.containerStyle}>
                    {renderMongoliaView()}
                    <View style={styles.alertViewStyle}>
                        {props.children}
                    </View>
                </View>
            </Modal>
        )
    }


}

const styles = StyleSheet.create({
    bgContainViewStyle: {
        height: height,
        width: width,
        opacity: 0.4,
        position: 'absolute',
        backgroundColor: 'rgb(0,0,0)',
    },
    containerStyle: {
        flex: 1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    },
    alertViewStyle: {
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white',
        borderColor: 'lightgrey',
    },
});

export default ModalAlert