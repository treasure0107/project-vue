$(function(){
    //头像
    $(".upload-lfImg").css({"background":"url("+localStorage.logoUrl+") center center no-repeat","background-size":"cover"});
    $("#userName").text(localStorage.nickName);
    $(".photos_itemups").mouseenter(function(){
    $('.layout').show();
});
$(".photos_itemups").mouseleave(function(event) {
    /* Act on the event */
    $('.layout').hide();
});

$('.layout').click(function(){
    localStorage.removeItem("uid");
    window.location.href='../index.html';
});
$(".upload-rt").click(function(){
    $(".upload-rtAll").fadeOut(500);
});
    //判断该用户是否有相册
    // getAlbumList(function(data){
    //     $(".selectPic").show();
    //     $(".createPic").hide();
    // },function(data){
    //     $(".createPic").show();
    //     $(".selectPic").hide();
    // });
    //获取分类
    getClassify(function(data){
        $.each(data.obj,function(i,val){
            //风格
            if (val.parentId==9){
                $(".styleList").append('<li data-classifyid='+val.classifyId+'>'+val.classifyName+'</li>');
            }
            //    空间
            if (val.parentId==19){
                $(".spaceList").append('<li data-classifyid='+val.classifyId+'>'+val.classifyName+'</li>');
            }
        });
    },function(err){
        $(".collect_success").text(err).fadeIn(200).fadeOut(3000);
    });
});
//点击创建新建相册
$(".createPic").click(function(){
    $(".new-photo").fadeIn(500);
    $(".upload-mask").fadeIn(500);
});
// 新建相册删除
$(".new-photo .photo-hide").click(function(){
    $(this).parent().fadeOut(500);
    $(".upload-mask").fadeOut(500);
});
//新建相册点击取消
$(".new-photo .cancel").click(function(){
    $(".new-photo").fadeOut(500);
    $(".upload-mask").fadeOut(500);
});
//新建相册点击保存
$(".new-photo .confirm").click(function(){
    var addAlName=$(".photo-name").val();
    addAlbum(addAlName,"",function(data){
        $(".selectPic").val(addAlName);
        getAlbumList(function(data){
            if(data.obj!=""){
                $.each(data.obj.albumList,function(i,val){
                    if (val.albumName==addAlName) {
                        $(".selectPic").attr("data-aid",val.aid);
                    }
                });
            }
        },function(data){
            $(".collect_success").text(data).fadeIn(200).fadeOut(3000);
        });
        $(".new-photo").fadeOut(500);
        $(".upload-mask").fadeOut(500);
    },function(err){
        $(".collect_success").text("创建相册失败").fadeIn(200).fadeOut(3000);
    })
});
var stySpa={};
//风格样式
$(".styleList").on("click","li",function(){
    if($(this).hasClass("active")){
        $(this).removeClass("active");
        imgStyle="";
        styName="";
        stySpa.styName=styName;
    }else{
        $(this).addClass("active").siblings().removeClass("active");
        imgStyle=$(this).data("classifyid");
        styName=$(this).text();
        stySpa.styName=styName;
    }
});
//空间样式
$(".spaceList").on("click","li",function(){
    if($(this).hasClass("active")){
        $(this).removeClass("active");
        imgSpace="";
        spaName="";
        stySpa.spaName=spaName;
    }else{
        $(this).addClass("active").siblings().removeClass("active");
        imgSpace=$(this).data("classifyid");
        spaName=$(this).text();
        stySpa.spaName=spaName;
    }
});
$(".spaceSty .confirm").click(function(){
    $(".spaceSty").fadeOut(500);
    $(".upload-mask").fadeOut(500);
    if(styName&&spaName){
        $(".selectStyce").val(styName+"、"+spaName);
    }else if(styName){
        $(".selectStyce").val(styName);
    }else{
        $(".selectStyce").val(spaName);
    }
});
var imgSpace,imgStyle;
//选择空间风格弹框隐藏
$(".selectStyce").click(function(){
    $(".upload-mask").show();
    $(".spaceSty").show();
    var styname=stySpa.styName;
    var spaname=stySpa.spaName;
    $(".styleList li").each(function(i,val){
        if(styname==$(this).text()){
            $(this).addClass("active").siblings().removeClass("active");
        }
    });
    $(".spaceList li").each(function(i,val){
        if(spaname==$(this).text()){
            $(this).addClass("active").siblings().removeClass("active");
        }
    });
});
$(".spaceSty .photo-hide").click(function(){
    $(this).parent().fadeOut(500);
    $(".upload-mask").fadeOut(500);
});
$(".spaceSty .cancel").click(function(){
    $(".spaceSty").fadeOut(500);
    $(".upload-mask").fadeOut(500);
});
//点击添加图片
$("#addPic").on("change",function(){
    var formdata=new FormData($("#upImg" )[0]);
    upImg(formdata,function(data){
        if(data.indexOf("MD5:")!=-1){
            var jqval=$(".re-list").html(data);
            var h1val=jqval.find("h1");
            $.each(h1val,function(i,item){
                var val=$(item).text();
                var imgurl=$.trim(val.substring(val.indexOf("MD5:") + 4))
                $(".upload-rtBody").append('<li style="background:url('+imghost+imgurl+'?w=236&h=220) center center no-repeat;" data-imgurl='+imgurl+'><span class="upload-rtDel"></span></li>')
            });
        }
    });
});
//删除图片
$(".upload-rtBody").on("click",".upload-rtDel",function(){
    $(this).parent().remove();
});
//点击选择相册
$(".selectPic").click(function(){
    //获取用户所有相册
    $(".upload-rtAll").html("");
    getAlbumList(function(data){
        $(".upload-rtAll").fadeIn(500);
        if(data.obj!=""){
            $.each(data.obj.albumList,function(i,val){
                $(".upload-rtAll").append('<li data-aid='+val.aid+'>'+val.albumName+'</li>');
            });
            $(".upload-rtAll li").click(function(){
                $(".selectPic").val($(this).text());
                $(".selectPic").attr("data-aid",$(this).data("aid"));
                $(".upload-rtAll").fadeOut(500);
            });
        }
    },function(data){
        $(".collect_success").text(data).fadeIn(200).fadeOut(3000);
    });
});
//上传相册
$(".upload-req").click(function(){
    var aid,albumName;
    var imgUrl={};
    var imgArr=[];
    aid=$(".selectPic").data("aid");
    albumName=$(".selectPic").val();
    $(".upload-rtBody li:not(:first-child)").each(function(i,val){
        imgArr.push($(this).data("imgurl"));
    });
    imgUrl.list=imgArr;
    imgUrl=JSON.stringify(imgUrl);
    if(albumName==""){
        $(".collect_success").text("请选择或填写相册").fadeIn(200).fadeOut(3000);
    }else{
        uploadPic(aid,albumName,imgSpace,imgStyle,imgUrl,function(data){
            location.href="../picture/picture.html";
        },function(err){
            $(".collect_success").text(err).fadeIn(200).fadeOut(3000);
        });
    }
});
