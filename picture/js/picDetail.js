var aid=new UrlSearch().aid;//相册id
var albumName=decodeURI(new UrlSearch().albumName);//相册名字
var imgStyid=[];//风格id集合
var imgSpaid=[];//空间id集合
var imgSty;//风格ID字符串
var imgSpa;//空间ID字符串
var rowCount=25;
var currList=[];//预览图片数组
$(".picDetail-shows li").text(albumName).attr("data-id",aid).click(function(){
    window.location.href="picture.html";
});
$(".dele-pic").click(function(){
    delAlbum(aid,function(data){
        $(".collect_success").text("删除相册成功").fadeIn(200).fadeOut(3000,function(){
            location.href="picture.html";
        });
    },function(){
        $(".collect_success").text("删除相册失败").fadeIn(200).fadeOut(3000);
    });
});
function getAlbumPicAll(imgStyle,imgSpace){
    getAlbumPicList(imgStyle,imgSpace,aid,0,rowCount,function(data){
            $(".picDetail-body").html("");
            if (data.picList&& data.picList.length!=-1) {
                var pageCount= Math.ceil(data.count/rowCount);
            currList=data.picList;
            $(".picDetail-body").append(
                '<div class="upload-rtAdd">'+
                    '<h1>+</h1>'+
                    '<p>添加图片</p>'+
                    '<form id="upImg">'+
                        '<input type="file" name="file" multiple id="addPic">'+
                    '</form>'+
                '</div>'
            );
            $("#picItem").tmpl(data.picList).appendTo('.picDetail-body');
            if(data.picList.length){
                $(".tcdPageCode").show();
            }else{
                $(".tcdPageCode").hide();
            }
            $(".tcdPageCode").createPage({
                pageCount:pageCount,
                current:1,
                backFn:function(p){
                    getAlbumPicList(imgStyle,imgSpace,aid,(p-1)*rowCount,rowCount,function(data){
                        currList=data.picList;
                        $(".picDetail-body").html('');
                        $(".picDetail-body").append(
                            '<div class="picDetail-rtItem">'+
                                '<h1>+</h1>'+
                                '<p>添加图片</p>'+
                                '<form id="upImg">'+
                                    '<input type="file" name="file" multiple id="addPic">'+
                                '</form>'+
                            '</div>'
                        );
                        
                        $("#picItem").tmpl(data.picList).appendTo('.picDetail-body');
                    },function(err){
                        $("#nodata").tmpl().appendTo('.picDetail-body');
                    })
                }
            });
        }else{
             $(".picDetail-body").append(
                '<div class="picDetail-rtItem upload-rtAdd">'+
                    '<h1>+</h1>'+
                    '<p>添加图片</p>'+
                    '<form id="upImg">'+
                        '<input type="file" name="file" multiple id="addPic">'+
                    '</form>'+
                '</div>'
            );
        }
            
    },function(err){
        $("#nodata").tmpl().appendTo('.picture-rtBody');
    });       
}
//点击添加图片
$(".picDetail-body").on("change","#addPic",function(){
    var formdata=new FormData($("#upImg" )[0]);
    upImg(formdata,function(data){
        if(data.indexOf("MD5:")!=-1){
            var jqval=$(".re-list").html(data);
            var h1val=jqval.find("h1");
            var imgUrl={};
            var imgArr=[];

            $.each(h1val,function(i,item){
                var val=$(this).text();
                console.log(val);
                var imgurl=$.trim(val.substring(val.indexOf("MD5:") + 4))
                imgArr.push(imgurl);
                // $(".picDetail-body").append('<li style="background:url('+imghost+imgurl+'?w=236&h=220) center center no-repeat;" data-imgurl='+imgurl+'><span class="upload-rtDel"></span></li>')
            });
            // console.log(imgArr);
            imgUrl.list=imgArr;
            imgUrl=JSON.stringify(imgUrl);
            uploadPic(aid,albumName,'','',imgUrl,function(data){
                imgSty=imgStyid.length==1?imgStyid.join(""):imgStyid.join(",");
                imgSpa=imgSpaid.length==1?imgSpaid.join(""):imgSpaid.join(",");
                getAlbumPicAll(imgSty,imgSpa);
            },function(err){
                $(".collect_success").text(err).fadeIn(200).fadeOut(3000);
            });
        }
    });
});
getAlbumPicAll("","");
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
//获取空间风格分类
getClassify(function(data){
    for (var i = 0; i < data.obj.length; i++) {
        if (data.obj[i].parentId==9){//风格
            $(".picStyle-list").append('<li data-id='+data.obj[i].classifyId+'>'+data.obj[i].classifyName+'</li>');
            $(".editbox_style").append('<li data-id='+data.obj[i].classifyId+'>'+data.obj[i].classifyName+'</li>');
            $(".styleList").append('<li data-id='+data.obj[i].classifyId+'>'+data.obj[i].classifyName+'</li>');
        }
        if (data.obj[i].parentId==19){//空间
            $(".picSpace-list").append('<li data-id='+data.obj[i].classifyId+'>'+data.obj[i].classifyName+'</li>');
            $(".editbox_space").append('<li data-id='+data.obj[i].classifyId+'>'+data.obj[i].classifyName+'</li>');
            $(".spaceList").append('<li data-id='+data.obj[i].classifyId+'>'+data.obj[i].classifyName+'</li>');
        }
    }
},function(data){
    $(".collect_success").text(data).fadeIn(200).fadeOut(3000);
});
//点击编辑相册名称
$(".edit-pic").click(function(){
    $(".new-photo").fadeIn(500);
    $(".upload-mask").fadeIn(500);
    $(".photo-name").val(albumName);
});
$(".new-photo .cancel").click(function(){
    $(".new-photo").fadeOut(500);
    $(".upload-mask").fadeOut(500);
    delAlbum(aid,function(data){
        $(".collect_success").text("删除相册成功").fadeIn(200).fadeOut(3000,function(){
            location.href="picture.html";
        });
    },function(){
        $(".collect_success").text("删除相册失败").fadeIn(200).fadeOut(3000);
    });
});
$(".photo-hide").click(function(){
    $(".new-photo").fadeOut(500);
    $(".upload-mask").fadeOut(500);
});
//点击保存
$(".new-photo .confirm").click(function(){
    var photoName=$(".photo-name").val();
    editAlbumAttr(aid,photoName,function(data){
        $(".collect_success").text("编辑成功").fadeIn(200).fadeOut(3000,function(){
            $(".new-photo").fadeOut(500);
            $(".upload-mask").fadeOut(500);
        }); 
    },function(err){
        $(".collect_success").text("编辑失败").fadeIn(200).fadeOut(3000);
    });
});;
//空间ID获取
$(".picSpace-list").on("click","li",function(){
    var nameval=$(this).text();
    var id=$(this).data('id');
    if ($(this).hasClass('leftactive')) {
        $(this).removeClass('leftactive');
        imgSpaid.splice(imgStyid.indexOf(id),1);
        $(".photos_taps>ul li").each(function(){
            if ($(this).data('id')==id) {
                $(this).remove();
            }
        });
        imgSty=imgStyid.length==1?imgStyid.join(""):imgStyid.join(",");
        imgSpa=imgSpaid.length==1?imgSpaid.join(""):imgSpaid.join(",");
        getAlbumPicAll(imgSty,imgSpa);
        // removeByValue(imgStyle, id)
    }else{
        // imgStyle.push(id);
        $(this).addClass('leftactive');
        if(imgSpaid.indexOf(id)==-1){
            imgSpaid.push(id);
            $(".photos_taps>ul").append('<li data-type="space" data-id='+id+'>'+nameval+'</li>');
            imgSty=imgStyid.length==1?imgStyid.join(""):imgStyid.join(",");
            imgSpa=imgSpaid.length==1?imgSpaid.join(""):imgSpaid.join(",");
            getAlbumPicAll(imgSty,imgSpa);
        }
    }
    
});
//风格ID获取
$(".picStyle-list").on("click","li",function(){
    var nameval=$(this).text();
    var id=$(this).data('id');
     if ($(this).hasClass('leftactive')) {
        $(this).removeClass('leftactive');
        imgStyid.splice(imgStyid.indexOf(id),1);
        $(".photos_taps>ul li").each(function(){
            if ($(this).data('id')==id) {
                $(this).remove();
            }
        });
        imgSty=imgStyid.length==1?imgStyid.join(""):imgStyid.join(",");
        imgSpa=imgSpaid.length==1?imgSpaid.join(""):imgSpaid.join(",");
        getAlbumPicAll(imgSty,imgSpa);
    }else{
        // imgStyle.push(id);
        $(this).addClass('leftactive');
        if(imgStyid.indexOf(id)==-1){
            imgStyid.push(id);
            $(".photos_taps>ul").append('<li data-type="style" data-id='+id+'>'+nameval+'</li>');
            imgSty=imgStyid.length==1?imgStyid.join(""):imgStyid.join(",");
            imgSpa=imgSpaid.length==1?imgSpaid.join(""):imgSpaid.join(",");
            getAlbumPicAll(imgSty,imgSpa);
        }
    }
    
});
//删除空间或者风格
$(".picDetail-show").on("click","span",function(){
    if($(this).parent().data("type")=="style"){
        var styId=$(this).parent().data("id");
        imgStyid.splice(imgStyid.indexOf(styId),1);

        imgSty=imgStyid.length==1?imgStyid.join(""):imgStyid.join(",");
        imgSpa=imgSpaid.length==1?imgSpaid.join(""):imgSpaid.join(",");
        getAlbumPicAll(imgSty,imgSpa);
        $(this).parent().remove();
    }else{
        var spaId=$(this).parent().data("id");
        imgSpaid.splice(imgStyid.indexOf(spaId),1);
        imgSty=imgStyid.length==1?imgStyid.join(""):imgStyid.join(",");
        imgSpa=imgSpaid.length==1?imgSpaid.join(""):imgSpaid.join(",");
        getAlbumPicAll(imgSty,imgSpa);
        $(this).parent().remove();
    }
});
//删除空间或者风格
$(".photos_taps>ul").on("click","li",function(){
    if($(this).data("type")=="style"){
        var styId=$(this).data("id");
        imgStyid.splice(imgStyid.indexOf(styId),1);
        imgSty=imgStyid.length==1?imgStyid.join(""):imgStyid.join(",");
        imgSpa=imgSpaid.length==1?imgSpaid.join(""):imgSpaid.join(",");
        getAlbumPicAll(imgSty,imgSpa);
        $(this).remove();
        $(".picStyle-list li").each(function(){
            if ($(this).data("id")==styId) {
                $(this).removeClass('leftactive');
            }
        });
    }else{
        var spaId=$(this).data("id");
        imgSpaid.splice(imgStyid.indexOf(spaId),1);
        imgSty=imgStyid.length==1?imgStyid.join(""):imgStyid.join(",");
        imgSpa=imgSpaid.length==1?imgSpaid.join(""):imgSpaid.join(",");
        getAlbumPicAll(imgSty,imgSpa);
        $(this).remove();
        $(".picSpace-list li").each(function(){
            if ($(this).data("id")==spaId) {
                $(this).removeClass('leftactive');
            }
        });
    }
});
$(".picDetail-body").on("click",".picDetail-edit",function(e){
    e.stopPropagation();
    $(".editpic").fadeIn(500);
    var iid=$(this).data("iid");
    var imgSpaces='';
    var imgStyles='';
    getPicAttr(iid,function(data){
        if(data.imgDesc){
            $('#editbox_instro').val(data.imgDesc)
        }else{
            $('#editbox_instro').val('')
        }
        if(data.imgSpace){
            $(".editbox_space li").each(function(){
                if ($(this).data('id')==data.imgSpace) {
                    $(this).addClass('liactive').siblings().removeClass('liactive');
                }
            });
            imgSpaces=data.imgSpace;
        }else{
            $(".editbox_space li").removeClass('liactive');
        }
        if(data.imgStyle){
            $(".editbox_style li").each(function(){
                if ($(this).data('id')==data.imgStyle) {
                    $(this).addClass('liactive').siblings().removeClass('liactive');
                }
            });
            imgStyles=data.imgStyle;
        }else{
            $(".editbox_style li").removeClass('liactive');
        }
        $(".editbox_space li").click(function(){
            $(this).addClass("liactive").siblings().removeClass("liactive");
            imgSpaces=$(this).data("id");
        });
        $(".editbox_style li").click(function(){
            $(this).addClass("liactive").siblings().removeClass("liactive");
            imgStyles=$(this).data("id");
        });
        //点击图片编辑保存
        $(".photos_btnsave").click(function(){
            var imgDesc=$('#editbox_instro').val();
            editPicAttr(iid,imgDesc,imgSpaces,imgStyles,function(){
                $(".collect_success").text('修改完成').fadeIn(200).fadeOut(3000,function(){
                    $(".editpic").fadeOut(500);
                });
            },function(){
                $(".collect_success").text('修改失败').fadeIn(200).fadeOut(3000);
            });
        });
        //点击图片删除
        $(".photos_btndele").click(function(e){
            e.stopPropagation();
            delPic(iid,function(){
                $(".collect_success").text('删除完成').fadeIn(200).fadeOut(3000,function(){
                    $(".editpic").fadeOut(500);
                    getAlbumPicAll(imgSty,imgSpa);
                }); 
            }, function(){
                $(".collect_success").text('删除失败').fadeIn(200).fadeOut(3000,function(){
                    $(".editpic").fadeOut(500);
                });     
            })
        });
    },function(err){
        $(".collect_success").text(err).fadeIn(200).fadeOut(3000);
    });
});
//图片编辑关闭
$(".closewin").click(function(){
    $(".editpic").fadeOut(500);
});
$(".bigimg_close").click(function(){
    $(".bigimg").hide();
});

