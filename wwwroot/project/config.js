//配置
var MyConfig = {
  allCameraUrl: "http://192.168.56.1:8015/api/camera/cameras/all/test", //获取所有监控点资源
  matchUrl: "http://192.168.56.1:8015/api/face/capture/test", //以图搜图
  matchAllUrl: "http://192.168.56.1:8015/api/face/capture/test/all",
  baseUrl: "http://192.168.56.1:8015",
  getAllCameraUrl: function () {
    if (this.allCameraUrl.indexOf("http") < 0) {
      return this.baseUrl + "/" + this.allCameraUrl;
    }
    return this.allCameraUrl;
  },
  getMatchUrl: function () {
    if (this.matchUrl.indexOf("http") < 0) {
      return this.baseUrl + "/" + this.matchUrl;
    }
    return this.matchUrl;
  },
  getMatchAllUrl: function () {
    if (this.matchAllUrl.indexOf("http") < 0) {
      return this.baseUrl + "/" + this.matchAllUrl;
    }
    return this.matchAllUrl;
  },
  mapToMatch: function (list) {
    list = list.map(function (item) {
      var time = item.captureTime;
      time = time.replace("+08:00", "").replace("T", " ");
      var pointIndex = time.indexOf(".");
      if (pointIndex >= 0) time = time.substr(0, pointIndex);
      return {
        similarity: item.similarity,
        time: time,
        name: item.cameraName,
        url: item.facePicUrl,
        id: item.cameraIndexCode,
        area: item.area,
      };
    });
    return list;
  },
};
