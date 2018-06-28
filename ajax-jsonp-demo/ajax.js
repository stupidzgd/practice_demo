var myAjax = {
  jsonp: function (params) {
    if (params.dataType === 'jsonp') {
      //每次请求带上时间戳
      var callback = 'Jsonp' + new Date().getTime();
      var isSameOrigin = this.hasSameOrigin(params.url);
      if (!isSameOrigin) {
        window[callback] = params.success;
        //判断传没传jsonp这个参数，如果有请求查询参数用这个值，如果没有默认用callback
        var src = params.url + '?' + params.data + '&' + (params.jsonp || 'callback') + '=' + callback;
        var oScript = document.createElement('script');
        oScript.src = src;
        document.body.appendChild(oScript);
        document.body.removeChild(oScript);
      } else {
        this.ajax(params.method, params.url, params.success, params.data, true);
      }
    } else {
      this.ajax(params.method, params.url, params.success, params.data, true);
    }
  },

  hasSameOrigin: function (url) {
    var hostUrl = window.location.href;
    var myProtocol = hostUrl.split('://')[0];
    var myPort = window.location.port;
    var myHost = window.location.host;
    if (myPort) {
      myHost = window.location.host.split(':')[0];
    }
    var targetProtocol = url.split('://')[0];
    var targetHost = url.split('://')[1].split('/')[0];
    var targetPort = '';
    if (targetHost.indexOf(':') != -1) {
      targetPort = targetHost.split(':')[1];
      targetHost = targetHost.split(':')[0];
    }
    if (targetHost === myHost && targetProtocol === myProtocol && targetPort === targetPort) {
      return true;
    } else {
      return false;
    }
  },

  ajax: function (method, url, callback, data, flag) {
    var xhr = null;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else {
      xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        callback(xhr.responseText);
      }
    }
    method = method.toUpperCase();
    if (method == 'POST') {
      xhr.open(method, url, flag);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.send(data);
    } else if (method == 'GET') {
      var timer = new Date().getTime();
      xhr.open(method, url + '?' + data + '&timer=' + timer);
      xhr.send();
    }
  }
}