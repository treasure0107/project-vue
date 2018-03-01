var pageCount;
var rowCount = 25;
var imgStyle = [];
var imgSpace = [];
var currList = [];
// function bytesToSize(bytes) {
//     if (bytes === 0) return '0 B';
//     var k = 1000, // or 1024
//         sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
//         i = Math.floor(Math.log(bytes) / Math.log(k));
 
//    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
// }
//头像
$(".upload-lfImg").css({
    "background": "url(" + localStorage.logoUrl + ") center center no-repeat",
    "background-size": "cover"
});
$("#userName").text(localStorage.nickName);
$(".photos_itemups").mouseenter(function() {
    $('.layout').show();
});
$(".photos_itemups").mouseleave(function(event) {
    /* Act on the event */
    $('.layout').hide();
});
$('.layout').click(function() {
    localStorage.removeItem("uid");
    window.location.href = '../index.html';
});

getClassify(function(data) {
    for (var i = 0; i < data.obj.length; i++) {
        if (data.obj[i].parentId == 9) { //风格
            $("#stylelist").append('<li data-id=' + data.obj[i].classifyId + '>' + data.obj[i].classifyName + '</li>');
            $(".editbox_style").append('<li data-id=' + data.obj[i].classifyId + '>' + data.obj[i].classifyName + '</li>');
            $(".styleList").append('<li data-id=' + data.obj[i].classifyId + '>' + data.obj[i].classifyName + '</li>');
        }
        if (data.obj[i].parentId == 19) { //空间
            $("#spacelist").append('<li data-id=' + data.obj[i].classifyId + '>' + data.obj[i].classifyName + '</li>');
            $(".editbox_space").append('<li data-id=' + data.obj[i].classifyId + '>' + data.obj[i].classifyName + '</li>');
            $(".spaceList").append('<li data-id=' + data.obj[i].classifyId + '>' + data.obj[i].classifyName + '</li>');
        }
    }
}, function(data) {});

$("#spacelist").on('click', 'li', function() {
    var nameval = $(this).text();
    var id = $(this).data('id');
    if ($(this).hasClass('leftactive')) {
        $(this).removeClass('leftactive');
        removeByValue(imgSpace, id)
        $(".photos_taps>ul li").each(function(){
            if ($(this).data('id')==id) {
                $(this).remove();
            }
        });
    } else {
        imgSpace.push(id);
        $(".photos_taps>ul").append('<li data-type="space" data-id='+id+'>'+nameval+'</li>');
        $(this).addClass('leftactive');
    }
    $(".photos_imglist").html('');
    showPicList(imgStyle, imgSpace);
});

$("#stylelist").on('click', 'li', function() {
    var nameval = $(this).text();
    var id = $(this).data('id');
    if ($(this).hasClass('leftactive')) {
        $(this).removeClass('leftactive');
        removeByValue(imgStyle, id)
        $(".photos_taps>ul li").each(function(){
            if ($(this).data('id')==id) {
                $(this).remove();
            }
        });
    } else {
        imgStyle.push(id);
        $(".photos_taps>ul").append('<li data-type="style" data-id='+id+'>'+nameval+'</li>');
        $(this).addClass('leftactive');
    }
    $(".photos_imglist").html('');
    showPicList(imgStyle, imgSpace);
});

function removeByValue(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
            arr.splice(i, 1);
            break;
        }
    }
}

$("#photos_tap").on('click', 'li', function() {
    if ($(this).data("type") == 'space') {
        var arrval = $(this).data("id");
        $(this).remove();
        removeByValue(imgSpace, arrval)
    }
    if ($(this).data("type") == 'style') {
        var arrval = $(this).data("id");
        $(this).remove();
        removeByValue(imgStyle, arrval)
    }
    $(".photos_imglist").html('');
    showPicList(imgStyle, imgSpace);
});
$(".photos_taps>ul").on("click","li",function(){
    if ($(this).data("type") == 'space') {
        var arrval = $(this).data("id");
        $(this).remove();
        $("#spacelist li").each(function(){
            if ($(this).data("id")==arrval) {
                $(this).removeClass('leftactive');
            }
        });
        removeByValue(imgSpace, arrval)
    }
    if ($(this).data("type") == 'style') {
        var arrval = $(this).data("id");
        $(this).remove();
        $("#stylelist li").each(function(){
            if ($(this).data("id")==arrval) {
                $(this).removeClass('leftactive');
            }
        });
        removeByValue(imgStyle, arrval)
    }
    $(".photos_imglist").html('');
    showPicList(imgStyle, imgSpace);
});
$(".photos_imglist").html('');
showPicList(imgStyle, imgSpace);

