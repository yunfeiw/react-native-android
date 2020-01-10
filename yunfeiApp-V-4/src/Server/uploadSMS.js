/**
 * date:2019/10/24
 * description:上传短信
 * author:yunfei
 * params:{
 *  sms：string 提交短信
 * }
 *
 */

const moment = require("moment");
import { _http, Version } from '../config/index';
import { post, objparams } from '../util/Fetch';
import { encryptByDES } from '../util/Signature';
import AsyncStorage from "@react-native-community/async-storage";

export const uploadSMS = (sms) => {
    // console.log('短信内容：',sms)
    let SMS = JSON.parse(sms);
    return new Promise( async (resolve, reject) => {
        const user_info = JSON.parse(await AsyncStorage.getItem('userInfo'));
        const { name, password, PhoneNum } = user_info;
        const { SignatureNonce, TimeStamp, Signature } = encryptByDES(name, password);

        post(`${_http}declareReceiveSms/receiveAppSms?${objparams({
            AccessKeyID: name,
            Signature: Signature,
            SignatureNonce: SignatureNonce,
            TimeStamp: TimeStamp,
            Version: Version
        })}`, JSON.stringify({
            SendType: "2",
            PhoneNum: PhoneNum,
            SmsInfo: SMS['mess'],
            SendTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        })).then((response) => {
            if (response.status == 200) {
                return response.json()
            }
        }).then((resjson) => {
            // 返回
            resolve(resjson)
        }).catch((error) => {
            // 返回
            reject(error);
        });
    });
}
