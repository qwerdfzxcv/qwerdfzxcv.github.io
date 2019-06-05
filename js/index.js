/*入口函数*/
window.onload = function () {
/*顶部搜索框背景透明度随页面滚动而变化的功能的实现*/
    searchScroll();
    /*轮播图自动无缝切换*/
    bannerToggle();
    /*倒计时*/
    downTime();

};
/*自定义顶部搜索框背景透明度动态变化功能实现函数*/
function searchScroll() {
    /*获取顶部搜索框*/
    var searchBox = document.querySelector(".jd_topbox");
    var opacity=0;
    /*获取轮播图的高度*/
    var bannerHeight = document.querySelector(".jd_banner").offsetHeight;
    /*浏览器滚动事件*/
    window.onscroll = function () {
        /*获取页面向上滚动距离的兼容代码*/
        function getScroll() {
            return {
                top: Window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,

            };
        }

        var top = getScroll();
        /*获取页面向上滚动的距离*/
        var scrollTop=top.top;
        /*当页面向上滚动的距离小于banner的高度时，搜索框的背景透明度随着滚动距离的增加而增加
        当页面向上滚动的距离大于等于banner的高度时，搜索框的背景透明度为定值0.85*/
        opacity=scrollTop < bannerHeight?scrollTop/bannerHeight*0.85:0.85;
        searchBox.style.background="rgba(201,21,35,"+opacity+")";


    };
}
/*自定义轮播图切换功能实现函数*/
function bannerToggle() {
    /*获取banner的宽度*/
    var width=document.querySelector(".jd_banner").offsetWidth;
    /*获取图片容器*/
    var imageBox=document.querySelector(".jd_banner").firstElementChild;
    var index=1;
    /*自定义设置图片容器位移函数*/
    function setTranslateX(translateX) {
        imageBox.style.transform = "translateX(" + translateX + "px)";
        imageBox.style.webkitTransform = "translateX(" + translateX + "px)";
    }
    /*自定义为图片容器添加过渡函数*/
    function addTransition() {
        imageBox.style.transition = "all 0.2s";
        imageBox.style.webkittransition = "all 0.2s";
    }
    /*自定义移除图片容器过渡函数*/
    function removeTransition() {
        imageBox.style.transition ="none";
        imageBox.style.webkittransition = "none";
    }
    /*设置定时器，让图片容器每2秒向左移动一个banner宽度的距离*/
        var timeId=setInterval(function () {
        index++;
        setTranslateX(-index * width);
        addTransition();

    },2000);
        /*为图片容器绑定过渡结束事件*/
    imageBox.addEventListener("transitionend", function () {
        /*当index>=9时，此时应该显示第二张图片，并且是瞬间移动到第二张，没有过渡效果*/
        if (index >= 9) {
            index=1;
            removeTransition();
            setTranslateX(-index * width);
            /*因为无法判断用户刚开始是左滑还是右滑，所以当index<=0时，应该显示倒数第二张图片，
            并且是瞬间移动到倒数第二张，没有过渡效果*/
        }else if (index <=0) {
            index=8;
            removeTransition();
            setTranslateX(-index * width);
        }
        /*对应小圆点的切换*/
        setPoint();
    });
    /*自定义小圆点切换函数*/
    function setPoint() {
        /*获取小圆点容器*/
        var pointBox=imageBox.children;
        /*获取所有的小圆点*/
        var points=document.querySelector(".jd_banner").lastElementChild.children;
        /*遍历每个小圆点，清除每个小圆点current样式*/
        for (var i = 0; i < points.length; i++) {
            points[i].classList.remove("current");
        }
        /*为当前小圆点添加上current样式*/
        points[index - 1].classList.add("current");
    }
    /*为图片容器绑定屏幕开始滑动事件*/
    var orignX=0;
    var targetX=0;
    var distance=0;
    var translateX=0;
    var isMove=false;
    imageBox.addEventListener("touchstart", function (e) {
        /*获取屏幕开始滑动时的接触点距离页面的宽度*/
       orignX=e.touches[0].clientX;
       /*当开始滑动时应该停止定时器，否则可能会出现滑不动的现象*/
        clearInterval(timeId);

    });
    /*为图片容器绑定屏幕滑动事件*/
    imageBox.addEventListener("touchmove", function (e) {
        isMove=true;
        /*获取屏幕滑动过程中接触点距离页面的宽度*/
        targetX=e.touches[0].clientX;
        /*图片容器随着屏幕的滑动做对应的位移*/
        distance=targetX-orignX;//滑动开始时的接触点与滑动过程中接触点之间的距离
        /*图片容器需要位移的具体的值*/
       translateX=-index*width+distance;
        /*设置位移*/
        setTranslateX(translateX);
        /*添加过渡*/
        removeTransition();

    });
    /*为图片容器绑定屏幕滑动结束事件*/
    imageBox.addEventListener("touchend", function () {
        /*当屏幕滑动结束时的滑动距离如果小于banner宽度的三分之一则图片容器吸附回去*/
        if (isMove) {//确保在屏幕上滑动了才执行，防止单击的情况出现
            if (Math.abs(distance) < width / 3) {
                translateX = -index * width;
                /*设置位移*/
                setTranslateX(translateX);
                /*添加过渡*/
                addTransition();
                /*当屏幕滑动结束时的滑动距离如果大于banner宽度的三分之一则图片容器移动一个banner宽度的位移*/
            } else {
                /*当distance的值为正时，此时向右滑动，显示上一张图片*/
                if (distance > 0) {
                    index--;
                    /*当distance的值为负时，此时向左滑动，显示下一张图片*/
                } else {
                    index++;
                }
                /*设置位移*/
                setTranslateX(-index * width);
                /*添加过渡*/
                addTransition();
            }

        }
        /*参数重置*/
        orignX=0;
        distance=0;
        isMove=false;
        /*当屏幕滑动结束后，图片应当继续自动切换，开启定时器*/
        timeId=setInterval(function () {
            index++;
            setTranslateX(-index * width);
            addTransition();

        },2000);
    });
}

function downTime() {
    /*设置总时间为2小时*/
    var totalTime=2*60*60;
    /*设置定时器，每过一秒总时间减少一秒*/
    var timeId = setInterval(function () {
        /*将总时间拆分为时分秒*/
        var h = Math.floor(totalTime / 60 / 60);
        var m = Math.floor(totalTime%3600/60);
        var s = totalTime%60;
        /*获取所有的span*/
        var spans = document.querySelectorAll(".time span");
        /*获取所有span中用来表示时间的span并赋值*/
        spans[0].innerHTML =Math.floor(h/10);
        spans[1].innerHTML = h%10;
        spans[3].innerHTML = Math.floor(m/10);
        spans[4].innerHTML = m%10;
        spans[6].innerHTML = Math.floor(s/10);
        spans[7].innerHTML = s%10;
        totalTime--;
        /*当总时间小于等于零时，倒计时结束*/
        if (totalTime <= 0) {
            clearInterval(timeId);
        }
    }, 1000);

}