function showPicList(imgStyle, imgSpace) {
    imgStyle = imgStyle.join(",");
    imgSpace = imgSpace.join(",");
    $.ajax({
        type: "POST",
        url: apihost + "pic/getPicList",
        dataType: "json",
        async: false,
        data: {
            uid: localStorage.uid,
            imgStyle: imgStyle, //图片风格id
            imgSpace: imgSpace, //图片空间id
            startRow: 0,
            rowCount: rowCount
        },
        success: function(data) {
            if (data.code == "0000") {
                pageCount = Math.ceil(data.obj.count / rowCount);
                var picList = data.obj.picList;
                if (picList.length == 0) {
                    $("#nodata").tmpl().appendTo('.photos_imglist');
                } else {
                    currList = data.obj.picList;
                    $.each(data.obj.picList, function(index, item) {
                        $("#picitem").tmpl(item).appendTo('.photos_imglist');
                    });
                }
                $(".tcdPageCode").createPage({
                    pageCount: pageCount,
                    current: 1,
                    backFn: function(p) {
                        getPicList(imgStyle, imgSpace, (p - 1) * rowCount, rowCount, function(data) {
                            // currList=data.startRow;
                            currList = data.picList;
                            $(".photos_imglist").html('');
                            $.each(data.picList, function(index, item) {
                                $("#picitem").tmpl(item).appendTo('.photos_imglist');
                            });
                        }, function() {});
                    }
                });
            } else {
                pageCount = 1;
                $(".tcdPageCode").createPage({
                    pageCount: pageCount,
                    current: 1,
                    backFn: function(p) {
                        $(".photos_imglist").html('');
                        getPicList(imgStyle, imgSpace, (p - 1) * rowCount, rowCount, function(data) {
                            $.each(data.picList, function(index, item) {
                                $("#picitem").tmpl(item).appendTo('.photos_imglist');
                            });
                        }, function() {});
                    }
                });
                $("#nodata").tmpl().appendTo('.photos_imglist');
            }

        }
    });
}

$(".photos_imglist").on('mouseenter', '.imgitem', function() {
    $(this).find("span").css({
        "opacity": "1",
        "z-index": "1"
    });
});
$(".photos_imglist").on('mouseleave', '.imgitem', function() {
    $(this).find("span").css({
        "opacity": "0",
        "z-index": "-1"
    });
});
var ediid;
$(".photos_imglist").on('click', '.imgitem>span', function(e) {
    e.stopPropagation();
    $(this).find("span").css({
        "opacity": "0",
        "z-index": "-1"
    });
    $(".editpic").show(300);
    ediid = $(this).data('id');
    var imgSpaces = '';
    var imgStyles = '';
    getPicAttr(ediid, function(data) {
        if (data.imgDesc) {
            $('#editbox_instro').val(data.imgDesc)
        } else {
            $('#editbox_instro').val('')
        }
        if (data.imgSpace) {
            $(".editbox_space li").each(function() {
                if ($(this).data('id') == data.imgSpace) {
                    $(this).addClass('liactive').siblings().removeClass('liactive');
                }
            });
            imgSpaces = data.imgSpace;
        } else {
            $(".editbox_space li").removeClass('liactive');
        }
        if (data.imgStyle) {
            $(".editbox_style li").each(function() {
                if ($(this).data('id') == data.imgStyle) {
                    $(this).addClass('liactive').siblings().removeClass('liactive');
                }
            });
            imgStyles = data.imgStyle;
        } else {
            $(".editbox_style li").removeClass('liactive');
        }
    }, function() {});

    $(".editbox_space").on('click', 'li', function() {
        $(this).addClass('liactive').siblings().removeClass('liactive');
        imgSpaces = $(this).data("id");
    });
    $(".editbox_style").on('click', 'li', function() {
        $(this).addClass('liactive').siblings().removeClass('liactive');
        imgStyles = $(this).data("id");
    });
    $(".editpic .photos_btnsave").click(function() {
        var imgDesc = $('#editbox_instro').val();
        editPicAttr(ediid, imgDesc, imgSpaces, imgStyles, function() {
            $(".collect_success").text("修改完成").fadeIn(200).fadeOut(3000, function() {
                $(".editpic").hide();
                $(".photos_imglist").empty();
                showPicList(imgStyle, imgSpace);
            });
        }, function() {
            $(".collect_success").text("修改失败").fadeIn(200).fadeOut(3000);
        });
    });

});

