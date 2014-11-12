<footer>
    <p class="copyright">&copy; 2014 Studio Pym Srl - P. IVA 08206970967 Sede Legale: via Cappuccio, 18 20123 Milano - <strong>Loghi e illustrazioni di <a href="http://riccardoguasco.tumblr.com" target="_blank">
    Riccardo Guasco</a></strong></p>
</footer>
            </div>
        </div>
     <script>
    var app ={};
    var isTouch = head.touch;
    var isPhone =  head.touch && head.screen.width <= 640;
    var isTablet = head.touch && head.screen.width > 640 && !head.desktop;
    var isDesktop = head.desktop;
    var device = isDesktop ? 'desktop': 'mobile'; //(isPhone ? 'mobile' : 'tablet');
        device = isPhone ? 'mobile': device;
        device = isTablet ? 'tablet': device;
    // load assets based on device
    head.load(["./assets/js/pym-"+device+".js"], function(){
        app[device].init();
    });
</script>