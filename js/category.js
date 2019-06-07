/*区域滚动
条件：一个容器装着一个容器的html结构，找到大容器,子容器大于父容器*/
window.onload = function () {
   new IScroll(document.querySelector(".cateMain_left"),{
       scrollX:false,
       scrollY:true
   });
    document.querySelector(".navBar").addEventListener("touchmove", function (e) {
        e.preventDefault();
    });
};