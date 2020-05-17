import {StyleSheet } from 'react-native';

import SizeUtil from '../../util/SizeUtil';

const stylesPri = StyleSheet.create({
    button: {
        width: SizeUtil.autoWidth(200),
        padding: SizeUtil.autoheight(6),
        alignItems: 'center',
        borderRadius: SizeUtil.autoWidth(3),
    },
    primary: {
        backgroundColor: '#096dd9',
    },
    danger: {
        backgroundColor: '#ff4d4f',
    },
    reset: {
        backgroundColor: '#deedff'
    }
})
export default stylesPri;