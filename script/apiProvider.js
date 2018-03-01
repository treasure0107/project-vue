// 测试环境
// var apihost='http://192.168.1.240/yuyue/';
// var imghost="http://192.168.1.240:4869/";
// var upimgurl="http://192.168.1.240/yuyueupload";
// var spacecode="http://192.168.1.240/predone/";

// 生产环境
var apihost='http://m.homeyeup.com/yuyue/';
var imghost= "http://m.homeyeup.com/yuyueimages/";
var upimgurl= "http://m.homeyeup.com/yuyueupload/";
var spacecode="http://m.homeyeup.com/";
// localStorage.uid='10003';
var uid = localStorage.uid;
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
function upImg(formData,successBk){
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

function editPicAttr(iid,imgDesc,imgStyle,imgSpace,successBk,failBk){
    $.ajax({
        type: "POST",
        url: apihost + "pic/editPicAttr",
        dataType: "json",
        data: {
            uid:localStorage.uid,
            iid:iid,
            imgDesc:imgDesc,
            imgStyle:imgStyle,
            imgSpace:imgSpace
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