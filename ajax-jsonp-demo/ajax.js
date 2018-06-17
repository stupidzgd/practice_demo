var myAjax = {
    jsonpAjax: function (param) {
        if (param.dataType && param.dataType ==='jsonp') {
            var isSameOrigin = true;

            //每次请求带上时间戳
            var callback = 'Jsonp' + new Date().getTime();
            var myUrl = window.location.href;
            var targetUrl = param.url;
            var myProtocol = myUrl.split('://')[0];
            var myHost = window.location.host;
            var targetProtocol = targetUrl.split('://')[0];
            var targetHost = targetUrl.split('://')[1];
            if(myProtocol === targetProtocol && myHost === targetHost) {
                isSameOrigin = true;
            } else {
                isSameOrigin = false;
            }
            if (isSameOrigin) {
                this.ajax(param.type, param.url, param.success, param.data, true);
            } else {
                window[callback] = param.success;
                var oScript = document.createElement('script');
                //判断传没传jsonp这个参数，如果有请求查询参数用这个值，如果没有默认用callback
                var src = param.url + '?' + param.data + '&' + (param.jsonp || 'callback') + '=' + callback;
                oScript.src = src;
                document.body.appendChild(oScript);
                document.body.removeChild(oScript);
            }
        } else {
            this.ajax(param.type, param.url, param.success, param.data, true);
        }
    },

    ajax: function (method, url, callback, data, flag) {
        var xhr = null;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new window.ActiveObject('Microsoft.XMLHTTP');
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    callback(xhr.responseText);
                }
            }
        }
        method = method.toUpperCase();
        if (method === 'GET') {
            var time = new Date().getTime();
            xhr.open(method, url + '?' + data + '?timer=' + time, flag);
            xhr.send();
        } else if (method === 'POST') {
            xhr.open(method, url, flag);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.send(data);
        }
    }
}