$(".picDetail-body").on('click',".picDetail-rtItem",function(){
    $(".bigimg").show();
    var index=$(this).index();
    imgSty=imgStyid.length==1?imgStyid.join(""):imgStyid.join(",");
    imgSpa=imgSpaid.length==1?imgSpaid.join(""):imgSpaid.join(",");
    $(".swiper-wrapper").html("");
    // getAlbumPicList(imgSty,imgSpa,aid,0,1000,function(data){
        $.each(currList,function(index,item){
            if (!item.imgSpaceName) {
                item.imgSpaceName="无";
            }
            if (!item.imgStyleName) {
                item.imgStyleName="无";
            }
            item.spacestyle=item.imgSpaceName+"/"+item.imgStyleName
            $("#bigimg").tmpl(item).appendTo('.swiper-wrapper');
        });
        $(".abimg").text(albumName);
        var swiper = new Swiper('.swiper-container', {
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            // pagination: '.swiper-pagination',
            paginationClickable: true,
            initialSlide:index,
            observer:true,//修改swiper自己或子元素时，自动初始化swiper
            observeParents:true,//修改swiper的父元素时，自动初始化swiper
            onSlideChangeEnd:function(swiper){
            },
            // Disable preloading of all images
            preloadImages: false,
            // Enable lazy loading
            lazyLoading:true
    });
    // },function(err){
    //     $(".collect_success").text(err).fadeIn(200).fadeOut(3000);
    // });

});

