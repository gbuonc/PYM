app.tablet ={
    init: function(){
       app.touch.init();
       app.common.initMap(15);
       $(function(){
          // $('.fancyBox').fancybox(app.common.fancyboxConfig);
       });
    },
    clear: function(){
       console.log('tablet clear');
    }
}
