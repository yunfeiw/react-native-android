import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
const TextArea = (props) => {
    const { style = {} } = props
    return (
        <TextInput
            multiline={true}
            selectTextOnFocus={true}
            clearTextOnFocus={true}
            {...props}
            style={{ ...stylespri.item, ...style }}
        />
    )
}
export default TextArea;
const stylespri = StyleSheet.create({
    item: {
        height: 80,
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: '#fff',
        textAlignVertical: 'top',
    }
})