function changeZoom(zoomInput) {
  var width = $(window).width();
  var height = $(window).height();
  var w = $("#container").width();
  var h = $("#container").height();
  var zoom = Math.min(width / w, height / h);
  //if (zoomInput) {
  //    zoom += zoomInput;
  //}
  //console.log(zoom);
  var left = (width - w * zoom) / 2;
  //var left = width/2 - w * zoom;
  var top = (height - h * zoom) / 2;
  //console.log("left:" + left + ";right:" + top);

  //$("#container").css("left", pixels(left)).css("top", pixels(top)).css("transform", zoom);

  //$("#container").css("zoom", zoom);
  var ieVersion = IEVersion();
  if (ieVersion != -1 && ieVersion != "edge") {
    $("#container")
      .css("left", pixels(left))
      .css("top", pixels(top))
      .css({
        transform: "scale(" + zoom + ")",
        "transform-origin": "left top",
      });
  } else {
    $("#container")
      .css("left", pixels(left))
      .css("top", pixels(top))
      .css("zoom", zoom)
      .css("-moz-transform", "scale(" + zoom + ")")
      .css("transform-origin", "left top");
  }

  if ($("#backDivImage-show") != null) {
    console.log($("#backDivImage-show").width());
    var backImgLeft = (width - $("#backDivImage-show").width() * zoom) / 2;

    //var backImgSize = getImageSize($('#backDivImage-show').attr('src'));
    //var backImgLeft = (width - backImgSize.width * zoom) / 2;
    //console.log(backImgSize);
    $("#backDivImage-show").css("left", pixels(backImgLeft));
  }
}

function dialogChangeZoom() {
  var width = $(window).width();
  var height = $(window).height();
  var hasdlg_iframe = $("#dlg_iframe").length > 0;
  if (hasdlg_iframe) {
    w = $("#dlg_iframe").width();
    h = $("#dlg_iframe").height();
  }

  var zoom = Math.min(width / w, height / h);
  //console.log(zoom);
  var left = (width - w * zoom) / 2;
  var top = (height - h * zoom) / 2;
  if (hasdlg_iframe) {
    // $("#dlg_iframe")
    //   .css("zoom", zoom)
    //   .css("-moz-transform", "scale(" + zoom + ")")
    //   .css("transform-origin", "left top")
    //   .css({
    //     left: left + "px",
    //     top: top + "px",
    //   });
    var ieVersion = IEVersion();
    if (ieVersion != -1 && ieVersion != "edge") {
      $("#dlg_iframe")
        .css("left", left + "px")
        .css("top", top + "px")
        .css({
          transform: "scale(" + zoom + ")",
          "transform-origin": "left top",
        });
    } else {
      $("#dlg_iframe")
        .css("left", left + "px")
        .css("top", top + "px")
        .css("zoom", zoom)
        .css("-moz-transform", "scale(" + zoom + ")")
        .css("transform-origin", "left top");
    }
  }
}
function pixels(n) {
  return String(n) + "px";
}

window.onresize = function () {
  changeZoom();
  dialogChangeZoom();
};
var currentChangeZoom = 0;
function mouseWheelHandler(event) {
  var type = event.type;
  if (type == "DOMMouseScroll" || type == "mousewheel") {
    //event.delta = (event.originalEvent.wheelDelta) ? event.originalEvent.wheelDelta / 120 : -(event.detail || 0) / 3;
    currentChangeZoom += event.originalEvent.wheelDelta / 2 / 100;
    event.delta = event.originalEvent.wheelDelta / 2;
  }

  changeZoom(currentChangeZoom);
}

function addShiftChangeZoom() {}
$(window).load(function () {
  changeZoom();
  dialogChangeZoom();
  //bindDocumntMove($('#container'));
});
//判断ie 版本
function IEVersion() {
  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  var isIE =
    userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
  var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
  var isIE11 =
    userAgent.indexOf("Trident") > -1 && userAgent.indexOf("rv:11.0") > -1;
  if (isIE) {
    var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    reIE.test(userAgent);
    var fIEVersion = parseFloat(RegExp["$1"]);
    if (fIEVersion == 7) {
      return 7;
    } else if (fIEVersion == 8) {
      return 8;
    } else if (fIEVersion == 9) {
      return 9;
    } else if (fIEVersion == 10) {
      return 10;
    } else {
      return 6; //IE版本<=7
    }
  } else if (isEdge) {
    return "edge"; //edge
  } else if (isIE11) {
    return 11; //IE11
  } else {
    return -1; //不是ie浏览器
  }
}

function bindDocumntMove($element) {
  $element.mousedown(function (e) {
    var positionDiv = $element.offset();
    var distenceX = e.pageX - positionDiv.left;
    var distenceY = e.pageY - positionDiv.top;
    documentMoveHandle($element, distenceX, distenceY);
  });
  $(document).mouseup(function () {
    $(document).off("mousemove");
  });
  $(document).mouseout(function () {
    $(document).off("mousemove");
  });
}

function documentMoveHandle($element, distenceX, distenceY) {
  $(document).mousemove(function (e) {
    var x = e.pageX - distenceX;
    var y = e.pageY - distenceY;
    //if (x < 0) {
    //    x = 0;
    //}
    //else if(x>$element.width())
    //else if (x > $(document).width() - $element.outerWidth(true)) {
    //    x = $(document).width() - $element.outerWidth(true);
    //}

    //if (y < 0) y = 0;
    //else if (y > $(document).height() - $element.outerWidth(true))
    //    y = $(document).height() - $element.outerHeight(true);

    $element.css({
      left: x + "px",
      top: y + "px",
    });
  });
}
