import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Linking,
    Platform,
    StyleSheet,
    ToastAndroid,
} from 'react-native';

import {
    isFirstTime,
    isRolledBack,
    checkUpdate,
    downloadUpdate,
    switchVersion,
    // switchVersionLater,
    markSuccess,
} from 'react-native-update';

import { ModalAlert } from '../../components/Alert/index';
import { ButtonOpacity } from '../../components/Button/index'
import SizeUtil from '../../util/SizeUtil';

import uploadpg from '../../assets/img/upload.png';

import _updateConfig from '../../../update.json';
const { appKey } = _updateConfig[Platform.OS];

class UploadApp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            update1: false,
            update2: false,
            info: {
                name: '',
                description: '',
                downloadUrl: ''
            }
        }
    }

    componentDidMount() {
        this.initUpdate();
        this.checkUpdateFun();
    }
    initUpdate = () => {
        if (isFirstTime) {
            markSuccess();
        } else if (isRolledBack) {
            ToastAndroid.show('刚刚更新失败了,版本被回滚', ToastAndroid.SHORT);
        }
    }
    doUpdate = async (info) => {
        try {
            const hash = await downloadUpdate(info);
            const { code } = info;
            this.setState({ update2: false })
            if (code == 1) {
                /* 自动重启 */
                switchVersion(hash);
            } else {
                switchVersion(hash);    // 立即重启
                //switchVersionLater(hash) // 下次启动时
            }
        } catch (err) {
            ToastAndroid.show('更新失败,请联系管理员', ToastAndroid.SHORT);
            this.setState({ update2: false });
        }
    }

    checkUpdateFun = async () => {
        if (__DEV__) {
            // 开发模式不支持热更新，跳过检查
            return;
        }
        let info;
        try {
            info = await checkUpdate(appKey);
            this.setState({ info });
        } catch (err) {
            ToastAndroid.show(err, ToastAndroid.SHORT);
            return;
        }
        if (info.expired) {
            this.setState({ update1: true });
        } else if (info.upToDate) {
            ToastAndroid.show('您的应用版本已是最新', ToastAndroid.SHORT);
        } else if (info.update) {
            this.setState({ update2: true });
        }
    }
    // 下载new package
    downNewApp() {
        const { info } = this.state;
        info.downloadUrl && Linking.openURL(info.downloadUrl);
        info.downloadUrl || ToastAndroid.show('下载失败，新版尚未发布，请联系管理员及时发布', ToastAndroid.SHORT);
        this.setState({ update1: false });
    }
    // 开始下载
    startDownloading() {
        const { info } = this.state;
        this.doUpdate(info);
    }
    render() {
        const { info, update1, update2 } = this.state
        return (
            <View>
                <ModalAlert visible={update1}>
                    <View style={styles.container}>
                        <Image
                            style={styles.container_img}
                            source={uploadpg}
                        />
                        <Text style={styles.container_describe}>
                            您的应用版本已更新
                        </Text>
                        <Text style={styles.container_describe}>
                            请点击“确认”下载新的版本
                        </Text>
                        <ButtonOpacity
                            type='primary'
                            activeOpacity={0.7}
                            style={styles.container_btn}
                            onPress={() => this.downNewApp()}>
                            <Text style={{ color: '#fff' }}>
                                确定
                            </Text>
                        </ButtonOpacity>
                    </View>
                </ModalAlert>
                <ModalAlert visible={update2}>
                    <View style={styles.container}>
                        <Image
                            style={styles.container_img}
                            source={uploadpg}
                        />
                        <Text style={styles.container_describe}>
                            检查到新的版本{info.name}
                        </Text>
                        <Text style={styles.container_describe}>
                            版本信息：{info.description}
                        </Text>
                        <ButtonOpacity
                            type='primary'
                            activeOpacity={0.7}
                            style={styles.container_btn}
                            onPress={() => this.startDownloading()}>
                            <Text style={{ color: '#fff' }}>
                                开始下载
                            </Text>
                        </ButtonOpacity>
                    </View>
                </ModalAlert>
            </View>
        )
    }
}
export default UploadApp

const styles = StyleSheet.create({
    container: {
        width: SizeUtil.autoWidth(180),
    },
    container_img: {
        marginBottom: 10,
        width: SizeUtil.autoWidth(180),
        height: SizeUtil.autoheight(100),
    },
    container_describe: {
        textAlign: 'center',
        fontSize: SizeUtil.setSpText(12)
    },
    container_btn: {
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
    }
})