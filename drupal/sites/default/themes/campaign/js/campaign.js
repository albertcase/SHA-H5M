window.$ = jQuery;

var _base = {
    init: function(){
        this.wxshareFun();
        // var self = this;
        // self.ajaxFun("POST", "/jssdk", {
        //     url: shareArr['_url']
        // }, "json", function(data){
        //     // console.log(data);
        //     self.wechatFun(data.appId, data.timestamp, data.nonceStr, data.signature);
        // });
    },
    // 页面切换
    sectionChange: function(n){        // section 页面切换
        $(".section").addClass("hidden transition");
        $("#" + n).removeClass('hidden transition');  
    },
    loadFn: function(arr , fn , fn2){
        var loader = new PxLoader();
            for( var i = 0 ; i < arr.length; i ++)
            {
                loader.addImage(arr[i]);
            };
            
            loader.addProgressListener(function(e) {
                    var percent = Math.round( e.completedCount / e.totalCount * 100 );
                    if(fn2) fn2(percent)
            }); 
            
            
            loader.addCompletionListener( function(){
                if(fn) fn();    
            });
            loader.start(); 
    },
    wxshareFun: function(){  //分享信息重置函数
        //wx.config({"debug": true}); 
        wx.ready(function(){

            /* ----------- 禁用分享 开始 ----------- */
            wx.hideMenuItems({
              menuList: [
                //'menuItem:share:appMessage', // 分享到朋友
                //'menuItem:share:timeline', // 分享到朋友圈
                'menuItem:copyUrl' // 复制链接
              ],
              success: function (res) {
                // alert('已隐藏“阅读模式”，“分享到朋友圈”，“复制链接”等按钮');
              },
              fail: function (res) {
                  //alert(JSON.stringify(res));
              }
            });
            /* ----------- 禁用分享 结束 ----------- */

            // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            wx.onMenuShareAppMessage({
                title: shareArr._title,
                desc: shareArr._desc_friend,
                link: shareArr._link,
                imgUrl: shareArr._imgUrl,
                type: '',
                dataUrl: '',
                success: function () {
                    shareArr._shareAppMessageCallback();
                },
                cancel: function () {

                }
            });
            wx.onMenuShareTimeline({
                title: shareArr._desc,
                link: shareArr._link,
                imgUrl: shareArr._imgUrl,
                success: function () {
                    shareArr._shareTimelineCallback(); 
                },
                cancel: function () {

                }
            });
        });
    },
    formErrorTips: function(alertNodeContext){  //错误提示弹层
        var alertInt;
        clearTimeout(alertInt);
        if($(".alertNode").length > 0){
            $(".alertNode").html(alertNodeContext);
        }else{
            var alertNode = document.createElement("div");
                alertNode.setAttribute("class","alertNode");
                alertNode.innerHTML = alertNodeContext;
                document.body.appendChild(alertNode);

        }
        alertInt = setTimeout(function(){
            $(".alertNode").remove();
        },3000);
    },
    ajaxFun: function(ajaxType, ajaxUrl, ajaxData, ajaxDataType, ajaxCallback){
       $.ajax({
            type: ajaxType,
            url: ajaxUrl,
            data: ajaxData,
            dataType: ajaxDataType
        }).done(function(data){
            ajaxCallback(data)
        })
        
        // ajaxFun("GET", "/weixin/jssdk", jssdkPushData, "json", jssdkCallback);

        // function jssdkCallback(data){
        //     wechatShare(data.appid, data.time, data.noncestr, data.sign);
        // }  
    },
    loadingFnDoing: function(allAmg, loadCallback){
        this.loadFn(allAmg , function (){

            $("img").each(function(){ 
                $(this).attr("src",$(this).attr("sourcesrc"));
            })
            
            loadCallback();
            // $(".loadingBar").css({"width": 0});
            
        } , function (p){
            // $(".loadingBar").css({"width": p + '%'});
            //$(".loading em").html(p);
            console.log(p);
        });
    },
    overscroll: function(el){
        el.addEventListener('touchstart', function() {
            var top = el.scrollTop
              , totalScroll = el.scrollHeight
              , currentScroll = top + el.offsetHeight
            //If we're at the top or the bottom of the containers
            //scroll, push up or down one pixel.
            //
            //this prevents the scroll from "passing through" to
            //the body.
            if(top === 0) {
              el.scrollTop = 1
            } else if(currentScroll === totalScroll) {
              el.scrollTop = top - 1
            }
        })
        el.addEventListener('touchmove', function(evt) {
            //if the content is actually scrollable, i.e. the content is long enough
            //that scrolling can occur
            if(el.offsetHeight < el.scrollHeight)
              evt._isScroller = true
        })
    },
    getCookie: function(name){
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
        else
        return null;
    },
    delCookie: function(name){
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval= this.getCookie(name);
        if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
    },
    setCookie: function(name,value,time){
        var d = new Date();
        d.setTime(d.getTime() + (time*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = name + "=" + value + "; " + expires;
    },
    getQueryString: function(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return unescape(r[2]); return null;
    }

}




class templateData{
    constructor(el, data){
        this.option = {
            'backgoundColor': (data['backgound_color'] == null || data['backgound_color'] == '') ? '#fff' : data['backgound_color'],
            'backgoundImage': data['backgound_image'],
            'buttonColor': data['button_color'],
            'logo': data['logo'],
            'arrowColor': (data['arrow_color'] == null || data['arrow_color'] == '') ? '#fff' : data['arrow_color']
        }
        this.el = document.getElementById(el);
    }
    init(){
        let self = this;
        self.setLogo();
        self.setBackgound();

        if(this.option['buttonColor']){
            self.setButtonColor();
        }

        if(this.option['arrowColor']){
            self.setArrowColor();
        }
    }
    setLogo(){
        this.el.querySelector('#logo').innerHTML = `
            <img src='${this.option.logo}' width='100%'>
        `;
    }
    setBackgound(){
        let backgoundImage = (!this.option.backgoundImage || this.option.backgoundImage === '') ? '' : `url(${this.option.backgoundImage}) no-repeat top center`;
        this.el.style.background = `${this.option.backgoundColor} ${backgoundImage}`;
    }
    setButtonColor(){
        var btn = this.el.querySelectorAll('.btn');
        Array.from(btn).map((item) => {
            item.style.background = this.option.buttonColor;
        })
    }
    setArrowColor(){
        var arrow = this.el.querySelectorAll('.arrow');
        Array.from(arrow).map((item) => {
            item.style.borderColor = `transparent ${this.option.arrowColor}`;
        })
    }
}



function hasClass(el){
    var regex = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g');
    return regex.test(el.className);
    el.className = el.className.replace(regex, '');
    return true;
}

function addClass(el){
    if(hasClass(el)) return false;
    el.className += ' ' + className;
    return true;
}

function removeClass(el){
    if(hasClass(el)){
        var regex = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g');
        el.className = el.className.replace(regex, '');
        return  true;
    }
    return false;
}


