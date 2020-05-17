/**
 * @description：关键字，用于检验当前短信是否符合规则
 * @author：yunfei
 * @time ：19/12/17
 * @param {
 *   sms: 短信
 *   cb: 回调 true 存在关键字 false 不存在关键字
 * }
 */
import AsyncStorage from '@react-native-community/async-storage';
export default async (sms,cb) => {
    await AsyncStorage.getItem('keyword').then(res => {
        console.log(res)
        if (res) {
            let arr = res.split(',');
            const flag = arr.some(e => {
                if (sms.indexOf(e) != -1) {
                    return e
                }
            });
            console.log('短信内容',sms)
            console.log('短信是否存在关键字',flag)
            cb(flag); 
        }
    })
}