$(".editpic .photos_btndele").click(function() {
    delPic(ediid, function() {
        $(".collect_success").text("删除完成").fadeIn(200).fadeOut(3000, function() {
            $(".editpic").hide();
            $(".photos_imglist").empty();
            showPicList(imgStyle, imgSpace);
        });

    }, function() {
        $(".collect_success").text("删除失败").fadeIn(200).fadeOut(3000, function() {
            $(".editpic").hide();
        });

    })
});
$(".closewin").click(function() {
    $(".editpic").hide();
});
$(".bigimg_close").click(function() {
    $(".bigimg").hide();
});
$(".photos_imglist").on('click', ">div", function() {
    $(".bigimg").show();
    var index = $(this).index();
    // getPicList(imgStyle,imgSpace,currList,rowCount,function(data){
    $('.swiper-wrapper').html('');
    $.each(currList, function(index, item) {
        if (!item.imgSpaceName) {
            item.imgSpaceName = "无";
        }
        if (!item.imgStyleName) {
            item.imgStyleName = "无";
        }
        item.spacestyle = item.imgSpaceName + "/" + item.imgStyleName

        $("#bigimg").tmpl(item).appendTo('.swiper-wrapper');
    });
    var swiper = new Swiper('.swiper-container', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        // pagination: '.swiper-pagination',
        paginationClickable: true,
        initialSlide: index,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        onSlideChangeEnd: function(swiper) {
            // alert(swiper.activeIndex+'');
        },
        // Disable preloading of all images
        preloadImages: false,
        // Enable lazy loading
        lazyLoading: true
    });
    // },function(){});

});

$(".more-edit").click(function() {
    $(".imgitem span").hide();
    $(".taglist").hide();
    $(".editall").show();
    $(".checkitem").show();
});
$(".closeedit").click(function() {
    $(".imgitem span").show();
    $(".taglist").show();
    $(".editall").hide();
    $(".checkitem").hide();
});

$("#deleteall").click(function() {
    var selectnum = $("#selectnum").text();
    if (selectnum == 0) {
        $(".collect_success").text("请至少选择一张图片").fadeIn(200).fadeOut(3000);
    } else {
        var iid = selectiid();
        editImgDel(iid, function() {
            $(".collect_success").text("删除完成").fadeIn(200).fadeOut(3000, function() {
                $(".photos_imglist").html('');
                showPicList(imgStyle, imgSpace);
            });
        }, function() {
            $(".collect_success").text("删除失败").fadeIn(200).fadeOut(3000, function() {
                $(".photos_imglist").html('');
                showPicList(imgStyle, imgSpace);
            });
        });
    }
});
$("#moveto").click(function() {
    var selectnum = $("#selectnum").text();
    if (selectnum == 0) {
        $(".collect_success").text("请至少选择一张图片").fadeIn(200).fadeOut(3000);
    } else {
        $(".new-photo").fadeIn(500);
        $(".upload-mask").fadeIn(500);
    }
});
// 移动至相册删除
$(".new-photo .photo-hide").click(function() {
    $(this).parent().fadeOut(500);
    $(".upload-mask").fadeOut(500);
});
//移动至相册点击取消
$(".new-photo .cancel").click(function() {
    $(".new-photo").fadeOut(500);
    $(".upload-mask").fadeOut(500);
});
//移动至相册点击保存
$(".new-photo .confirm").click(function() {
    var iid = selectiid();
    var aid = $(".photo-name").data('aid');;
    editImgAid(iid, aid, function() {
        $(".collect_success").text("移动完成").fadeIn(200).fadeOut(3000, function() {
            $(".new-photo").fadeOut(500);
            $(".upload-mask").fadeOut(500);
        });

    }, function() {
        $(".collect_success").text("移动失败").fadeIn(200).fadeOut(3000, function() {
            $(".new-photo").fadeOut(500);
            $(".upload-mask").fadeOut(500);
        });

    });
});
//点击选择相册
$(".photo-name").click(function() {
    //获取用户所有相册
    $(".upload-rtAll").html("");
    getAlbumList(function(data) {
        $(".upload-rtAll").fadeIn(500);
        if (data.obj != "") {
            $.each(data.obj.albumList, function(i, val) {
                $(".upload-rtAll").append('<li data-aid=' + val.aid + '>' + val.albumName + '</li>');
            });
            $(".upload-rtAll li").click(function() {
                $(".photo-name").val($(this).text());
                $(".photo-name").attr("data-aid", $(this).data("aid"));
                $(".upload-rtAll").fadeOut(500);
            });
        }
    }, function(data) {
        $(".collect_success").text(data).fadeIn(200).fadeOut(3000);
    });
});
$("#modifyspace").click(function() {
    var selectnum = $("#selectnum").text();
    if (selectnum == 0) {
        $(".collect_success").text("请至少选择一张图片").fadeIn(200).fadeOut(3000);
    } else {
        $(".spaceList li").removeClass("active");
        $(".styleList li").removeClass("active");
        $(".spaceSty").show();
        $(".upload-mask").show();
    }
});
$(".spaceSty .photo-hide").click(function() {
    $(this).parent().fadeOut(500);
    $(".upload-mask").fadeOut(500);
});
$(".spaceSty .cancel").click(function() {
    $(".spaceSty").fadeOut(500);
    $(".upload-mask").fadeOut(500);
});
var modimgSpace = "";
var modimgStyle = "";
//风格样式
$(".styleList").on("click", "li", function() {
    if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        modimgStyle = "";
    } else {
        $(this).addClass("active").siblings().removeClass("active");
        modimgStyle = $(this).data("id");
    }
});

