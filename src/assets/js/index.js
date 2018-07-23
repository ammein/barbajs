/// <reference path="../../../node_modules/barba.js/dist/barba.min.js"/>
/// <reference path="../js/TimelineMax.js"/>
/// <reference path="../js/jquery.gsap.js"/>
function deleteLink(){
    return $("a").css('display','none');
}

document.addEventListener("DOMContentLoaded", function () {
    // New Transition Effect
    var transitionEffect = Barba.BaseTransition.extend({
        start : function(){
            // console.log("What is this ?", this);
            // Assign params on fadeInNewContent
            Promise
                // .all to wait and run all
                .all([this.newContainerLoading , this.zoomImage()])
                // Bind next
                .then(this.fadeIn.bind(this));

        },
        zoomImage : function(){
            // Do what you love to hide it
            var oldContainer = $(this.oldContainer);
            var image = $('[data-image]');
            var div = document.createElement('div');
            $(div).appendTo('body').addClass("append-body");
            var anotherDiv = $(div).clone();
            $(anotherDiv).appendTo('body').addClass('append-body');
            TweenMax.to(div,2,{
                width : $(window).width()/2
                // x : 0
            });
            TweenMax.to(anotherDiv,2,{
                width : $(window).width()/2,
                x : $(window).width()
            });
            TweenMax.to(image , 1.5,{
                width : $(window).width(),
                height : $(window).height(),
                easing: Linear.easeNone, 
                onUpdate: deleteLink
            });
            return oldContainer.css({zIndex : 9999999 , position : 'absolute'}).promise();
        },
        fadeIn : function () {
            var _this = this;
            // console.log("What's this ?" ,JSON.stringify(this , undefined , 2));
            var $el = $(this.newContainer);
            var oldContainer = $(this.oldContainer);
            // Old Container MUST HIDE OR DISPLAY NONE
            console.log("Old Container " , JSON.stringify(oldContainer , undefined , 2));
            TweenMax.to(oldContainer , 2 , {
                opacity : 0,
                display : 'none',
                onComplete : function () {
                    $('.append-body').remove();                    
                }
            });
            // New Container MUST SET 'VISIBLE' and ready to animate from opacity 0
            $el.css({
                visibility : 'visible',
                opacity : 0
            });
            // Set to 1 , or Tweenlite.to could done the same
            TweenMax.to($el, 2, {
                top : document.body.scrollTop,
                zIndex : 2,
                opacity : 1,
                onComplete : function () {
                    $('a').css('display' , 'initial');
                    _this.done();
                }
            });
        }
    });

    Barba.Dispatcher.on('newPageReady', function (currentStatus, oldStatus, container) {
        console.log("Current Status" , JSON.stringify(currentStatus , undefined , 2));
        console.log("Old Status" , JSON.stringify(oldStatus , undefined , 2));
        console.log("Container" , JSON.stringify(container , undefined , 2));
    });

    // Assign transition effect
    Barba.Pjax.getTransition = function(){
        return transitionEffect;
    }
    Barba.Pjax.start();
});