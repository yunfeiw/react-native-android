import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SizeUtil from '../util/SizeUtil';

const HeadReact = (props) => {
    const { tit, lTool, rTool } = props;
    return (
        <View style={styles.box} >
            <View style={{ flex: 3 }}>
                {lTool && lTool()}
            </View>
            <View style={{ flex: 5 }}>
                <Text style={styles.txt}>
                    {tit}
                </Text>
            </View>
            <View style={{ flex: 3 }}>
                {rTool && rTool()}
            </View>
        </View>
    )
}

export default HeadReact
const styles = StyleSheet.create({
    /* ---标题--- */
    box: {
        height: 70,
        paddingTop: SizeUtil.setSpText(10),
        flexDirection: 'row',
        justifyContent: 'center',
    },
    txt: {
        fontSize: SizeUtil.setSpText(20),
        color: '#FFF',
        lineHeight: 50,
        fontWeight: '700',
        textAlign: 'center',
        letterSpacing: SizeUtil.setSpText(5)
    }
})
