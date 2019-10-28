/**
 * date:2019/10/24
 * description:登录
 * author:yunfei
 * params:{
 * 
 * }
 */
import { post, objparams } from '../util/Fetch';
import { _http, Version } from '../config/index';
import { encryptByDES } from '../util/Signature';

export const login = (name, password, PhoneNum) => {
    return new Promise((reslove, rejects) => {
        // 生成签名
        const { SignatureNonce, TimeStamp, Signature } = encryptByDES(name, password);
        post(`${_http}declareAppSmsLogin/smsAppLogin?${objparams({
            AccessKeyID: name,
            Signature: Signature,
            SignatureNonce: SignatureNonce,
            TimeStamp: TimeStamp,
            Version: Version
        })}`, JSON.stringify({ PhoneNum: PhoneNum })).then(
            (response) => {
                if (response.status == 200) {
                    return response.json()
                }
            }
        ).then((resjson) => {
            reslove(resjson);
        }).catch((error) => {
            rejects(error)
        });
    });
}