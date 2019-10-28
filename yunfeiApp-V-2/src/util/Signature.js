/**
 * randomWord 随机数
 * encryptByDES 加密
 * decryptByDES 解密
 */

const CryptoJS = require("crypto-js");
const moment = require("moment");
// 加密
export const encryptByDES = (userid, password) => {
    /* 条件 */
    const SignatureNonce = randomWord(false, 32); //随机数
    const Time = new Date();
    const TimeStamp = moment(Time).format('YYYY-MM-DD') + 'T' + moment(Time).format('HH:mm:ss') + "Z";
    /* 生成 */
    const Text = `AccessKeyID=${userid}&SignatureNonce=${SignatureNonce}&TimeStamp=${TimeStamp}&Version=1.0`
    const key = CryptoJS.MD5(password).toString().substring(0, 8);
    const keyHex = CryptoJS.enc.Utf8.parse(key);
    const ivHex = CryptoJS.enc.Utf8.parse(null);
    encrypted = CryptoJS.DES.encrypt(CryptoJS.enc.Utf8.parse(Text), keyHex, {
        iv: ivHex,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return {
            SignatureNonce:SignatureNonce,
            TimeStamp:TimeStamp,
            Signature:CryptoJS.MD5(encrypted.ciphertext).toString()
        };
}
// 解密
export const decryptByDES = (ciphertext, key) => {
    const keyHex = CryptoJS.enc.Utf8.parse(key);
    const decrypted = CryptoJS.DES.decrypt({
        ciphertext: ciphertext
    }, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    console.log(ciphertext)
    const result_value = decrypted.toString();
    return result_value;
}
// 随机数
export const randomWord = (randomFlag, min, max) => {
    let str = "",
        range = min,
        pos = 0 ,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    //随机产生
    if (randomFlag) {
        range = Math.round(Math.random() * (max - min)) + min;
    }
    for (let i = 0; i < range; i++) {
        pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos]
    }
    return str;
}


/*

export const de = (ciphertext, key) => {
    var decipher = crypto.createDecipheriv('des-ecb', key, null);
    cipher.setAutoPadding(true)
    var txt = decipher.update(ciphertext, 'hex', 'utf8');
    txt += decipher.final('utf8');
    assert.equal(txt, plaintext, 'fail');
}

*/



// function decryptByDESModeEBC(ciphertext){
//     var keyHex = CryptoJS.enc.Utf8.parse(key);
//     var decrypted = CryptoJS.DES.decrypt({
//         ciphertext: CryptoJS.enc.Hex.parse(ciphertext)
//     }, keyHex, {
//         mode: CryptoJS.mode.ECB,
//         padding: CryptoJS.pad.Pkcs7
//     });
//     var result_value = decrypted.toString(CryptoJS.enc.Utf8);
//     return result_value;
// }


// var data1 = "AccessKeyID=userid&SignatureNonce=123456&TimeStamp=2016-02-23T12:46:24Z&Version=1.0";
// var password = 'password';
// var key1 = CryptoJS.MD5(password).toString().substring(0, 8);

// //加密内容、秘钥、向量
// function encryptByDES(message, key, iv) {
//     var keyHex = CryptoJS.enc.Utf8.parse(key);
//     var ivHex = CryptoJS.enc.Utf8.parse(iv);
//     encrypted = CryptoJS.DES.encrypt(CryptoJS.enc.Utf8.parse(message), keyHex, {
//         iv: ivHex,
//         mode: CryptoJS.mode.ECB,
//         padding: CryptoJS.pad.Pkcs7
//     }
//     );
//     return encrypted.ciphertext;
// }

// var s = encryptByDES(data1, key1, null)

// // dbc37898370c39b83fd1283233d81a7d
// console.log("end: " + CryptoJS.MD5(s));
