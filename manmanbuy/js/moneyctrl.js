$(function() {
       
var page=1
    getlist();
    console.log(page);

    mui.init({
        pullRefresh : {
          container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
          down : {
            height:30,//可选,默认50.触发下拉刷新拖动距离,
        
            contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
            contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
            contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
            callback :function(){
    
               
    
                setTimeout(function(){
    
                  
                    mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                    page=1;
                    mui('#refreshContainer').pullRefresh().refresh(true);
                    getlist();
                },1000);
        
                
            
            } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
          },
          up : {
            height:30,//可选.默认50.触发上拉加载拖动距离
           
            contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
            contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
            callback :function(){
    
                setTimeout(function(){
                    page++;
                    $.ajax({
                        url:"http://localhost:9090/api/getmoneyctrl",
                        data:{pageid:page},
                        success:function (obj) {
                           
                            
                            if(obj.result.length>0){
                                var html = template('list', obj);
                                $('#main ul').append(html);
                
                
                            mui('#refreshContainer').pullRefresh().endPullupToRefresh();
                            }else{
                                mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                            }
    
                            
                        }
                        }
                 )
                 
    
                },2000)
               
       
            } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
          }
        }
      });

  function getlist(){
    $.ajax({
        data:{pageid:page},
        url:"http://localhost:9090/api/getmoneyctrl",
        success: function(data) {
                console.log(data);
                
            var html = template('list', data);
            $('#main ul').html(html);
           
                $("#main .mui-scroll ul  a").on("tap",function(){
                    
                    location="details.html?id="+$(this).data("id");
    
                })
        

            
        }
    })
}



});


