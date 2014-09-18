app.tablet ={
    init: function(){
       app.touch.init();
       console.log('init tablet');
       $(function(){
          $('.fancyBox').fancybox(app.common.fancyboxConfig);
       });
    },
    clear: function(){
       console.log('tablet clear');
    }
}
