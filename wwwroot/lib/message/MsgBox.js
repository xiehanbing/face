//失败提示
function MsgBoxFailAlert(data, failMessage) {
    var success = data.IsSuccess;
    var message = data.Message === null || data.Message === '' ? failMessage : data.Message;
    var title = data.Message === null || data.Message === '' ? "失败" : "异常";
    MsgBoxAlert(message, title);
}


//jquery ,msgbox
//弹框提示
function MsgBoxAlert(message, title) {
    if (title == null || title === '') {
        title = "消息";
    }
    $.MsgBox.Alert(title, message);
}
//弹框确认
function MsgBoxConfirm(message, title, callback) {
    if (title == null || title === '') {
        title = "提示";
    }
    $.MsgBox.Confirm(title, message, callback);
}
//弹框确认
function LoadingStart(message) {
    $.MsgBox.Loading(message);
}
//弹框确认
function LoadingFinish(message) {
    $.MsgBox.LoadingFinish(message);
}
//只是显示
function MsgBoxPromit(message, title) {
    if (title == null || title === '') {
        title = "消息";
    }
    $.MsgBox.Promit(title, message);
}
$(function () {
    //$('body').on('mousedown',
    //    '#mb_con',
    //    function (e) {
    //        var positionDiv = $(this).offset();
    //        var distenceX = e.pageX - positionDiv.left;
    //        var distenceY = e.pageY - positionDiv.top;
    //        $(document).mousemove(function (e) {
    //            var x = e.pageX - distenceX;
    //            var y = e.pageY - distenceY;
    //            if (x < 0) {
    //                x = 0;
    //            } else if (x > $(document).width() - $('#mb_con').outerWidth(true)) {
    //                x = $(document).width() - $('#mb_con').outerWidth(true);
    //            }
    //            if (y < 0) {
    //                y = 0;
    //            } else if (y > $(document).height() - $('#mb_con').outerHeight(true)) {
    //                y = $(document).height() - $('#mb_con').outerHeight(true);
    //            }
    //            $('#mb_con').css({
    //                'left': x + 'px',
    //                'top': y + 'px'
    //            });
    //        });
    //        $(document).mouseup(function () {
    //            $(document).off('mousemove');
    //        });
    //    });
});



(function () {
    //生成Css
    var GenerateCss = function () {
        $("#mb_box").css({
            width: '100%',
            height: '100%',
            zIndex: '99999',
            position: 'fixed',
            filter: 'Alpha(opacity=60)',
            backgroundColor: 'black',
            top: '0',
            left: '0',
            opacity: '0.6'
        });
        $("#mb_con").css({
            zIndex: '999999',
            width: '400px',
            position: 'fixed',
            //backgroundColor: 'White',
            borderRadius: '15px',
            color: 'white',
            backgroundColor: 'rgba(14, 40, 98, 0.7)'
        });
        $("#mb_tit").css({
            display: 'block',
            fontSize: '14px',
            //color: '#444',
            color: 'white',
            backgroundColor: 'rgba(14, 40, 98, 0.7)',
            padding: '10px 15px',
            //backgroundColor: '#DDD',
            borderRadius: '15px 15px 0 0',
            borderBottom: '3px solid #009BFE',
            fontWeight: 'bold'
        });
        $("#mb_msg").css({
            padding: '20px',
            lineHeight: '20px',
            borderBottom: '1px dashed #DDD',
            fontSize: '13px',

            color: 'white'

        });
        $("#mb_ico").css({
            display: 'block',
            position: 'absolute',
            right: '10px',
            top: '9px',
            border: '1px solid Gray',
            width: '18px',
            height: '18px',
            textAlign: 'center',
            lineHeight: '16px',
            cursor: 'pointer',
            borderRadius: '12px',
            fontFamily: '微软雅黑'
        });
        $("#mb_btnbox").css({
            margin: '15px 0 10px 0',
            textAlign: 'center'
        });
        $("#mb_btn_ok,#mb_btn_no").css({
            width: '85px',
            height: '30px',
            color: 'white',
            border: 'none'
        });
        $("#mb_btn_ok").css({
            backgroundColor: '#168bbb'
        });
        $("#mb_btn_no").css({
            backgroundColor: 'gray',
            marginLeft: '20px'
        });
        $('#mb_btnbox input[type=button]').hover(function () {
            $(this).css({
                cursor: 'pointer'

            });
        }, function () {
            $(this).css({
                cursor: 'default'
            });
        });
        //右上角关闭按钮hover样式
        $("#mb_ico").hover(function () {
            $(this).css({
                backgroundColor: 'Red',
                color: 'White'
            });
        },
            function () {
                $(this).css({
                    backgroundColor: '#DDD',
                    color: 'black'
                });
            });
        var _widht = document.documentElement.clientWidth; //屏幕宽
        var _height = document.documentElement.clientHeight; //屏幕高
        var boxWidth = $("#mb_con").width();
        var boxHeight = $("#mb_con").height();
        //让提示框居中
        $("#mb_con").css({
            top: (_height - boxHeight) / 2 + "px",
            left: (_widht - boxWidth) / 2 + "px"
        });
    };
    //生成Html
    var GenerateHtml = function (type, title, msg) {
        var _html = "";
        _html += '<div id="mb_box"></div><div id="mb_con"><span id="mb_tit">' + title + '</span>';
        _html += '<a id="mb_ico">x</a><div id="mb_msg">' + msg + '</div><div id="mb_btnbox">';
        if (type === "alert") {
            _html += '<input id="mb_btn_ok" type="button" value="确定" />';
        }
        if (type === "confirm") {
            _html += '<input id="mb_btn_ok" type="button" value="确定" />';
            _html += '<input id="mb_btn_no" type="button" value="取消" />';
        }
        _html += '</div></div>';
        //必须先将_html添加到body，再设置Css样式
        $("body").append(_html);
        //生成Css
        GenerateCss();

    };
    var LoadingHtml = function (msg) {
        msg = msg || "加载中...";
        var html = "";
        html += '<div id="loading_box">' + msg + '</div>';
        $('body').append(html);
        var _height = document.documentElement.clientHeight; //屏幕高
        $("#loading_box").css({
            width: '100%',
            height: '100%',
            zIndex: '99999',
            position: 'fixed',
            filter: 'Alpha(opacity=60)',
            backgroundColor: 'rgba(0,0,0,0.8)',
            top: '0',
            left: '0',
            "text-align": "center",
            "line-height": _height+'px'
        });
    };
    //确定按钮事件
    var btnOk = function (callback) {
        $("#mb_btn_ok").click(function () {
            $("#mb_box,#mb_con").remove();
            if (typeof (callback) === 'function') {
                callback();
            }
        });
    };
    //取消按钮事件
    var btnNo = function () {
        $("#mb_btn_no,#mb_ico").click(function () {
            $("#mb_box,#mb_con").remove();
        });
    };
    $.MsgBox = {
        Alert: function (title, msg) {
            GenerateHtml("alert", title, msg);
            btnOk(); //alert只是弹出消息，因此没必要用到回调函数callback
            btnNo();
        },
        Confirm: function (title, msg, callback) {
            GenerateHtml("confirm", title, msg);
            btnOk(callback);
            btnNo();
        },
        Promit: function (title, msg) {
            GenerateHtml("promit", title, msg);

            setTimeout(function () {
                //$("#mb_btn_ok").click();
                $("#mb_box,#mb_con").remove();
            }, 1000);
        },
        Loading: function (msg) {
            LoadingHtml(msg);
        },
        LoadingFinish: function () {
            $("#loading_box").remove();
        }
    };
})();