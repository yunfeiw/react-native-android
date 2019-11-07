var CryptoJS = require("crypto-js");
var data1 = "AccessKeyID=userid&SignatureNonce=123456&TimeStamp=2016-02-23T12:46:24Z&Version=1.0";
var password = 'password';
var key1 = CryptoJS.MD5(password).toString().substring(0, 8);

console.log(key1)
//加密内容、秘钥、向量
function encryptByDES(message, key, iv) {
    var keyHex = CryptoJS.enc.Utf8.parse(key);
    var ivHex = CryptoJS.enc.Utf8.parse(iv);
    encrypted = CryptoJS.DES.encrypt(CryptoJS.enc.Utf8.parse(message), keyHex, {
        iv: ivHex,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    }
    );
    return encrypted.ciphertext;
}

var s = encryptByDES(data1, key1, null)

// dbc37898370c39b83fd1283233d81a7d
console.log("end: " + CryptoJS.MD5(s));
