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
        var formData = new FormData();
        Object.assign(formData, parameters);

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
        client.setRequestHeader('Accept', 'application/json');
        client.send(formData);

        function handler() {
            if (this.readyState !== 4) {
                return;
            }
            if (this.status === 200) {
                const responseObject = JSON.parse(this.response);
                console.info(responseObject);
                if (responseObject.status == 1) {
                    resolve(responseObject.data);
                } else {
                    reject("this must be server error!");
                }
            } else {
                reject(new Error(this.statusText));
            }
        }
    });
}

Object.keys(AppConfig.ApiConfig).map(key => Object.defineProperty(module.exports, key, {
        enumerable: false,
        get: () => parameters => sendRequest(AppConfig.ApiConfig[key], parameters)
    }
));


