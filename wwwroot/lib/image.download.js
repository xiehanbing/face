// 图片下载
var MyImageDownload = {
  download: function (item, name) {
    var time = new Date();

    let triggerDelay = 100;

    let removeDelay = 1000;
    var list = [item];
    for (var j = 0; j < list.length; j++) {
      //   console.log(list[j]);
      var items = list[j];
      if (items.indexOf("data") == 0) {
        this.downloadImgByBase64(items, name);
      } else if (items.indexOf("http") < 0) {
        this.downloadBlob(items, name);
      } else this.createIFrame(list[j], j * triggerDelay, removeDelay, name);
    }
  },
  createIFrame: function (url, triggerDelay, removeDelay, name) {
    //动态添加iframe，设置src，然后删除
    setTimeout(function () {
      var frame = $(
        '<iframe style="display: none;" class="multi-download"></iframe>'
      );

      frame.attr("src", url);

      $(document.body).after(frame);

      setTimeout(function () {
        frame.remove();
      }, removeDelay);
    }, triggerDelay);
  },
  downloadBlob: function (url, name) {
    var img = new Image();
    img.src = url;
    // 如果浏览器支持msSaveOrOpenBlob方法（也就是使用IE浏览器的时候），那么调用该方法去下载图片
    if (window.navigator.msSaveOrOpenBlob) {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      // 将img中的内容画到画布上
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      var blob = canvas.msToBlob();
      window.navigator.msSaveOrOpenBlob(blob, name + "." + "png");
    } else {
      img.onload = function () {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        // 将img中的内容画到画布上
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        // 将画布内容转换为Blob
        canvas.toBlob(function (blob) {
          // blob转为同源url
          var blobUrl = window.URL.createObjectURL(blob);
          // 创建a链接
          var a = document.createElement("a");
          a.href = blobUrl;
          a.download = "" + name + ".png";
          // 触发a链接点击事件，浏览器开始下载文件
          //document.body.appendChild(a);
          a.click();
          // 然后移除
          // document.body.removeChild(a);
        });
      };
      img.src = url;
      // 必须设置，否则canvas中的内容无法转换为blob
      img.setAttribute("crossOrigin", "Anonymous");
    }
  },
  downloadImgByBase64: function (url, name) {
    var imgUrl = url;
    // 如果浏览器支持msSaveOrOpenBlob方法（也就是使用IE浏览器的时候），那么调用该方法去下载图片
    if (window.navigator.msSaveOrOpenBlob) {
      var bstr = atob(imgUrl.split(",")[1]);
      var n = bstr.length;
      var u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      var blob = new Blob([u8arr]);
      window.navigator.msSaveOrOpenBlob(blob, name + "." + "png");
    } else {
      var img = new Image();
      img.onload = function () {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        // 将img中的内容画到画布上
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        // 将画布内容转换为base64
        var base64 = canvas.toDataURL();
        // 创建a链接
        var a = document.createElement("a");
        a.href = base64;
        a.download = "" + name + ".png";
        document.body.appendChild(a);
        // 触发a链接点击事件，浏览器开始下载文件
        a.click();
        document.body.removeChild(a);
      };
      img.src = url;
      // 必须设置，否则canvas中的内容无法转换为base64
      img.setAttribute("crossOrigin", "Anonymous");
    }
  },
};
