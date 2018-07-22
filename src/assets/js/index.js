/// <reference path="../../../node_modules/barba.js/dist/barba.min.js"/>

document.addEventListener("DOMContentLoaded", function () {
    // New Transition Effect
    var transitionEffect = Barba.BaseTransition.extend({
        start : function(){
            console.log("What is this ?", this);
            // Assign params on fadeInNewContent
            Promise
                // .all to wait and run all
                .all([this.newContainerLoading , this.fadeOut()])
                // Bind next
                .then(this.fadeIn.bind(this));

        },
        fadeOut : function(){
            // Do what you love to hide it
            return $(this.oldContainer).animate({opacity : 0}).promise();
        },
        fadeIn : function () {
            var _this = this;
            console.log("What's this ?" ,JSON.stringify(this , undefined , 2));
            var $el = $(this.newContainer);
            // Old Container MUST HIDE OR DISPLAY NONE
            $(this.oldContainer).hide();
            // New Container MUST SET 'VISIBLE' and ready to animate from opacity 0
            $el.css({
                visibility : 'visible',
                opacity : 0
            });
            // Set to 1 , or Tweenlite.to could done the same
            $el.animate({opacity : 1} , 800 , function () {
                // Like any api , done() must call
                _this.done();
            });
        }
    });
    // Assign transition effect
    Barba.Pjax.getTransition = function(){
        return transitionEffect;
    }
    Barba.Pjax.start();
});