//空间样式
$(".spaceList").on("click", "li", function() {

    if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        modimgSpace = "";
    } else {
        $(this).addClass("active").siblings().removeClass("active");
        modimgSpace = $(this).data("id");
    }
});
$(".spaceSty .confirm").click(function() {
    var iid = selectiid();
    editImgSpaceStyle(iid, modimgSpace, modimgStyle, function() {
        $(".collect_success").text("修改完成").fadeIn(200).fadeOut(3000, function() {
            $(".spaceSty").fadeOut(500);
            $(".upload-mask").fadeOut(500);
        });

    }, function() {
        $(".collect_success").text("修改失败").fadeIn(200).fadeOut(3000, function() {
            $(".spaceSty").fadeOut(500);
            $(".upload-mask").fadeOut(500);
        });
    });
});

function selectiid() {
    var iid = [];
    $(".checkitem").each(function() {
        if ($(this).prop('checked')) {
            var id = $(this).data("id");
            iid.push(id);
        }
    });
    return iid.join(",");
}
$("#modifyintro").click(function() {
    var selectnum = $("#selectnum").text();
    if (selectnum == 0) {
        $(".collect_success").text("请至少选择一张图片").fadeIn(200).fadeOut(3000);
    } else {
        $(".editpicintro").show();
        $(".closeintro").click(function() {
            $(".editpicintro").hide();
        });
        $(".photos_btndele").click(function() {
            $(".editpicintro").hide();
        });
    }
});
$(".editpicintro .photos_btnsave").click(function() {
    var imgDesc = $("#modify_instro").val();
    var iid = selectiid();
    editImgDesc(iid, imgDesc, function() {
        $(".collect_success").text("修改完成").fadeIn(200).fadeOut(3000, function() {
            $(".editpicintro").hide();
        });

    }, function() {
        $(".collect_success").text("修改失败").fadeIn(200).fadeOut(3000, function() {
            $(".editpicintro").hide();
        });

    });
});
$("#selectall").click(function() {
    if ($("#selectall").prop('checked')) {
        $(".checkitem").prop('checked', true);
    } else {
        $(".checkitem").prop('checked', false);
    }
    $("#selectnum").text(checknum());
});

function checknum() {
    var i = 0;
    $(".checkitem").each(function() {
        if ($(this).prop('checked')) {
            i++;
        }
    });
    return i;
}
$(".checkitem").click(function(e) {
    e.stopPropagation();
    $("#selectnum").text(checknum());
    if (checknum() == $(".checkitem").length) {
        $("#selectall").prop('checked', true);
    } else {
        $("#selectall").prop('checked', false);
    }
});