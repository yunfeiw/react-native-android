/**
 * date:2019/1024
 * description:获取规则接口
 * author:yunfei
 */

import xml2js from 'react-native-xml2js';
import { _http, Version } from '../config/index';
import { post, objparams } from '../util/Fetch';
import { encryptByDES } from '../util/Signature';
import AsyncStorage from '@react-native-community/async-storage';
//解析
let parser = new xml2js.Parser({ explicitArray: false });
export const getRule =() => {
  return new Promise( async(reslove, rejects) => {
    const user_info = JSON.parse(await AsyncStorage.getItem('userInfo'));
    const { name, password } = user_info;
    const { SignatureNonce, TimeStamp, Signature } = encryptByDES(name, password);

    post(`${_http}smsAnalysisRuleController/getAppAnalysisRule?${objparams({
      AccessKeyID: name,
      Signature: Signature,
      SignatureNonce: SignatureNonce,
      TimeStamp: TimeStamp,
      Version: Version
    })}`).then((response) => {
      if (response.status == 200) {
        return response.json();
      }
    }).then((resjson) => {
      if (resjson.Code == 200) {
        parser.parseString(resjson.Data, async (err, result) => {
          if (!err) {
            reslove(result['Root']['TaskSet']['Task']);
            // 保存
            await AsyncStorage.setItem('rule', JSON.stringify(result['Root']['TaskSet']['Task']));
          }
        });
      }
    }).catch((error) => {
      rejects(error);
    });
  });

}