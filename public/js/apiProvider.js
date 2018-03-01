jQuery.support.cors = true;

function Click(){
    return false;
    // if(window.event.srcElement.tagName=="IMG")
    // {
    //     // alert("图片直接右键");
    //     console.log("图片直接右键");
    //     window.event.returnValue=false;
    // }
}
document.oncontextmenu=Click;
// 百度统计
(function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?664fb94c10095699ba30adb9752ef9a5";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();

// 百度推送
(function(){
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https') {
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
    }
    else {
        bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
})();
// 测试环境
var apihost='http://m.homeyeup.com/yuyue/';
var imghost="http://m.homeyeup.com/yuyueimages/";
var upimgurl="http://m.homeyeup.com/yuyueupload/";
var spacecode="http://www.homeyeup.com/";
var uid = localStorage.uid;

var apiseo='http://www.homeyeup.com/yuyue/seo';

// 生产环境
// var apihost='http://m.homeyeup.com/yuyue/';
// var imghost= "http://m.homeyeup.com/yuyueimages/";
// var upimgurl= "http://m.homeyeup.com/yuyueupload";
// var spacecode="http://www.homeyeup.com/";
// var uid = localStorage.uid;
//设置cookie
function DateDiff(sDate1, sDate2) {
    var aDate, oDate1, oDate2, iDays
    oDate1 = sDate1
    var arr = sDate2.split(/[- : \/]/);
    oDate2 = new Date(arr[0], arr[1] - 1, arr[2]);
    iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24)
    return iDays
}
function setCookie(name,value,days){
    var exp = new Date();
    exp.setTime(exp.getTime() + days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
function getCookie(name){
    var arr;
    var reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}
//地址栏获取
function UrlSearch() {
    var name, value;
    var str = location.href;
    var num = str.indexOf("?")
    str = str.substr(num + 1);
    var arr = str.split("&");
    for (var i = 0; i < arr.length; i++) {
        num = arr[i].indexOf("=");
        if (num > 0) {
            name = arr[i].substring(0, num);
            value = arr[i].substr(num + 1);
            this[name] = value;
        }
    }
}

function bytesToSize(bytes) {
    if (bytes === 0) return '0 B';
    var k = 1024, // or 1024
        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
   return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}
// 登录
function login(mobile, code, successBk, failBk) {
    $.ajax({
        type: "POST",
        url: apihost + "user/loginByMobile",
        dataType: "json",
        data: {
            mobile: mobile,
            code: code
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}
//获取验证码
function sendMsg(mobile,successBk, failBk) {
    $.ajax({
        type: "POST",
        url: apihost + "base/sendMsg",
        dataType: "json",
        data: {
            type:1,
            mobile: mobile
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data);
            } else {
                failBk(data);
            }
        }
    });
}

// 获取用户信息
function getUserInfo(successBk, failBk) {
    $.ajax({
        type: "POST",
        url: apihost + "user/getUserInfo",
        dataType: "json",
        data: {
            uid:localStorage.uid
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data);
            } else {
                failBk(data);
            }
        }
    });
}

// 获取分类
function getClassify(successBk, failBk) {
    $.ajax({
        type: "POST",
        url: apihost + "base/getClassify",
        dataType: "json",
        success: function (data) {
            if (data.code == "0000") {
                successBk(data);
            } else {
                failBk(data);
            }
        }
    });
}
// 获取所有相册列表
function getAlbumList(successBk, failBk) {
    $.ajax({
        type: "POST",
        url: apihost + "pic/getAlbumList",
        dataType: "json",
        data: {
            uid:localStorage.uid,
            startRow:0,
            rowCount:100
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data);
            } else {
                failBk(data);
            }
        }
    });
}
// 相册上传
function uploadPic(aid,albumName,imgSpace,imgStyle,imgUrl,successBk, failBk) {
    $.ajax({
        type: "POST",
        url: apihost + "pic/uploadPic",
        dataType: "json",
        async: false,
        data:{
            uid:localStorage.uid,
            aid:aid,
            albumName:albumName,
            imgSpace:imgSpace,
            imgStyle:imgStyle,
            imgUrl:imgUrl
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data);
            } else {
                failBk(data);
            }
        }
    });
}
//图片上传
function upImg(formData,successBk,failBk){
    // var formData = new FormData($("#uploadForm" )[0]);
    $.ajax({
        url: upimgurl,
        type: 'POST',
        data: formData,
        async: true,
        cache: false,
        contentType: false,
        processData: false,
        success: function(data){
            successBk(data);
        },
        error:function(){
            failBk();
        }
    });
}

