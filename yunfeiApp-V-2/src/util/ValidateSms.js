/**
 * date:2019/10/24
 * description:短信规则校验
 * author:yunfei
 * 
 * params:{
 *  str: string 被校验短信
 *  cd:成功回调
 * }
 */
import AsyncStorage from '@react-native-community/async-storage';
// import { Alert } from 'react-native';
export const ValidateSms = async (str, cb) => {
    await AsyncStorage.getItem('rule').then(res => {
        // console.log(res)
        if (res) {
            let arr = JSON.parse(res);
            for (let i = 0, len = arr.length; i < len; i++) {
                let e = arr[i];
                // 配置标题
                if (str.indexOf(e.FilterTitle) != -1) {
                    //匹配验证码
                    var reg = new RegExp(e.FilterRule.replace('^', ''), 'g');
                    if (reg.test(str)) {
                        var start = e.BeginNum || 0;
                        var end = e.EndNum || 4;
                        if (str.match(reg).join('').substring(start, end).length >= (end - start)) {
                            console.log( '匹配规则：'+i,e.FilterTitle)
                            // 默认则不显示
                            if(e.FilterTitle != ''){
                                cb(true);
                            }else {
                                cb(false);
                            }
                            return
                        }
                    }
                }
            }
        } else {
            // 无规则；用户手动刷新
            // Alert.alert(
            //     '提示:',
            //     '用户你好，当前APP尚未获取‘税局短信校验规则’；请您到‘我的’界面，点击税局规则，重新刷新数据规则！^_^',
            //     [{ text: '确认', onPress: () => { } }],
            //     { cancelable: false }
            // )
        }
    });
};