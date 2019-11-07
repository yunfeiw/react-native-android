/* ---登录请求 案例--- */

// fetch(`http://172.18.9.91:8093/declareports/declareAppSmsLogin/smsLogin?AccessKeyID=${userid}&Signature=${Signature}&SignatureNonce=${SignatureNonce}&TimeStamp=${TimeStamp}&Version=1.0`, {
// fetch(`${_http}declareAppSmsLogin/smsAppLogin?AccessKeyID=${userid}&Signature=${Signature}&SignatureNonce=${SignatureNonce}&TimeStamp=${TimeStamp}&Version=1.0`, {
//     method: 'POST',
//     headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ PhoneNum: PhoneNum })
// }).then(
//     (response) => {
//         console.log(response)
//         return response.json()
//     }
// ).then((resjson) => {
//     console.log(resjson)
// }).catch((error) => {
//     console.log('err', error);
// });



/* 
存储内容
AsyncStorage:
{
    userToken： 'abc', //登录状态
    userInfo :{
        name:'',    //登录名
        password:'', //登录密码
    },
    Rule:[]             //匹配规则
}

/* 
    短信监听
    
    oppo类型手机修改短信广播接口；需要做兼容

        <action android:name="android.provider.Telephony.SMS_RECEIVED">
        </action>
        <!-- 兼容oppo手机 -->
        <action android:name="android.provider.OppoSpeechAssist.SMS_RECEIVED">
        </action>

*/



/* 将短信存储 */

// AsyncStorage.setItem('SMSlist', JSON.stringify(
//   [1, 2, 3, 4, 5, 6, 7, 8].map((e, i) => {
//     return {
//       _id: e + '_id',
//       thread_id: e + 'thread_id',
//       num: e + 'num',
//       mess: e + 'mess',
//       date: e + 'date',
//       time: e + 'time',
//       Code: 200, //提交状态
//       Message: e + 'Message', //上传失败描述
//     }
//   })
// ));


/* 

RN内的input在android内会自带padding

*/