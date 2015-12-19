/*--------------------------------------------------------------*/
/*-- JS Document --*/
/*--------------------------------------------------------------*/
(function($) {
    
$(document).bind("mobileinit", function(){
        $.mobile.autoInitializePage = false;
        $(window).bind('orientationchange', nav_bar._orientationHandler);
    });
    var nav_bar = {
        button: ".navbar-toggle",
        data:'target',
        main:"#main",
        is_load: false,
        target: false,
        isShowData:'isShow',
        isBlock: false,
        settings: {
                height: document,
                main: false,
                width: false,
                speed: 300,
                left: false
        },
        init: function(){
                nav_bar.bind();

                nav_bar.target =  $(nav_bar.getButton().data(nav_bar.data));
                var b =  nav_bar.settings.speed;
                nav_bar.setSpeed(0);
                nav_bar.hide();
                nav_bar.setSpeed(b);

        },
        bind: function(){
                $(nav_bar.button).click(nav_bar.click);

        },
        _orientationHandler: function(){
                nav_bar.target =  $(nav_bar.getButton().data(nav_bar.data));
                var b =  nav_bar.settings.speed;
                nav_bar.setSpeed(0);
                if(nav_bar.isShow()){
                        nav_bar.getButton().trigger('click');
                }
                nav_bar.setSpeed(b);
        },
        setSpeed: function(settings){
                 nav_bar.settings.speed = settings;
        },
        isShow: function(){
                return nav_bar.target.data(nav_bar.isShowData);
        },
        getMain: function(){
                return $(nav_bar.main);
        },
        getButton: function(){
                return $(nav_bar.button);
        },
        animate: function(margin,target_left,callback){

                if(margin > 0){
                        margin = "-"+margin;
                }
                margin = margin+"px";

                nav_bar.getMain().animate({"margin-left": margin},
                nav_bar.settings.speed,function(){
                         nav_bar.isBlock = false;
                });
                nav_bar.target.show().animate({
                        'right': target_left
                },nav_bar.settings.speed,function(){
                        nav_bar.isBlock = false;
                        if($.isFunction(callback)){
                                callback();
                        }
                });
        },
        show: function(){
                 nav_bar.target.data(nav_bar.isShowData,true);
                 nav_bar.target.hide().css({
                         'height': nav_bar.target.height(),
                         'right': "-"+nav_bar.settings.width+"px",
                         'width': nav_bar.settings.width
                 });
                nav_bar.animate(nav_bar.settings.width,  0);
                $('#main').addClass('mobile-nav');
                $('#header').css( 'position', 'absolute' );
                $('#main').css({
                         'height' : nav_bar.target.height(),
                         'overflow' : 'hidden'
                });
        },
        hide: function(){
                nav_bar.target.removeData(nav_bar.isShowData);
                nav_bar.animate(0,"-"+nav_bar.settings.width+"px",function(){
                        nav_bar.target.hide()
                        .css({height: 0,'left': nav_bar.settings.left, 'width': 0})
                        .removeAttr('style');
                         nav_bar.target.data('show-init',false);
                         $('#main').removeAttr('style').removeClass('mobile-nav');
                         $('#header').css( 'position', 'fixed' );
                });
        },
        /* Show */
        swipeLeft: function(e){
                e.preventDefault();
                if(nav_bar.getButton().is(':visible')){
                        nav_bar.target = $(nav_bar.getButton().data(nav_bar.data));
                        if(nav_bar.target && !nav_bar.isShow()){
                                nav_bar.initAnimate();
                                nav_bar.show();
                        }
                }
                nav_bar.isBlock = false;
        },
        /* Hide */
        swipeRight: function(e){
                e.preventDefault();
                if(nav_bar.getButton().is(':visible')){
                        nav_bar.target = $(nav_bar.getButton().data(nav_bar.data));
                        if(nav_bar.target && nav_bar.isShow()){
                                nav_bar.initAnimate();
                                nav_bar.hide();
                        }
                }
                 nav_bar.isBlock = false;
        },
        initAnimate: function(){
                        nav_bar.settings.width = nav_bar.target.width();
                        nav_bar.settings.main  = nav_bar.getMain().width();
                        nav_bar.settings.left  = nav_bar.target.offset().left;
                        return this;
        },
        click: function(e){
                nav_bar.target = $($(this).data(nav_bar.data));
                if(nav_bar.target){
                        if(nav_bar.initAnimate().isShow()){
                                nav_bar.hide();
                        }else{
                                nav_bar.show();
                        }
                }
                e.preventDefault();
                return false;
        }
    };                                                                              
    
    $(document).ready(function() {
    
        nav_bar.init();  
    
        $('#back-to-top').hide(); 
        /*------------------------------------------------------*/
        /*---- FancyBox -----*/
        /*------------------------------------------------------*/        
    	$(".fancybox").fancybox({
    		openEffect	: 'none',
    		closeEffect	: 'none'
    	});

        /*------------------------------------------------------*/
        /*---- Slider -----*/
        /*------------------------------------------------------*/
        $('.rslides').responsiveSlides({
            nav: true,
            pager: true,
            prevText: "<i class='fa fa-angle-double-left'></i>",
            nextText: "<i class='fa fa-angle-double-right'></i>"
        });   
        /*------------------------------------------------------*/
        /*---- Placeholder IE9 -----*/
        /*------------------------------------------------------*/         
        $('input, textarea').placeholder();                  
        /*------------------------------------------------------*/
        /*---- jQuery UI -----*/
        /*------------------------------------------------------*/
        $( ".accordion" ).accordion({
            heightStyle: "content",
            active: 2,
            icons: { "header": "fa fa-plus-circle", "activeHeader": "fa fa-minus-circle" }
        });
        $( ".tabs" ).tabs({
            heightStyle: "auto"    
        });
        /*------------------------------------------------------*/
        /*---- Window Resize -----*/
        /*------------------------------------------------------*/
        $( window ).resize(function() {
                         

        });
        
        /*------------------------------------------------------*/
        /*---- Window Scroll -----*/
        /*------------------------------------------------------*/
        
        $(window).scroll(function(){
            // Change header color and Fade Back-to-top button
            if ($(this).scrollTop() > 1) {
                    $('#back-to-top').fadeIn();
            } else {
		            $('#back-to-top').fadeOut();
            }  
        });
        
        /*------------------------------------------------------*/
        /*---- Back to Top -----*/
        /*------------------------------------------------------*/ 
                
        // scroll body to 0px on click
        $('#back-to-top').click(function () {
            $('body,html').animate({
                    scrollTop: 0
            }, 1000);
            return false;
        });
        
        /*------------------------------------------------------*/
        /*---- DropDown-menu -----*/
        /*------------------------------------------------------*/
        
        $(".main-menu-container").find(".dropdown").hover( 
            function() { $(this).children('.dropdown-content').stop(true, true).slideDown(); },
            function() { $(this).children('.dropdown-content').stop(true, true).hide(); }
        );
        $(".main-menu-container").find('.dropdown').click(function() {
            if ($(this).children('.dropdown-content').is(":hidden")) {
                $(this).children('.dropdown-content').slideDown("slow");
            } else {
                $(this).children('.dropdown-content').slideUp("slow");
            }
        }); 
        $('.search-link').click(function() { 
            $(this).parent('.search').toggleClass('search-hover');   
            if ($(this).parent('.search').children('.search-field').is(":hidden")) {
                $(this).parent('.search').children('.search-field').slideDown("slow");
            } else {
                $(this).parent('.search').children('.search-field').slideUp("slow");
            }
        });
        $(".mobile-main-menu").find('.dropdown').click(function() {
            if ($(this).children('.dropdown-content').is(":hidden")) {
                $(this).children('.dropdown-content').slideDown("slow");
            } else {
                $(this).children('.dropdown-content').slideUp("slow");
            }
        });
        
    });
     
})(jQuery);
    
    