$(".more-edit").click(function(){
    $(".picDetail-edit").hide();
    $(".picDetail-rtHead").hide();
    $(".editall").show();
    $(".checkitem").show();
});
$(".closeedit").click(function(){
    $(".picDetail-edit").show();
    $(".picDetail-rtHead").show();
    $(".editall").hide();
    $(".checkitem").hide();
});
function checknum(){
    var i=0;
    $(".checkitem").each(function(){
        if ($(this).prop('checked')) {
            i++;
        }
    });
    return i;
}
function selectiid(){
    var iid=[];
    $(".checkitem").each(function(){
        if ($(this).prop('checked')) {
            var id=$(this).data("id");
            iid.push(id);
        }
    });
    return iid.join(",");
}
$(".picDetail-body").on('click','.checkitem',function(e){
    e.stopPropagation();
    $("#selectnum").text(checknum());
    if (checknum()==$(".checkitem").length) {
        $("#selectall").prop('checked',true);
    }else{
        $("#selectall").prop('checked',false);
    }
});
$("#selectall").click(function(){
    if ($("#selectall").prop('checked')) {
        $(".checkitem").prop('checked',true);
    }else{
        $(".checkitem").prop('checked',false);
    }
    $("#selectnum").text(checknum()); 
});

$("#modifyintro").click(function(){
    var selectnum=$("#selectnum").text();
    if (selectnum==0) {
        $(".collect_success").text('请至少选择一张图片').fadeIn(200).fadeOut(3000);
    }else{
        $(".editpicintro").show();
        $(".closeintro").click(function(){
            $(".editpicintro").hide();
        });
        $(".photos_btndele").click(function(){
            $(".editpicintro").hide();
        });
    }
});
$(".editpicintro .photos_btnsave").click(function(){
    var imgDesc=$("#modify_instro").val();
    var iid=selectiid();
    editImgDesc(iid,imgDesc,function(){
        $(".collect_success").text("修改完成").fadeIn(200).fadeOut(3000,function(){
            $(".editpicintro").hide();
        });
    },function(){
        $(".collect_success").text("修改失败").fadeIn(200).fadeOut(3000,function(){
            $(".editpicintro").hide();
        });
    });
}); 

