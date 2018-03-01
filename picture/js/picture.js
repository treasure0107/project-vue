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
// 获取所有相册
var rowCount=25;
$(function(){
    getAlbumListbyName("",0,rowCount,function(data){
        var pageCount= Math.ceil(data.count/rowCount);
        $("#picItem").tmpl(data.albumList).appendTo('.picture-rtBody');
        $("#searPage").hide();
        $("#initPage").show();
        $("#initPage").createPage({
            pageCount:pageCount,
            current:1,
            backFn:function(p){
                getAlbumListbyName("",(p-1)*rowCount,rowCount,function(data){
                    $(".picture-rtBody").html('');
                    $("#picItem").tmpl(data.albumList).appendTo('.picture-rtBody');
                },function(err){
                    $("#nodata").tmpl().appendTo('.picture-rtBody');
                })
            }
        });
    },function(err){
        $("#nodata").tmpl().appendTo('.picture-rtBody');
    });
});
//搜索相册
$("#picture-search").keyup(function(){
    $(".picture-rtBody").html('');
    var picName=$(this).val();
    getAlbumListbyName(picName,0,rowCount,function(data){
        $(".tcdPageCode").show();
       var pageCou= Math.ceil(data.count/rowCount);
        $("#picItem").tmpl(data.albumList).appendTo('.picture-rtBody');
        $("#initPage").hide();
        $("#searPage").show();
        $("#searPage").createPage({
            pageCount:pageCou,
            current:1,
            backFn:function(p){
                getAlbumListbyName(picName,(p-1)*rowCount,rowCount,function(data){
                    $(".picture-rtBody").html('');
                    $("#picItem").tmpl(data.albumList).appendTo('.picture-rtBody');
                },function(err){
                    $("#nodata").tmpl().appendTo('.picture-rtBody');
                })
            }
        });
    },function(err){
        $("#nodata").tmpl().appendTo('.picture-rtBody');
        $(".tcdPageCode").hide();
    });
});

$("#newnAlbum").click(function(){
    //点击创建新建相册
    $(".new-photo").fadeIn(500);
    $(".upload-mask").fadeIn(500);
});
$(".picture-rtBody").on('click','#edit-photo',function(e){
    e.stopPropagation();
    e.preventDefault();
    var id=$(this).data("id");
    $(".edit-photo .confirm").attr('data-id',id);
    $(".edit-photo").fadeIn(500);
    $(".upload-mask").fadeIn(500);
});
$(".picture-rtBody").on('click','#edit-coverimg',function(e){
    e.stopPropagation();
    e.preventDefault();
    var coverimg=$(this).data('coverimg');
    var aid=$(this).data('id');
    // $(".confirm_cover").attr('data-id',aid);
    $("#addPic").attr('data-id',aid);
    $(".coverimg").css('background-image','url('+coverimg+')');
    $(".edit-coverimg").fadeIn(500);
    $(".upload-mask").fadeIn(500);
});
// $(".confirm_cover").click(function(){
//     var aid=$(this).data('id');
//     alert("fdgf");
// });
//
$("#addPic").on("change",function(){
    var aid=$(this).data('id');
    var formdata=new FormData($("#upImg")[0]);
    upImg(formdata,function(data){
        if(data.indexOf("MD5:")!=-1){
            var jqval=$(".re-list").html(data);
            var h1val=jqval.find("h1");
            $.each(h1val,function(i,item){
                var val=$(item).text();
                var imgurl=$.trim(val.substring(val.indexOf("MD5:") + 4))
                $(".coverimg").css('background-image','url('+imghost+imgurl+')');
                editAlbumAttrCover(aid,imgurl,function(data){
                    $(".collect_success").text("修改完成").fadeIn(200).fadeOut(3000,function(){
                        $(".edit-coverimg").fadeOut(500);
                        $(".upload-mask").fadeOut(500);
                        $(".picture-rtBody").html('');
                        var picName=$(this).val();
                        getAlbumListbyName(picName,0,rowCount,function(data){
                            $(".tcdPageCode").show();
                           var pageCou= Math.ceil(data.count/rowCount);
                            $("#picItem").tmpl(data.albumList).appendTo('.picture-rtBody');
                            $("#initPage").hide();
                            $("#searPage").show();
                            $("#searPage").createPage({
                                pageCount:pageCou,
                                current:1,
                                backFn:function(p){
                                    getAlbumListbyName(picName,(p-1)*rowCount,rowCount,function(data){
                                        $(".picture-rtBody").html('');
                                        $("#picItem").tmpl(data.albumList).appendTo('.picture-rtBody');
                                    },function(err){
                                        $("#nodata").tmpl().appendTo('.picture-rtBody');
                                    })
                                }
                            });
                        },function(err){
                            $("#nodata").tmpl().appendTo('.picture-rtBody');
                            $(".tcdPageCode").hide();
                        });
                    }); 
                },function(err){
                    $(".collect_success").text("修改失败").fadeIn(200).fadeOut(3000);
                });
            });
        }
    });
});
// 删除
$(".picture-rtBody").on('click','#dele-photo',function(e){
    e.stopPropagation();
    e.preventDefault();
    var aid=$(this).data('id');
    delAlbum(aid,function(data){
        $(".collect_success").text("删除相册完成").fadeIn(200).fadeOut(3000,function(){
            $(".picture-rtBody").html('');
            var picName=$(this).val();
            getAlbumListbyName(picName,0,rowCount,function(data){
                $(".tcdPageCode").show();
               var pageCou= Math.ceil(data.count/rowCount);
                $("#picItem").tmpl(data.albumList).appendTo('.picture-rtBody');
                $("#initPage").hide();
                $("#searPage").show();
                $("#searPage").createPage({
                    pageCount:pageCou,
                    current:1,
                    backFn:function(p){
                        getAlbumListbyName(picName,(p-1)*rowCount,rowCount,function(data){
                            $(".picture-rtBody").html('');
                            $("#picItem").tmpl(data.albumList).appendTo('.picture-rtBody');
                        },function(err){
                            $("#nodata").tmpl().appendTo('.picture-rtBody');
                        })
                    }
                });
            },function(err){
                $("#nodata").tmpl().appendTo('.picture-rtBody');
                $(".tcdPageCode").hide();
            });
        });
    },function(){
        $(".collect_success").text("删除相册失败").fadeIn(200).fadeOut(3000);
    });
});
//新建相册点击取消
$(".new-photo .cancel").click(function(){
    $(".new-photo").fadeOut(500);
    $(".upload-mask").fadeOut(500);
});
$(".new-photo .photo-hide").click(function(){
    $(this).parent().fadeOut(500);
    $(".upload-mask").fadeOut(500);
});
//新建相册点击取消
$(".edit-coverimg .cancel").click(function(){
    $(".edit-coverimg").fadeOut(500);
    $(".upload-mask").fadeOut(500);
});
$(".edit-coverimg .photo-hide").click(function(){
    $(this).parent().fadeOut(500);
    $(".upload-mask").fadeOut(500);
});
//新建相册点击取消
// $(".edit-photo .cancel").click(function(){
//     $(".edit-photo").fadeOut(500);
//     $(".upload-mask").fadeOut(500);
// });
$(".edit-photo .photo-hide").click(function(){
    $(this).parent().fadeOut(500);
    $(".upload-mask").fadeOut(500);
});

