'use strict';
var alltag=[];
const typetag=['动作','喜剧','恐怖','剧情','动画','悬疑','惊悚','家庭','犯罪','奇幻','冒险','音乐','西部'];
const placetag=['全部地区','内地','港台','美国','英国','德国','韩国','日本','澳大利亚'];
const timetag=['2017','2016','2015','2014','2013','2012','2011','2010','2009','2008','2007'];
function abruf(a) {
    alltag=[]
    if(a=='全部类型')
    alltag[0]='';
    if(a=='全部地区')
    alltag[1]='';
    if(a=='全部时间')
        alltag[2]='';
    for(let item of typetag)
        if(a==item)
            alltag[0]=item;
    for(let item of placetag)
        if(a==item)
            alltag[1]=item;
    for(let item of timetag)
        if(a==item)
            alltag[2]=item;}
//showmovie()}


//显示分类情况
var data=new Object()
data.name='hui';
data.image=''
function showselect(data){
    for(let item of data){
        let div=`<div class='col-sm-3' >
                  <a title=点击查看详情 style="background-color: #9acfea">
                   <img class="double-border" src='${data.image}'>
                   <p>${data.name}</p></div>`;
       $('#picture').append(div);
    }
}
function printfselect(alltag) {
    $.ajax({
        type:'get',
        url:'http://localhost:8080/search?alltag'+alltag,
        crossDomain:true,
        success:function (data) {
            showselect(data);
        },
        error:function (jqXHR,textstatus,errThrown) {
            alert('error'+textstatus+''+errThrown);
        }
    })

}
/*动画效果
$(document).ready(function (){
    $('div.col-sm-3').hover(function () {
        $(this).find('.details').fadeTo('fast', 0.7);
    },function () {
        $(this).find('.details').fadeOut('fast');

    })

});*/
/*缩放效果
$(document).ready(function () {
    $('#picture')
        .bind('mouseenter mouseleave',function (evevnt) {
          var size=evevnt.type =='mouseeter'?85:75;
          var padding=evevnt.type =='mouseter'?0:5;
          $(this).find('img').animate({
              width:size,
              height:size,
              paddingTop:padding,
              paddingLeft:padding,
          })
        })

}); */
/*放大图片
$(document).ready(function () {
    $('#picture')
    .bind('mouseenter mouseleave',function (event) {
        var $image = $(this).find('img');
        if(!$image.is(':animated')
        ||event.type=='mouseleave'){
    }
    debugger;
    var size=event.type =='mouseleave'?150:170;
    var padding =event.type =='mouseenter'?0:20;
    $image.animate({
        width:size,
        height:size,
        paddingTop:padding,
        paddingLeft:padding
    })

    })
    });*/

$(function() {
    $(window).scroll(function() {
        var top = $(window).scrollTop()+100;
        var left= $(window).scrollLeft();
        $("#move").css({ left:left + "px", top: top + "px" });
    });
});
/*$("#goTopBtn").click(function(){
    var sc=$(window).scrollTop();
    $('body,html').animate({scrollTop:0},500)*/