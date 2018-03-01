$(function(){
    var currentHref=window.location.href;
    var urlPre;
    if (currentHref.indexOf("localhost")!=-1) {
        urlPre="http://localhost/pcyy/src/";
    }else{
        urlPre=spacecode;
    }
    $('body').append('<footer id="footer">'+
        '<div class="footer-main">'+
        '<div class="footerMain-lf fl">'+
        '<div class="footerMain-lfTop">'+
        '<div>'+
        '<a href="javascript:void(0);" class="footerMain-mobile">简单住移动版<div class="footerMain-mobileHover"><b></b></div></a>'+
        '<a href='+apiseo+'/showNews?startRow=0&rowCount=10&page=1" class="footerMain-midea">媒体报道</a>'+
        '<a href='+apiseo+'/showComps?startRow=0&rowCount=10&page=1'+' class="footerMain-midea">家装大全</a>'+
        '<a href="'+urlPre+'module/about/aboutus.html" class="footerMain-about">关于简单住</a>'+
        '<a href="'+urlPre+'module/about/aboutus.html" class="footerMain-help">帮助中心</a>'+
        '<a href="https://weibo.com/u/6389916711?refer_flag=1001030101" class="footerMain-weibo" target="_blank"></a>'+
        '</div>'+
       ' </div>'+
        '<p class="footerMain-lfBom">Copyright © 2017 HomeyeUp简单住 版权所有      深圳市简单住网络有限公司  粤ICP备17125  www.homeyeup.com</p>'+
   ' </div>'+
    '<div class="footerMain-rt fr">'+
       ' <h1>关注公众号获取</h1>'+
        '<h2>3次免费参观机会</h2>'+
   ' </div>'+
    '</div>'+
    '</footer>');
});