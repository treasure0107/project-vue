
$(function(){
    if(document.all && !document.addEventListener){
        // IE8以下
        
        $("body").append('<div class="tishi" style="position: fixed;bottom: 0;width:100%;left: 0;height: 50px;text-align: center;line-height: 50px;background-color: #000">您当前正在使用旧版IE浏览器，为了保证您的浏览体验，简单住建议您使用：谷歌浏览器或火狐浏览器</div>');
    }else{
        $(".tishi").remove();
    }
    //头部公用
    $("body").prepend('<header>' +
        '    <nav>' +
        '        <div class="nav-left fl">' +
        '            <a href="'+spacecode+'module/siteLib/siteLib.html" class="nav-promise" title="约工地-简单住">约工地<span class="nav-promiseActive"></span></a>' +
        '            <a href="javascript:void(0);" class="nav-friend" title="装友圈-简单住">装友圈<span class="nav-friendActive"></span></a>' +
        '            <a href="'+spacecode+'module/map/map.html" class="nav-map" title="地图找工地-简单住">地图找工地<span class="nav-mapActive"></span></a>' +
        '        </div>' +
        '        <div class="nav-right fr">' +
        '            <a href="../../index.html" class="nav-index" title="首页-简单住"><span>首页</span></a><i class="index-border"></i><a href="javascript:void(0);" class="nav-mobile" title="移动端-简单住"><span>简单住移动端</span><div class="nav-mobCode"><b></b><p>HomeyeUp简单住微信公众号</p></div></a><i></i><a href="javascript:void(0);" class="nav-my" title="我的预约-简单住">我的预约<span class="nav-count">12</span></a><i></i><b class="nav-login login-before" title="请登录-简单住">请登录</b><b class="nav-login-after"><span></span>' +
        '                <b></b>' +
        '                <div class="nav-loginShow">' +
        '                    <div></div>' +
        '                    <b class="nav-pointer"></b>' +
        '                    <a href="'+spacecode+'module/ringFriend/myappoint.html" class="nav-item nav-loginedMise">我的预约工地<span class="nav-miseCount"></span></a>' +
        '                    <a href="'+spacecode+'module/ringFriend/myatten.html" class="nav-item nav-loginedAtten">我关注的项目<span class="nav-attenCount"></span></a>' +
        '                    <a href="'+spacecode+'module/ringFriend/historylook.html" class="nav-item nav-loginedHistory">历史浏览项目</a>' +
        // '                    <a href="'+spacecode+'module/decorateRecord/messageRecord.html" class="nav-item nav-loginedInfo">我的最新消息<span class="nav-infoCount"></span></a>' +
        '                    <a href="javascript:void(0);" class="nav-out nav-item">退出</a>' +
        '                </div>'+
        '            </b><i></i>'+
        '            <a href="'+spacecode+'module/photos/photos.html" class="nav-service" target="_blank" title="发布工地-简单住">发布工地</a>' +
        '        </div>' +
        '    </nav>' +
        '</header>');
        //登录完成之后的鼠标移入移出事件
        $(".nav-login-after").mouseenter(function(){
            $(".nav-loginShow").show();
        });
        $(".nav-loginShow").mouseleave(function(){
            $(".nav-loginShow").hide();
        });
        //退出登录
        $(".nav-out").click(function(e){
            e.stopPropagation();
            localStorage.clear();
            location.reload();
        });
        //选择登录方式（手机登录还是微信登录）
        $(".login-sel span").click(function(){
            $(this).addClass("active").siblings().removeClass("active");
            $(".login-style>div").eq($(this).index()).show().siblings().hide();
        });
        //点击装友圈进行判断
        $(".nav-friend,.index-middleTwo").click(function(){
            if(localStorage.uid){
                location.href=spacecode+'module/ringFriend/friendcircle.html';
            }else{
                $(".login").fadeIn(200);
            }
        });
        //点击我的预约进行判断
        $(".nav-my").click(function(){
            if(localStorage.uid){
                location.href=spacecode+'module/ringFriend/myappoint.html';
            }else{
                $(".login").fadeIn(200);
            }
        });
        //点击请登录
        $(".nav-login").click(function(){
            $(".login").fadeIn(200);
        });
        //点击取消登录
        $(".login-cancel").click(function(){
            $(".login").fadeOut(200);
        });
        //勾选七天免登录
        $(".login-select span").click(function(){
            if($(this).hasClass('active')){
                $(this).removeClass("active");
            }else{
                $(this).addClass("active");
            }
        });
        //七天免登陆数据存取
        if(getCookie('login')){
            var loginInfo=JSON.parse(getCookie('login'));
            localStorage.logoUrl = loginInfo.logoUrl;
            localStorage.uid = loginInfo.uid;
            localStorage.mobile = loginInfo.mobile;
            localStorage.nickName = loginInfo.nickName;
        }else{
            // localStorage.clear();
        }
        // 获取验证码
        $(".login-userRe").click(function() {
            var mobile = $(".login-userMobile").val();
            console.log(mobile);
            if (!(/^1[34578]\d{9}$/.test(mobile))) {
                $(".collect_success").text("手机号码有误，请重填").fadeIn(200).fadeOut(1000);
            } else {
                sendMsg(mobile, function(data) {
                    $(".collect_success").text("验证码发送成功，请注意查收").fadeIn(200).fadeOut(1000);
                    var count = 60;
                    var codeTime = setInterval(function() {
                        if (count == 0) {
                            $(".login-userRe").removeAttr("disabled");
                            $(".login-userRe").val("重新发送");
                            count = 60;
                            clearInterval(codeTime);
                        } else {
                            $(".login-userRe").attr("disabled", "disabled");
                            $(".login-userRe").val(count + "S");
                            count--;
                        }
                    }, 1000)
                }, function(err) {
                    $(".collect_success").text(err.msg).fadeIn(200).fadeOut(1000);
                });
            }
        });
        //点击登录
        $(".login-submit").click(function(){
            var mobile = $(".login-userMobile").val();
            var code = $(".login-userCode").val();
            if (!(/^1[34578]\d{9}$/.test(mobile))) {
                $(".collect_success").text("手机号码有误，请重填").fadeIn(200).fadeOut(1000);
            } else if (code == "") {
                $(".collect_success").text("请输入验证码").fadeIn(200).fadeOut(1000);
            } else {
                login(mobile, code, function(data) {
                    $(".collect_success").fadeOut(100);
                    localStorage.logoUrl = data.logoUrl;
                    localStorage.uid = data.uid;
                    localStorage.mobile = data.mobile;
                    localStorage.nickName = data.nickName;
                    console.log(data.logoUrl);
                    //装友圈头像昵称处理
                    location.reload();
                    $(".collect_success").text("登录成功").fadeIn(200).fadeOut(1000,function(){
                        $(".login").fadeOut(200);
                        $(".nav-login-after>span").text('欢迎，'+data.nickName);
                        $(".nav-login-after").addClass("active").siblings('.nav-login').hide();
                        if($(".login-select span").hasClass("active")){
                            setCookie('login',JSON.stringify(data),7);
                        }
                        //关注项目以及项目回复数展示
                        getUserCount(function(data){
                            // if(data.followCount!=0){//关注的项目数
                            //     $(".nav-attenCount,.aside-likeCont").text(data.followCount);
                            // }else{
                            //     $(".nav-attenCount,.aside-likeCont").hide();
                            // }
                            if(data.waitForVisit!=0){//预约的工地数
                                $(".nav-count,.nav-miseCount,.aside-proCount").text(data.waitForVisit).css("opacity",1);
                                $(".aside-promise").css('padding-bottom',"30px");
                                $(".aside-likeHover").css('top',"127px");
                                $(".aside-historyHover").css('top',"157px");
                            }else{
                                $(".nav-count,.nav-miseCount,.aside-proCount").css("opacity",0);
                                $(".aside-promise").css('padding-bottom',"9px");
                            }
                        },function(err){});
                    });
                }, function(data) {
                    $(".collect_success").text("登录失败").fadeIn(200).fadeOut(1000);
                });
            }
        });
    //通过uid判断是否登录
    if(localStorage.uid){
        //立即预约获取用户最后一次访问数据
        getLastVisitInfo(function(data){
            $("#mobile").val(data.mobile);
            $("#txt_calendar").val(data.visitDate);
            $("#decorateBudget").val(data.decorateBudget);
            $("#decorateSize").val(data.decorateSize);
            $("#proName").val(data.proName);
            $("#decoration_style").val(data.styleName);
            $(".visit_time span").each(function(i,val){
                if($(this).data('time').split('~')[0]==data.visitTime.split('-')[0]){
                    $(this).addClass('vt_active').siblings().removeClass('vt_active');
                }
            });
            if(!data.freeVisitCount){
                $("#visitBtn").css({'background-color':'#ccc','cursor':'default'}).attr('disabled','true');
            }
            $(".visit-tip span").text(data.freeVisitCount);
        },function(err){});
        $(".nav-login-after").addClass("active");
        $(".nav-login-after>span").text('欢迎，'+localStorage.nickName);
        $(".ar_mainRight h1 span").text(localStorage.nickName);
        $(".nav-login").hide();
        getUserCount(function(data){
            // if(data.followCount!=0){//关注的项目数
            //     $(".nav-attenCount,.aside-likeCont").text(data.followCount);
            // }else{
            //     $(".nav-attenCount,.aside-likeCont").hide();
            // }
            if(data.waitForVisit!=0){//预约的工地数
                $(".nav-count,.nav-miseCount,.aside-proCount").text(data.waitForVisit).css("opacity",1);
                $(".aside-promise").css('padding-bottom',"30px");
                $(".aside-likeHover").css('top',"127px");
                $(".aside-historyHover").css('top',"157px");
            }else{
                $(".nav-count,.nav-miseCount,.aside-proCount").css("opacity",0);
                $(".aside-promise").css('padding-bottom',"9px");
            }
        },function(err){});
    }
});
$(function() {
    //扫码微信登录
    if (!localStorage.uid) {
        var code=(new UrlSearch()).code;
        if (code) {
            $(".collect_success").text("正在登录。。。").fadeIn(200);
            loginByWeb(code,function(data){
                localStorage.logoUrl = data.logoUrl;
                localStorage.uid = data.uid;
                localStorage.mobile = data.mobile;
                localStorage.nickName = data.nickName;
                // location.reload();
                $(".collect_success").text("登录成功").fadeIn(200).fadeOut(1000,function(){
                    $(".login").fadeOut(200);
                    $(".nav-login-after>span").text('欢迎，'+data.nickName);
                    $(".nav-login-after").addClass("active").siblings('.nav-login').hide();
                    if($(".login-select span").hasClass("active")){
                        setCookie('login',JSON.stringify(data),7);
                    }
                    //关注项目以及项目回复数展示
                    getUserCount(function(data){
                        // if(data.followCount!=0){//关注的项目数
                        //     $(".nav-attenCount,.aside-likeCont").text(data.followCount);
                        // }else{
                        //     $(".nav-attenCount,.aside-likeCont").hide();
                        // }
                        if(data.waitForVisit!=0){//预约的工地数
                            $(".nav-count,.nav-miseCount,.aside-proCount").text(data.waitForVisit).css("opacity",1);
                            $(".aside-promise").css('padding-bottom',"30px");
                            $(".aside-likeHover").css('top',"127px");
                            $(".aside-historyHover").css('top',"157px");
                        }else{
                            $(".nav-count,.nav-miseCount,.aside-proCount").css("opacity",0);
                            $(".aside-promise").css('padding-bottom',"9px");
                        }
                    },function(err){});
                });
            },function(){
                $(".collect_success").text("登录失败").fadeIn(200).fadeOut(3000);
            })
        }
    }
});
//单击下一页或者翻页
$("#searPage").on('click','.tcdNumber',function(){
    $('body,html').animate({ scrollTop: 0 }, 0);
});
$("#searPage").on('click','.prevPage',function(){
    $('body,html').animate({ scrollTop: 0 }, 0);
});
$("#searPage").on('click','.nextPage',function(){
    $('body,html').animate({ scrollTop: 0 }, 0);
});