//新建相册点击保存
$(".new-photo .confirm").click(function(){
    var addAlName=$(".new-photo .photo-name").val();
    addAlbum(addAlName,"",function(data){
        $(".collect_success").text('创建完成').fadeIn(200).fadeOut(3000,function(){
            $(".new-photo").fadeOut(500);
            $(".upload-mask").fadeOut(500);
            $(".picture-rtBody").html('');
            var picName=$(this).val();
            getAlbumListbyName(picName,0,rowCount,function(data){
                $(".tcdPageCode").show();
               var pageCou= Math.ceil(data.count/rowCount);
                $("#picItem").tmpl(data.albumList).appendTo('.picture-rtBody');
                $("#initPage").hide();
                $("#searPage").show();
                $("#searPage").createPage({
                    pageCount:pageCou,
                    current:1,
                    backFn:function(p){
                        getAlbumListbyName(picName,(p-1)*rowCount,rowCount,function(data){
                            $(".picture-rtBody").html('');
                            $("#picItem").tmpl(data.albumList).appendTo('.picture-rtBody');
                        },function(err){
                            $("#nodata").tmpl().appendTo('.picture-rtBody');
                        })
                    }
                });
            },function(err){
                $("#nodata").tmpl().appendTo('.picture-rtBody');
                $(".tcdPageCode").hide();
            });
            // window.location.href='picDetail.html?aid='+data.aid+'&albumName='+addAlName;
        });
    },function(err){
        $(".collect_success").text("创建相册失败").fadeIn(200).fadeOut(3000);
    });
});
//修改相册名称
$(".edit-photo .confirm").click(function(){
    var aid=$(this).data('id');
    var photoName=$(".edit-photo .photo-name").val();
    editAlbumAttr(aid,photoName,function(data){
        $(".collect_success").text("修改完成").fadeIn(200).fadeOut(3000,function(){
            $(".edit-photo").fadeOut(500);
            $(".upload-mask").fadeOut(500);
             $(".picture-rtBody").html('');
            var picName=$(this).val();
            getAlbumListbyName(picName,0,rowCount,function(data){
                $(".tcdPageCode").show();
               var pageCou= Math.ceil(data.count/rowCount);
                $("#picItem").tmpl(data.albumList).appendTo('.picture-rtBody');
                $("#initPage").hide();
                $("#searPage").show();
                $("#searPage").createPage({
                    pageCount:pageCou,
                    current:1,
                    backFn:function(p){
                        getAlbumListbyName(picName,(p-1)*rowCount,rowCount,function(data){
                            $(".picture-rtBody").html('');
                            $("#picItem").tmpl(data.albumList).appendTo('.picture-rtBody');
                        },function(err){
                            $("#nodata").tmpl().appendTo('.picture-rtBody');
                        })
                    }
                });
            },function(err){
                $("#nodata").tmpl().appendTo('.picture-rtBody');
                $(".tcdPageCode").hide();
            });
        }); 
    },function(err){
        $(".collect_success").text("修改失败").fadeIn(200).fadeOut(3000);
    });
});
$(".picture-rtBody").on('click','.picture-edit',function(e){
    e.stopPropagation();
    e.preventDefault();
    $(this).parent().find("ul").toggle();
});

$(".picture-rtBody").on('mouseenter','.picture-rtImg',function(e){
    e.stopPropagation();
    e.preventDefault();
    $(this).find(".picture-edit").show();
    $(this).find("ul").hide();
});
$(".picture-rtBody").on('mouseleave','.picture-rtImg',function(e){
    e.stopPropagation();
    e.preventDefault();
    $(this).find(".picture-edit").hide();
    $(this).find("ul").hide();
});