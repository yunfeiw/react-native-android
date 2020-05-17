import {
    ToastAndroid
} from 'react-native';
export const Toast = (props) => {
    if (props.visible) {
        ToastAndroid.showWithGravityAndOffset(
            props.message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            35,
            100
        );
        return null;
    }
    return null;
};