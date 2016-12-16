/**
 * Created by itachi on 16/11/3.
 */

/*
 * 开发环境下，开启HttpRequestMock。
 * */
if (__DEV__) {
    require("../utils/HttpRequestMock.js");
}

let AppConfig = require("./AppConfig.js");

function sendRequest(url, parameters) {

    return new Promise(function (resolve, reject) {

        // initialize the form data
        // var formData = new FormData();
        // formData.append("key",JSON.stringify(parameters));
        // Object.assign(formData, parameters);
        var params = `key=${encodeURIComponent(JSON.stringify(parameters))}`;
        params = params.replace(/%20/g, '+');
        console.log(parameters);
        /*
         * initialize the xml http request level2
         * @discussion :
         * 1、there are two types of XMLHttpRequest,XmlHttpRequest level1 and XmlHttpRequest level2
         * 2、XmlHttpRequest level 1 is the old version,it can't send request across origin.
         * 3、XmlHttpRequest level 2 is the newest version,it can send request across origin and build formData with new interface.
         * */
        var client = new XMLHttpRequest();
        client.open('POST', url);
        client.onreadystatechange = handler;
        client.responseType = 'json';
        client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        client.send(params);

        function handler() {
            if (this.readyState !== 4) {
                return;
            }
            if (this.status === 200) {
                var responseObject;
                if (__DEV__) {
                    responseObject = JSON.parse(this.response);
                } else {
                    responseObject = this.response;
                }
                console.info(responseObject);
                if (responseObject.status == 0) {
                    resolve(responseObject.data);
                } else {
                    reject({level: 0, message: responseObject.message});
                }
            } else {
                console.info(this.statusText);
                reject({level: -1, message: "网络正在打盹，请稍后再试"});
            }
        }
    });
}

Object.keys(AppConfig.ApiConfig).map(key => Object.defineProperty(module.exports, key, {
        enumerable: false,
        get: () => parameters => sendRequest(AppConfig.ApiConfig[key], parameters)
    }
));


