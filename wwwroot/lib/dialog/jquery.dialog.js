// 弹框
var titleWidth = 280;
function showDialog(url, title, width, height) {
  if (
    width != null &&
    width != undefined &&
    typeof width == "string" &&
    width.constructor == String &&
    width.indexOf("px") >= 0
  ) {
    width = parseFloat(width.replace(/px/g, ""));
  }

  if (
    height != null &&
    height != undefined &&
    typeof height == "string" &&
    height.constructor == String &&
    height.indexOf("px") >= 0
  ) {
    height = parseFloat(height.replace(/px/g, ""));
  }

  if (!width || width > $(window).width() - 60) width = $(window).width() - 60;
  if (!height || height > $(window).height() - 60)
    height = $(window).height() - 60;
  var marginLeft = 0;
  if (width > titleWidth) {
    //titleWidth = 280;
    marginLeft = width / 2 - titleWidth / 2;
  } else {
    titleWidth = width;
  }
  $(".ui-dialog-title")
    .css("margin-left", marginLeft + "px")
    .css("width", titleWidth + "px");

  $("#dlg_iframe").attr("src", url);
  $("#dlg")
    .dialog("option", "title", title)
    .dialog("option", "width", width)
    .dialog("option", "height", height)
    .dialog("open");
}

function closeDialog(refresh) {
  $("#dlg").dialog("close");
  $("#dlg_iframe").attr("src", "");
  if (refresh) {
    if ($("#btnRefresh").length > 0) $("#btnRefresh").clickEx();

    if ($("#lbRefresh").length > 0) $("#lbRefresh").clickEx();
  }
}

function closeDialog2() {
  $("#dlg").dialog("close");
  $("#dlg_iframe").attr("src", "");
}

function isDialogShow() {
  return $("#dlg").dialog("isOpen");
}

$(document).ready(function () {
  $(
    '<div id="dlg" style="overflow:hidden;"><iframe id="dlg_iframe" frameborder="0" scrolling="auto" style="width:100%;height:100%;margin:0px;padding:0px;"></iframe></div>'
  )
    .appendTo($("body"))
    .dialog({
      autoOpen: false,
      modal: true,
    });
});
$(window).resize(function () {
  var width = $(".ui-dialog").width();
  var marginLeft = 0;
  if (width > titleWidth) {
    //titleWidth = 280;
    marginLeft = width / 2 - titleWidth / 2;
  } else {
    titleWidth = width;
  }
  $(".ui-dialog-title")
    .css("margin-left", marginLeft + "px")
    .css("width", titleWidth + "px");
});
$(window).resize(function () {
  var width = $(".ui-dialog").width();
  var marginLeft = 0;
  if (width > titleWidth) {
    //titleWidth = 280;
    marginLeft = width / 2 - titleWidth / 2;
  } else {
    titleWidth = width;
  }
  $(".ui-dialog-title")
    .css("margin-left", marginLeft + "px")
    .css("width", titleWidth + "px");
});

function showDialog2($element, title, width, height) {
  if (
    width != null &&
    width != undefined &&
    typeof width == "string" &&
    width.constructor == String &&
    width.indexOf("px") >= 0
  ) {
    width = parseFloat(width.replace(/px/g, ""));
  }
  if (
    height != null &&
    height != undefined &&
    typeof height == "string" &&
    height.constructor == String &&
    height.indexOf("px") >= 0
  ) {
    height = parseFloat(height.replace(/px/g, ""));
  }
  if (!width || width > $(window).width() - 60) width = $(window).width() - 60;
  if (!height || height > $(window).height() - 60)
    height = $(window).height() - 60;
  var marginLeft = 0;
  if (width > titleWidth) {
    //titleWidth = 280;
    marginLeft = width / 2 - titleWidth / 2;
  } else {
    titleWidth = width;
  }
  $(".ui-dialog-title")
    .css("margin-left", marginLeft + "px")
    .css("width", titleWidth + "px");
  var dialogDiv = $("#modal2")
    .dialog("option", "title", title)
    .dialog("option", "width", width)
    .dialog("option", "height", height);
  dialogDiv.dialog("open");
  return dialogDiv;
}
