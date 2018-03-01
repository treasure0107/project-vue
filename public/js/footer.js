$(function(){
    $('body').append('<footer id="footer">' +
        '    <div class="foot-tip">' +
        '        <h1 class="foot-tipOne">简单住不做装修，只陪您看装修</h1>' +
        '        <h2 class="foot-tipTwo">已有<span></span>业主看了工地</h2>' +
        '        <div class="foot-tipHelp">' +
        '            <div class="foot-tipUs">' +
        '                <ul class="foot-showList">' +
        '                    <li class="foot-showUs">' +
        '                        <div class="foot-showUsHone">' +
        '                            <div class="foot-showUsMe">' +
        '                                <a href="javascript:void(0);" class="foot-showUsMobile" title="简单住移动版-简单住">简单住移动版</a>' +
        '                                <div class="foot-showUsMobileHover">' +
        '                                    <b></b>' +
        '                                </div>' +
        '                            </div>' +
        '                            <a href="'+spacecode+'module/about/aboutus.html" title="关于简单住-简单住">关于简单住</a>' +
        '                            <a href="#" title="帮助中心-简单住">帮助中心</a>' +
        '                        </div>' +
        '                        <h2 class="foot-showUsHtwo">' +
        '                            <a href="https://weibo.com/u/6389916711?refer_flag=1001030101" class="foot-weibo" target="_blank" title="微博-简单住"></a>' +
        '                        </h2>' +
        '                    </li>' +
        '                    <li class="foot-showInfo">' +
        '                        <h1>联系简单住</h1>' +
        '                        <h2>0755-83224932</h2>' +
        // '                        <h3>深圳市福田区兰光路22号桑达工业区404栋5楼</h3>' +
        '                    </li>' +
        '                    <li class="foot-showCode">' +
        '                        <div class="foot-showCodeImg">' +
        '                            <h1>关注公众号获取</h1>' +
        '                            <h2>3次免费参观机会</h2>' +
        '                        </div>' +
        '                    </li>' +
        '                </ul>' +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '    <div class="foot-comInfo">Copyright © 2017 HomeyeUp<a href="'+spacecode+'index.html" title="简单住">简单住</a> 版权所有      深圳市简单住网络有限公司  粤ICP备17125994号  www.homeyeup.com</div>' +
        '</footer>');
        getUserVisCount(function(data){
            $(".foot-tipTwo>span").text(data.visCount);
        },function(err){});
});