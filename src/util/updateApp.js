import React from 'react';

import {
    Alert,
    Linking,
    Platform,
} from 'react-native';

import {
    isFirstTime,
    isRolledBack,
    checkUpdate,
    downloadUpdate,
    switchVersion,
    switchVersionLater,
    markSuccess,
} from 'react-native-update';

import _updateConfig from '../../update.json';
const { appKey } = _updateConfig[Platform.OS];

const initUpdate = () => {
    if (isFirstTime) {
        markSuccess()
        // Alert.alert('提示', '这是当前版本第一次启动,是否要模拟启动失败?失败将回滚到上一版本', [
        //     { text: '是', onPress: () => { throw new Error('模拟启动失败,请重启应用') } },
        //     { text: '否', onPress: () => { markSuccess() } },
        // ]);
    } else if (isRolledBack) {
        Alert.alert('提示', '刚刚更新失败了,版本被回滚.');
    }
}
const doUpdate = async (info) => {
    try {
        const hash = await downloadUpdate(info);
        const { code } = info;
        if (code == 1) {
            /* 自动重启 */
            switchVersion(hash);
        } else {
            Alert.alert('提示', '下载完毕,是否重启应用?', [
                { text: '是', onPress: () => { switchVersion(hash); } },
                { text: '否', },
                { text: '下次启动时', onPress: () => { switchVersionLater(hash); } },
            ]);
        }
    } catch (err) {
        Alert.alert('提示', '更新失败.');
    }
}

const checkUpdateFun = async () => {
    if (__DEV__) {
        // 开发模式不支持热更新，跳过检查
        return;
    }
    let info;
    try {
        info = await checkUpdate(appKey);
    } catch (err) {
        console.warn(err);
        return;
    }
    if (info.expired) {
        Alert.alert('提示', '您的应用版本已更新,请点击“确认”下载新的版本', [
            { text: '确定', onPress: () => { info.downloadUrl && Linking.openURL(info.downloadUrl) } },
        ]);
    } else if (info.upToDate) {
        Alert.alert('提示', '您的应用版本已是最新.');
    } else if (info.update) {
        Alert.alert('提示', '检查到新的版本' + info.name + ',是否下载?\n' + info.description, [
            { text: '是', onPress: () => { doUpdate(info) } },
            { text: '否', }
        ]);
    }
};

export { initUpdate, checkUpdateFun }