import React from 'react';
import { TouchableHighlight } from 'react-native';

import stylesPri from './button.css';

const ButtonHighlight = (props) => {
    const { style = {}, type = 'primary' } = props;
    // 状态颜色集（默认)
    const active = {
        primary_active: '#40a9ff',
        danger_active: '#ff7875',
        reset_active: '#ffffff'
    }
    return (
        <TouchableHighlight
            underlayColor={active[type + "_active"]}
            {...props}
            style={{ ...stylesPri.button, ...stylesPri[type], ...style }}
        >
            {props.children}
        </TouchableHighlight>
    )
}
export default ButtonHighlight