/**
 * @description:短信规则校验
 * @author:yunfei
 * @time 2019/10/24
 * @param {
 *  str: string 被校验短信
 *  cd:成功回调
 * }
 */
import AsyncStorage from '@react-native-community/async-storage';
import ValidKeyWord from './Keywords';
export const ValidateSms = async (str, cb) => {
    await AsyncStorage.getItem('rule').then(res => {
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
                            console.log('匹配规则：' + i, e.FilterTitle)
                            // 默认则不显示
                            if (e.FilterTitle != '') {
                                cb(true);
                            } else {
                                // ValidKeyWord(str, (flag) => {
                                    // if (!flag) {
                                        cb(false);
                                    // }
                                // })
                            }
                            return
                        }
                    }
                }
            }
        }
    });
};