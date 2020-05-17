import React from 'react';
import { TouchableOpacity } from 'react-native';

import stylesPri from './button.css';

const ButtonOpacity = (props) => {
    const { style = {}, type = 'primary' } = props;
    return (
        <TouchableOpacity
            {...props}
            style={{ ...stylesPri.button, ...stylesPri[type], ...style }}
        >
            {props.children}
        </TouchableOpacity>
    )
}
export default ButtonOpacity