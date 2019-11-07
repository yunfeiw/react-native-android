/**
 * date:2019/10/24
 * description: 请求方法
 * author：yunfei
 * 
 * methed
 *  get,
 *  post,
 *  objparams,参数拼接 将对象拼接成 key1=val1&key2=val2&key3=val3 的字符串形式
 */
const get = (url) => {
    let result = fetch(url, {
        // credentials: 'include',
        // headers: {
        //     'Access-Control-Allow-Origin': '*',
        //     'Accept': 'application/json, text/plain, */*'
        // },
        // // 设置允许cors跨域
        // mode: 'cors'
    });
    return result;
}

const post = (url, paramsObj) => {
    let result = fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: paramsObj
    });

    return result;
}
const objparams = (obj) => {
    let result = '';
    let item;
    for (item in obj) {
        result += '&' + item + '=' + obj[item];
    }
    if (result) {
        result = result.slice(1);
    }
    return result;
}

export { get, post, objparams }