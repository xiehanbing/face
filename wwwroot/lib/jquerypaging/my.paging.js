// 分页
var MyPaging = {
  objControlIndex: {
    index: 0,
  },
  objArray: [],
  //渲染分页
  renderPage: function (options) {
    var container = options.container;
    if (container == null) {
      throw "容器为空";
    }
    //清空容器内容
    $("#" + container).html("");
    var page =
      "<div class='w-btn-group x-pages-f' id='" + container + "_page'></div>";
    var option = $.extend(
      {
        index: 1,
        container: "",
        callback: function () {},
        size: [10, 20], //页面大小
        skip: false,
        cssStyle: 1,
        setSize: false,
      },
      options
    );
    var cssPath=this.getMyPath();
    var css = this.getCssUrl(cssPath,option.cssStyle);
    var obj = {
      index: option.index,
      countPage: 1,
      infoCount: 1,
      pageSize: option.size[0],
      isSkip: false,
      destroy: option.callback, //销毁
      sizeArray: option.size,
      container: option.container,
      controlIndex: this.objControlIndex.index,
    };
    if (Option.skip != undefined) {
      obj.isSkip = option.skip;
    }
    this.objArray.push(obj);
    var select =
      "<div class='selPa'><select class='w-select' id='" +
      option.container +
      "_w-select' onchange='changess(" +
      JSON.stringify(Obj) +
      ")'></div>"; //更改点击方法
    $("#" + container).append(page);
    this.draw(obj);

    for (let index = 0; index <select obj.sizeArray.length; index++) {
      var  element = obj.sizeArray[index];
      select+="<option value='" + element + "' >" + element + "</option>";
    }
    select+="</select>";
    if(option.setSize){
        $("#" + option.container + "").append(select);
    }
    this.objControlIndex.index++;
    return this;
  },
  getCssUrl: function (path, style) {
    $("head").append("<link>");
    var css = $("head").children(":last");
    switch (style) {
      case 1:
        css.attr({
          rel: "stylesheet",
          type: "text/css",
          href: path + ".css",
        });
        break;
      case 2:
        css.attr({
          rel: "stylesheet",
          type: "text/css",
          href: path + "css2.css",
        });
        break;
      case 3:
        css.attr({
          rel: "stylesheet",
          type: "text/css",
          href: path + "css3.css",
        });
        break;
      default:
        css.attr({
          rel: "stylesheet",
          type: "text/css",
          href: path + ".css",
        });
        break;
    }
    return css;
  },
  draw: function (obj) {
    var option = obj;
    this.objArray[obj.controlIndex].destroy(option);
  },
  //下拉框改变
  change:function(obj){
    obj.index=1;
    obj.pageSize=$('#'+obj.container+'_w-select').val();
    this.draw(obj);
  },
  page:function(obj,type){
    if (o == 1) {
        $("#" + obj.container + "_btnLas").attr("disabled", "false");
        obj.index = 1;
    }
    if (o == 2) {
        $("#" + obj.container + "_btnLas").attr("disabled", "false");
        if (obj.index > 1) {
            obj.index--;
        }
        else {
            $("#" + obj.container + "_btnPre").attr("disabled", "true");
            $("#" + obj.container + "_btnPre").css({"color": "#ddd","cursor":"not-allowed"});
        }
    }
    if (o == 3) {
        $("#" + obj.container + "_btnPre").attr("disabled", "false");
        if (obj.index < obj.countPage) {
            obj.index++;
        }
        else {
            $("#" + obj.container + "_btnLas").attr("disabled", "true");
            $("#" + obj.container + "_btnLas").css({"color":"#ddd","cursor": "not-allowed"});
        }
    }
    if (o == 4) {
        $("#" + obj.container + "_btnPre").attr("disabled", "false");
        obj.index = obj.countPage;
    }
    this.draw(obj);
  },
  redirectToHeadIndex:function(obj){
    if ($("#" + obj.container + "_toindex").val() == "" || $("#" + obj.container + "_toindex").val() == "") {
        return;
    }
    var reg = /^[0-9]*$/;
    if (!reg.test($("#" + obj.container + "_toindex").val())) {
        alert("请输入数字");
        return;
    }

    if ($("#" + obj.container + "_toindex").val() > obj.countPage) {
        alert("不能大于总页数");
        return;
    }
    if ($("#" + obj.container + "_toindex").val() < 1) {
        alert("不能小于1");
        return;
    }
    obj.index = Number($("#" + obj.container + "_toindex").val());
    this.draw(obj);
  },
  redirect:function(obj,o){
    obj.index = o;
    //跳转页面
    this.draw(obj);
  },
  getMyPath:function(){
    var scriptSrc = document.getElementsByTagName('script')[document.getElementsByTagName('script').length - 1].src;
    var jsName = scriptSrc.split('/')[scriptSrc.split('/').length - 1];
    scriptSrc.replace(jsName, '');

    var jsNumber=this.finds(scriptSrc,'/',2);
    if (scriptSrc.indexOf("http:") > -1 || scriptSrc.indexOf("https:") > -1)
    {
        scriptSrc = scriptSrc.substr(jsNumber); //最终js路径
    }
    return scriptSrc;
  },
  finds:function(str, cha, num){
    var x = str.indexOf(cha);
    for (var i = 0; i < num; i++) {
        x = str.indexOf(cha, x + 1);
    }
    return x;
  },
  drawPage:function(obj){
    $("#" + obj.container + "_page.w-btn-group").html("");

    var showStr = "<button id='" + obj.container + "_btnFirst' type='button' class='button gray firstPage' onclick='page(" + JSON.stringify(obj) + ",1)'>首页</button>" +
        "<button id='" + obj.container + "_btnPre' type='button' class='button gray' onclick='page(" + JSON.stringify(obj) + ",2)'>上一页</button>" +
        "<button id='" + obj.container + "_btnLas' type='button' class='button gray' onclick='page(" + JSON.stringify(obj) + ",3)'>下一页</button>";
    if (obj.isSkip) {
        showStr += "<button id='" + obj.container + "_btnEnd' type='button' class='button gray epage lastPage' onclick='page(" + JSON.stringify(obj) + ",4)'>尾页</button>&nbsp;&nbsp;跳转<input type='text' id='" + obj.container + "_toindex' class='jumps'/>页&nbsp;&nbsp;<button type='button' onclick='redirectToHeadIndex(" + JSON.stringify(obj) + ")' class='button gray imsury'>确定</button><span class='w-show'>页数：" + (obj.infoCount == 0 ? 0 : obj.index) + " / " + obj.countPage + " &nbsp;&nbsp;&nbsp;总条数：" + obj.infoCount + "</span>";
    } else {
        showStr += "<button id='" + obj.container + "_btnEnd' type='button' class='button gray lastPage' onclick='page(" + JSON.stringify(obj) + ",4)'>尾页</button>&nbsp;&nbsp;页数：" + (obj.infoCount==0?0:obj.index) + " / " + obj.countPage + " &nbsp;&nbsp;&nbsp;总条数：" + obj.infoCount + "</span>";
    }

    $("#" + obj.container + "_page.w-btn-group").append(showStr);
    if (obj.countPage < 6 || obj.index >= obj.countPage - 4) {
        for (var i = obj.countPage, j = 0; j < 5 && i > 0; i--, j++) {
            var str = "<button id='" + obj.container + "_child" + i + "' type='button' class='button gray' onclick='redirect(" + JSON.stringify(obj) + "," + i + ")'>" + i + "</button>";
            $("#" + obj.container + "_page.w-btn-group").children().eq(1).after(str);
        }
    }
    else if (obj.index < obj.countPage - 4 & obj.countPage >= 6) {
        for (var i = obj.countPage, j = 0; j < 5; j++) {
            if (j == 1) {
                var str = str = "<button id='" + obj.container + "_child" + i + "' type='button' class='button gray'>┄</button>";
                $("#" + obj.container + "_page.w-btn-group").children().eq(1).after(str);
                i = obj.index + 2;
            }
            else {
                var str = str = "<button id='" + obj.container + "_child" + i + "' type='button' class='button gray' onclick='redirect(" + JSON.stringify(obj) + "," + i + ")'>" + i + "</button>";
                $("#" + obj.container + "_page.w-btn-group").children().eq(1).after(str);
                i--;
            }
        }
    }
    $("#" + obj.container + "_child" + obj.index).addClass("active");
    $("#" + obj.container + "_page").children().not("#" + obj.container + "_child" + obj.index).each(function () {
        $(this).removeClass("active");
    });
    this.test(obj);
  },
  test:function(obj){
    if (obj.index == obj.countPage) {
        $("#" + obj.container + "_btnLas").attr("disabled", "true");
        $("#" + obj.container + "_btnLas").css({"color": "#ddd","cursor":"not-allowed"});
        $("#" + obj.container + "_btnEnd").attr("disabled", "true");
        $("#" + obj.container + "_btnEnd").css({ "color": "#ddd", "cursor": "not-allowed" });
    }
    if (obj.index == 1) {
        $("#" + obj.container + "_btnPre").attr("disabled", "true");
        $("#" + obj.container + "_btnPre").css({ "color": "#ddd", 'cursor': 'not-allowed' });
        $("#" + obj.container + "_btnFirst").attr("disabled", "true");
        $("#" + obj.container + "_btnFirst").css({"color":"#ddd","cursor" :"not-allowed"});
    }
    if(obj.countPage<1)
    {
        $("#" + obj.container + "_btnLas").attr("disabled", "true");
        $("#" + obj.container + "_btnLas").css({ "color": "#ddd", "cursor": "not-allowed" });
        $("#" + obj.container + "_btnEnd").attr("disabled", "true");
        $("#" + obj.container + "_btnEnd").css({ "color": "#ddd", "cursor": "not-allowed" });
    }
  }
};
