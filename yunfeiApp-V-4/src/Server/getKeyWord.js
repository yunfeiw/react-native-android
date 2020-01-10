/**
 * description:获取关键字接口
 * author：yunfei
 * time:19/12/17
 */
import { _http, Version } from '../config/index';
import { post, objparams } from '../util/Fetch';
import { encryptByDES } from '../util/Signature';
import AsyncStorage from '@react-native-community/async-storage';
export const getKeyWord = () => {
    return new Promise(async (reslove, rejects) => {
        const user_info = JSON.parse(await AsyncStorage.getItem('userInfo'));
        const { name, password } = user_info;
        const { SignatureNonce, TimeStamp, Signature } = encryptByDES(name, password);

        post(`${_http}smsAnalysisRuleController/selectExcludeApp?${objparams({
            AccessKeyID: name,
            Signature: Signature,
            SignatureNonce: SignatureNonce,
            TimeStamp: TimeStamp,
            Version: Version
        })}`).then((response) => {
            if (response.status == 200) {
                return response.json();
            }
        }).then( async (resjson) => {
            console.log('关键字',resjson)
            if (resjson.Code == 200) {
                // 保存
                reslove(resjson['Data']);
                await AsyncStorage.setItem('keyword', resjson['Data']);
            }
        }).catch((error) => {
            rejects(error);
        });
    });

}