var modimgSpace="";
var modimgStyle="";
//风格样式
$(".styleList").on("click","li",function(){
    if($(this).hasClass("active")){
        $(this).removeClass("active");
        modimgStyle="";
    }else{
        $(this).addClass("active").siblings().removeClass("active");
        modimgStyle=$(this).data("id");
    }
});
//空间样式
$(".spaceList").on("click","li",function(){

    if($(this).hasClass("active")){
        $(this).removeClass("active");
        modimgSpace="";
    }else{
        $(this).addClass("active").siblings().removeClass("active");
        modimgSpace=$(this).data("id");
    }
});
$("#modifyspace").click(function(){
    var selectnum=$("#selectnum").text();
    if (selectnum==0) {
        $(".collect_success").text("请至少选择一张图片").fadeIn(200).fadeOut(3000);
    }else{
        $(".spaceList li").removeClass("active");
        $(".styleList li").removeClass("active");
        $(".spaceSty").show();
        $(".upload-mask").show();
    }
});
$(".spaceSty .photo-hide").click(function(){
    $(this).parent().fadeOut(500);
    $(".upload-mask").fadeOut(500);
});
$(".spaceSty .cancel").click(function(){
    $(".spaceSty").fadeOut(500);
    $(".upload-mask").fadeOut(500);
});
$(".spaceSty .confirm").click(function(){
    var iid=selectiid();
    editImgSpaceStyle(iid,modimgSpace,modimgStyle,function(){
        $(".collect_success").text("修改完成").fadeIn(200).fadeOut(3000,function(){
            $(".spaceSty").fadeOut(500);
            $(".upload-mask").fadeOut(500);
        });  
    },function(){
        $(".collect_success").text("修改失败").fadeIn(200).fadeOut(3000,function(){
            $(".spaceSty").fadeOut(500);
            $(".upload-mask").fadeOut(500);
        });
    });
});

