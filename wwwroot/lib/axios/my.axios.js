function myAxios(url, data, vue) {
  this.post = function () {
    axios.post(url, data).then(function (response) {
      if (!response.data.status) {
        vue.$Message.error(response.data.message);
      }
    });
  };
}

jQuery.extend({
  axios: function (url, params, method, contentType) {
    method = method || "get";
    contentType = contentType || "application/json";
    var _self = this;
    var methodLower = method.toLowerCase();

    // if (url.indexOf("http") < 0) {
    //   url = getFullPath(url);
    // }
    if (methodLower == "get" || methodLower == "delete") {
      if (params != null) {
        var getParams = "";
        for (x in params) {
          var name = x;
          var value = params[x];
          getParams += "&" + x + "=" + value;
        }
        url += "?" + getParams.trim("&");
      }
    }
    axios.interceptors.request.use(
      function (config) {
        config.headers["Content-Type"] = contentType;
        config.headers["X-Requested-With"] = "XMLHttpRequest";

        if (config.method === "post") {
          if (config.data != null) {
            config.data.date = Date.parse(new Date());
          } else {
            config.data = {
              date: Date.parse(new Date()),
            };
          }
        } else if (config.method === "get") {
          if (config.params != null) {
            config.params.date = Date.parse(new Date());
          } else {
            config.params = {
              date: Date.parse(new Date()),
            };
          }
        }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
    axios.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        var msg = "";
        if (error && error.response) {
          switch (error.response.status) {
            case 400:
              console.log("错误请求");
              msg = "错误请求";
              break;
            case 401:
              console.log("未授权，请重新登录");
              msg = "未授权，请重新登录";
              break;
            case 403:
              console.log("拒绝访问");
              msg = "拒绝访问";
              break;
            case 404:
              console.log("请求错误,未找到该资源");
              msg = "请求错误,未找到该资源";
              break;
            case 405:
              console.log("请求方法未允许");
              msg = "请求方法未允许";
              break;
            case 408:
              console.log("请求超时");
              msg = "请求超时";
              break;
            case 500:
              console.log("服务器端出错");
              msg = "服务器端出错";
              break;
            case 501:
              console.log("网络未实现");
              msg = "网络未实现";
              break;
            case 502:
              console.log("网络错误");
              msg = "网络错误";
              break;
            case 503:
              console.log("服务不可用");
              msg = "服务不可用";
              break;
            case 504:
              console.log("网络超时");
              msg = "网络超时";
              break;
            case 302:
              msg = "登录失效";
              break;
            case 505:
              console.log("http版本不支持该请求");
              msg = "http版本不支持该请求";
              break;
            default:
              console.log("连接错误" + err.response.status);
              msg = "连接错误" + err.response.status;
              break;
          }
        } else {
          console.log("连接服务器失败");
          msg = "连接服务器失败";
        }
        // _self.$Message.error(msg);
        MsgBoxAlert(msg);
        return Promise.resolve(error.response);
      }
    );
    if (params == null) {
      params = {
        date: Date.parse(new Date()), //加入时间戳
      };
    } else {
      params.date = Date.parse(new Date());
    }
    return new Promise(function (resolve, reject) {
      // vue.$Loading.start();
      axios({
        url: url,
        method: method,
        type: "application/json",
        data: params,
      })
        .then(function (response) {
          var data = response.data;
          if (typeof data == "string") {
            if (data.indexOf("html") >= 0) {
              MsgBoxAlert("登录失效");
              return;
            }
          }
          if (response.data != null && !response.data.success) {
            // vue.$Loading.error();
            var message = response.data.message || "操作失败";
            if (message != null) {
              MsgBoxAlert(message);
            }
          }
          if (response.data.success) {
            // vue.$Loading.finish();
            resolve(response);
          }
        })
        .catch(function (error) {
          // vue.$Loading.error();
          reject(error);
        });
    });
  },
});
