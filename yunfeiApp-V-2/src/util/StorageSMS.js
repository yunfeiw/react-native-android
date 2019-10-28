/**
 * date:2019/10/24
 * desciption：短信存、取、重置
 * author:yunfei
 * params:{
 *  sms: string 短信
 * }
 */
import AsyncStorage from '@react-native-community/async-storage';
const moment = require("moment");
const N_SMS = 'SMSlist';

const WriteSMS = async (sms) => {
    // 写入前判断当前是否存在该短信
   await AsyncStorage.setItem(N_SMS, sms);
}

const GetSMS = () => {
    return new Promise((res, rej) => {
        AsyncStorage.getItem(N_SMS).then(list => {
            let sms_list = list ? JSON.parse(list) : [];
            let Time = new Date(moment(new Date()).format('YYYY-MM-DD')).getTime();
            let new_sms_list = [];
            sms_list.map((e, i) => {
                if (e.time > Time) {
                    new_sms_list.push(e);
                }
            });
            // 重新保存短信数据
            WriteSMS(JSON.stringify(new_sms_list));
            // 返回删选后的数据
            res(JSON.parse(list));
        });
    })
}


export { WriteSMS, GetSMS }