$("#moveto").click(function(){
    var selectnum=$("#selectnum").text();
    if (selectnum==0) {
        $(".collect_success").text("请至少选择一张图片").fadeIn(200).fadeOut(3000);
    }else{
        $(".new-photos").fadeIn(500);
        $(".upload-mask").fadeIn(500);
    }
});

//点击选择相册
$(".photo-name").click(function(){
    //获取用户所有相册
    $(".upload-rtAll").html("");
    getAlbumList(function(data){
        $(".upload-rtAll").fadeIn(500);
        if(data.obj!=""){
            $.each(data.obj.albumList,function(i,val){
                $(".upload-rtAll").append('<li data-aid='+val.aid+'>'+val.albumName+'</li>');
            });
            $(".upload-rtAll li").click(function(){
                $(".photo-name").val($(this).text());
                $(".photo-name").attr("data-aid",$(this).data("aid"));
                $(".upload-rtAll").fadeOut(500);
            });
        }
    },function(data){
        $(".collect_success").text(data).fadeIn(200).fadeOut(3000);
    });
});

// 移动至相册删除
$(".new-photos .photo-hide").click(function(){
    $(this).parent().fadeOut(500);
    $(".upload-mask").fadeOut(500);
});
//移动至相册点击取消
$(".new-photos .cancel").click(function(){
    $(".new-photos").fadeOut(500);
    $(".upload-mask").fadeOut(500);
});
//移动至相册点击保存
$(".new-photos .confirm").click(function(){
    var iid=selectiid();
    var aid=$(".photo-name").data('aid');;
    editImgAid(iid,aid,function(){
        $(".collect_success").text("移动完成").fadeIn(200).fadeOut(3000,function(){
            $(".new-photos").hide(500);
            $(".upload-mask").hide(500);
        });
        
    },function(){
        $(".collect_success").text("移动失败").fadeIn(200).fadeOut(3000);
        $(".new-photos").hide(500);
        $(".upload-mask").hide(500);
    });
});

$("#deleteall").click(function(){
    var selectnum=$("#selectnum").text();
    if (selectnum==0) {
        $(".collect_success").text("请至少选择一张图片").fadeIn(200).fadeOut(3000);
    }else{
        var iid=selectiid();
        editImgDel(iid,function(){
            $(".collect_success").text("删除完成").fadeIn(200).fadeOut(3000,function(){
                $(".photos_imglist").html('');
                imgSty=imgStyid.length==1?imgStyid.join(""):imgStyid.join(",");
                imgSpa=imgSpaid.length==1?imgSpaid.join(""):imgSpaid.join(",");
                getAlbumPicAll(imgSty,imgSpa);
            });
            
        },function(){
            $(".collect_success").text("删除失败").fadeIn(200).fadeOut(3000);
        });
    }
});