// 获取图片详情
function getPicAttr(iid,successBk, failBk) {
    $.ajax({
        type: "POST",
        url: apihost + "pic/getPicAttr",
        dataType: "json",
        data: {
            iid:iid
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}

// 删除图片
function delPic(iid,successBk, failBk) {
    $.ajax({
        type: "POST",
        url: apihost + "pic/delPic",
        dataType: "json",
        data: {
            uid:localStorage.uid,
            iid:iid
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data);
            } else {
                failBk(data);
            }
        }
    });
}
//图集
function getPicList(imgStyle,imgSpace,startRow,rowCount,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "pic/getPicList",
        dataType: "json",
        data: {
            uid:localStorage.uid,
            imgStyle:imgStyle,   //图片风格id
            imgSpace:imgSpace,   //图片空间id
            startRow:startRow,
            rowCount:rowCount
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}


//相册搜索
function getAlbumListbyName(albumName,startRow,rowCount,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "pic/getAlbumListbyName",
        dataType: "json",
        data: {
            uid:localStorage.uid,
            albumName:albumName,
            startRow:startRow,
            rowCount:rowCount
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}

// 编辑图片属性
function editPicAttr(iid,imgDesc,imgSpace,imgStyle,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "pic/editPicAttr",
        dataType: "json",
        data: {
            uid:localStorage.uid,
            iid:iid,
            imgDesc:imgDesc,
            imgSpace:imgSpace,
            imgStyle:imgStyle,
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data);
            } else {
                failBk(data);
            }
        }
    });
}
// 编辑相册属性
function editAlbumAttr(aid,albumName,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "pic/editAlbumAttr",
        dataType: "json",
        data: {
            uid:localStorage.uid,
            aid:aid,
            albumName:albumName
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data);
            } else {
                failBk(data);
            }
        }
    });
}
// 编辑相册属性
function editAlbumAttrCover(aid,coverImgUrl,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "pic/editAlbumAttr",
        dataType: "json",
        data: {
            uid:localStorage.uid,
            aid:aid,
            coverImgUrl:coverImgUrl
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data);
            } else {
                failBk(data);
            }
        }
    });
}
// 查询相册图片列表
function getAlbumPicList(imgStyle,imgSpace,aid,startRow,rowCount,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "pic/getAlbumPicList",
        dataType: "json",
        data: {
            uid:localStorage.uid,
            aid:aid,
            imgStyle:imgStyle,
            imgSpace:imgSpace,
            startRow:startRow,
            rowCount:rowCount
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}

// 批量修改图片描述
function editImgDesc(iid,imgDesc,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "pic/editImgDesc",
        dataType: "json",
        data: {
            iid:iid,
            imgDesc:imgDesc,
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}

// 批量修改空间风格
function editImgSpaceStyle(iid,imgSpace,imgStyle,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "pic/editImgSpaceStyle",
        dataType: "json",
        data: {
            iid:iid,
            imgSpace:imgSpace,
            imgStyle:imgStyle
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}

// 批量图片移动到相册
function editImgAid(iid,aid,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "pic/editImgAid",
        dataType: "json",
        data: {
            iid:iid,
            aid:aid,
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}

// 批量删除图片
function editImgDel(iid,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "pic/editImgDel",
        dataType: "json",
        data: {
            iid:iid
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}
// 创建新相册
function addAlbum(albumName,coverImgUrl,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "pic/addAlbum",
        dataType: "json",
        data: {
            uid:localStorage.uid,
            albumName:albumName,
            coverImgUrl:coverImgUrl
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}
// 删除相册
function delAlbum(aid,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "pic/delAlbum",
        dataType: "json",
        data: {
            uid:localStorage.uid,
            aid:aid
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}

//
function getSapceSize(successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "pic/getSapceSize",
        dataType: "json",
        data: {
            uid:localStorage.uid,
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}

function  loginByWeb(code,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "user/loginByWeb",
        dataType: "json",
        data: {
            code:code
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}
//首页动态消息展示
function  getDynamicAllMsg(successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "msg/getDynamicAllMsg",
        dataType: "json",
        data: {
            startRow:0,
            rowCount:1000
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}
//首页关注项目数和回复数
function  getUserCount(successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "user/getUserCount",
        dataType: "json",
        data: {
            uid:localStorage.uid,
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}
//首页项目列表展示
function  getProBySearch(allowVisit,proName,city,startRow,rowCount,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "project/getProBySearch",
        dataType: "json",
        data: {
            allowVisit:allowVisit,
            proName:proName,
            city:city,
            startRow:startRow,
            rowCount:rowCount
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}
//搜索结果页
function  getProBySearc(allowVisit,budgetMin,budgetMax,proSizeMin,proSizeMax,proStyle,proType,proName,city,startRow,rowCount,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "project/getProBySearch",
        dataType: "json",
        data: {
            uid:localStorage.uid,
            allowVisit:allowVisit,
            budgetMin:budgetMin,
            budgetMax:budgetMax,
            proSizeMin:proSizeMin,
            proSizeMax:proSizeMax,
            proStyle:proStyle,
            proType:proType,
            proName:proName,
            city:city,
            startRow:startRow,
            rowCount:rowCount,
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}
//首页项目列表展示
function  getCityByInitial(successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "base/getCityByInitial",
        dataType: "json",
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}

// 我的预约列表
function  getVisitByWait(status,uid,startRow,rowCount,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "visit/getVisitByWait",
        dataType: "json",
        data:{
            status:status,
            uid:uid,
            startRow:startRow,
            rowCount:rowCount
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}

function getFollowProEvaluateList(uid,startRow,rowCount,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "user/getFollowProEvaluateList",
        dataType: "json",
        data:{
            uid:uid,
            startRow:startRow,
            rowCount:rowCount
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}
//底部业主数展示接口
function getUserVisCount(successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "user/getUserVisCount",
        dataType: "json",
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}

function getNewProRecmentList(uid,startRow,rowCount,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "user/getNewProRecmentList",
        dataType: "json",
        data:{
            uid:uid,
            startRow:startRow,
            rowCount:rowCount
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}
//项目详情页获取信息
function getProInfo(pid,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "project/getProInfo",
        dataType: "json",
        data:{
            uid:localStorage.uid,
            pid:pid,
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}
//Pc端查询项目记录列表
function getProRecordListByPC(pid,spaceId,startRow,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "project/getProRecordListByPC",
        dataType: "json",
        data:{
            openStatus:1,
            uid:localStorage.uid,
            pid:pid,
            startRow:startRow,
            rowCount:1000,
            spaceId:spaceId
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}

function applyVisit(uid,visitUid,pid,mobile,visitDate,visitTime,decorateBudget,decorateSize,proName,styleId,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "visit/applyVisit",
        dataType: "json",
        data:{
            uid: uid,  //项目人id
            visitUid: visitUid,  //参观人用户id
            pid: pid,  //项目id
            mobile: mobile,  //参观人手机号
            visitDate: visitDate,  //参观日期
            visitTime: visitTime,  //参观时间
            decorateBudget: decorateBudget,  //装修预算
            decorateSize: decorateSize,  //装修项目面积
            proName: proName,  //楼盘名称
            styleId: styleId  //装修风格id
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}

function insertBrowserHistory(data,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "project/insertBrowserHistory",
        dataTy: "json",
        data:{
            data:data
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}

function getBrowserHistory(allowVisit,uid,startRow,rowCount,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "project/getBrowserHistory",
        dataType: "json",
        data:{
            allowVisit:allowVisit,
            uid:uid,
            startRow:startRow,
            rowCount:rowCount
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}
function getProByPush(budgetMin,budgetMax,proSizeMin,proSizeMax,proStyle,proType,location,city,startRow,rowCount,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "project/getProByPush",
        dataType: "json",
        data:{
            budgetMin:budgetMin,
            budgetMax:budgetMax,
            proSizeMin:proSizeMin,
            proSizeMax:proSizeMax,
            proStyle:proStyle,
            proType:proType,
            location:location,
            city:city,
            startRow:startRow,
            rowCount:rowCount
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}

// 取消预约
function cancelVisit(vid,uid,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "visit/cancelVisit",
        dataType: "json",
        data:{
            vid:vid,
            uid:uid
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}

// 我的关注-评论列表
function getEvaluateComment(eid,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "project/getEvaluateComment",
        dataType: "json",
        data:{
            eid:eid,
            startRow:0,
            rowCount:1000
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}
// 我的关注-获取点赞以及评论的数量
function getEvaluateCount(eid,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "project/getEvaluateCount",
        dataType: "json",
        data:{
            eid:eid
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}
// 我的关注-添加评论/回复
function addEvaluateComment(eid,content,parentId,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "project/addEvaluateComment",
        dataType: "json",
        data:{
            eid:eid,
            uid:localStorage.uid,
            content:content,
            parentId:parentId
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}
// 我的关注-点赞
function praiseEvaluate(eid,status,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "project/praiseEvaluate",
        dataType: "json",
        data:{
            eid:eid,
            uid:localStorage.uid,
            status:status
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}

// 获取评论内容
function getRecordComment(rid,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "project/getRecordComment",
        dataType: "json",
        data:{
            rid:rid,
            startRow:0,
            rowCount:1000
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}
// 获取点赞以及评论的数量
function getRecordCount(rid,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "project/getRecordCount",
        dataType: "json",
        data:{
            rid:rid
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}
// 添加评论/回复
function addComment(rid,content,parentId,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "project/addComment",
        dataType: "json",
        data:{
            rid:rid,
            uid:localStorage.uid,
            content:content,
            parentId:parentId
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}
// 项目详情点赞
function praiseRecord(rid,status,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "project/praiseRecord",
        dataType: "json",
        data:{
            rid:rid,
            uid:localStorage.uid,
            status:status
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}
// 项目关注
function followPro(pid,status,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "project/followPro",
        dataType: "json",
        data:{
            pid:pid,
            uid:localStorage.uid,
            status:status
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}
// 首页楼盘搜索
function getProNameBySearch(keyword,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "project/getProNameBySearch",
        dataType: "json",
        data:{
            keyword:keyword,
            startRow:0,
            rowCount:1000
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}

// 评价列表
function getProjectEvalute(pid,startRow,rowCount,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "project/getProjectEvalute",
        dataType: "json",
        data:{
            pid:pid,
            startRow:startRow,
            rowCount:rowCount
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}

// 评价
function proEvaluate(pid,vid,constructLevel,mannerLevel,content,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "visit/proEvaluate",
        dataType: "json",
        data:{
            pid:pid,
            vid:vid,
            constructLevel: constructLevel,    //施工工艺评分
            mannerLevel: mannerLevel,  //态度评分
            content: content,
            uid: localStorage.uid    
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}

// 修改评价
function editEvaluate(peid,constructLevel,mannerLevel,content,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "visit/editEvaluate",
        dataType: "json",
        data:{
            peid:peid,
            constructLevel: constructLevel,    //施工工艺评分
            mannerLevel: mannerLevel,  //态度评分
            content: content,
            uid: localStorage.uid    
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}

// 获取评价内容
function getEvaluateInfo(vid,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "visit/getEvaluateInfo",
        dataType: "json",
        data:{
            vid:vid   
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}
// 获取用户最后一次访问信息
function getLastVisitInfo(successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "visit/getLastVisitInfo",
        dataType: "json",
        data:{
            uid:localStorage.uid
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}
// 我的关注页
function getFollowProList(allowVisit,startRow,rowCount,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "user/getFollowProList",
        dataType: "json",
        data:{
            allowVisit:allowVisit,
            uid:localStorage.uid,
            startRow:startRow,
            rowCount:rowCount
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}
//装友圈
function getMsgFollowMe(type,uid,startRow,rowCount,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "msg/getMsgFollowMe",
        dataType: "json",
        data:{
            type:type,
            uid:uid,
            startRow:startRow,
            rowCount:rowCount
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}
//装友圈
function insertMsgFollowMe (pid,content,mid,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "msg/insertMsgFollowMe",
        dataType: "json",
        data:{
            uid:localStorage.uid,
            pid:pid,
            content:content,
            mid:mid
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}
//我的装友
function getFriendByMe(startRow,rowCount,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "user/getFriendByMe",
        dataType: "json",
        data:{
            uid:localStorage.uid,
            startRow:startRow,
            rowCount:rowCount
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}
//装修说
function getMsgSay(type,uid,startRow,rowCount,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "msg/getMsgSay",
        dataType: "json",
        data:{
            type:type,
            uid:uid,
            startRow:startRow,
            rowCount:rowCount
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}
//我的装友详情
function getMsgMeAndFriend(type,friendID,uid,startRow,rowCount,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "msg/getMsgMeAndFriend",
        dataType: "json",
        data:{
            type:type,
            friendID:friendID,
            uid:uid,
            startRow:startRow,
            rowCount:rowCount
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}
//项目详情获取所有图片
function getProAllImg(pid,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "project/getProAllImg",
        dataType: "json",
        data:{
            pid:pid
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}
//我的所有项目
function getProByUser(startRow,rowCount,allowVisit,auth,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "project/getProByUser",
        dataType: "json",
        data:{
            uid:localStorage.uid,
            startRow:startRow,
            rowCount:rowCount,
            allowVisit:allowVisit,
            auth:auth
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}
//项目检索
function getProByUserSearch(keyword,startRow,rowCount,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "project/getProByUserSearch",
        dataType: "json",
        data:{
            uid:localStorage.uid,
            keyword:keyword,
            startRow:startRow,
            rowCount:rowCount
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}
//更新已有项目的发布
function releasePro(pid,title,spaceId,coverImgUrl,content,imgUrlList,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "project/releasePro",
        dataType: "json",
        data:{
            uid:localStorage.uid,
            pid:pid,
            title:title,
            spaceId:spaceId,
            coverImgUrl: coverImgUrl,
            content:content,
            // openStatus:openStatus,
            // allowVisit:allowVisit,
            imgUrlList:imgUrlList
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}
//免费设计、免费报价
function insertServiced(type,nickName,mobile,province,city,area,proName,proSize,room,hall,kitchen,guard,balcony,contractNo,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "serviced/insertServiced",
        dataType: "json",
        data:{
            type:type,
            nickName:nickName,
            mobile:mobile,
            province:province,
            city: city,
            area:area,
            proName:proName,
            proSize:proSize,
            room:room,//    户型(室)
            hall:hall,//    户型(厅)
            kitchen:kitchen,// 户型(厨)
            guard:guard,//   户型(卫)
            balcony:balcony,// 户型(阳台)
            contractNo:contractNo,// 合同编号
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            }else {
                failBk(data);
            }
        }
    });
}
//编辑项目地址
function editPro(pid,proName,proStyle,proType,contacts,contactNumber,province,city,area,proNameAddr,address,position,budget,proSize,coverImgUrl,startDate,allowVisit,endStatus,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "project/editPro",
        dataType: "json",
        data:{
            uid:localStorage.uid,
            pid:pid,
            proStyle:proStyle,
            proType:proType,
            proName:proName,
            contacts:contacts,
            contactNumber:contactNumber,
            province:province,
            city:city,
            area:area,
            proNameAddr:proNameAddr,
            address:address,
            position:position,
            budget:budget,
            proSize:proSize,
            coverImgUrl:coverImgUrl,
            startDate:startDate,
            allowVisit:allowVisit,
            endStatus:endStatus
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}
//获取省
function getProvince(successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "base/getProvinceByInitial",
        dataType: "json",
        data:{},
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            }else {
                failBk(data);
            }
        }
    });
}
//获取省
function getCity(provinceid,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "base/getProvinceByInitialByCity",
        dataType: "json",
        data:{
            provinceid:provinceid,
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            }else {
                failBk(data);
            }
        }
    });
}
//获取区
function getArea(cityid,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "base/getProvinceByInitialByArea",
        dataType: "json",
        data:{
            cityid:cityid,
        },
        success: function (data) {
            if (data.code == "0000") {
                successBk(data.obj);
            }else {
                failBk(data);
            }
        }
    });
}