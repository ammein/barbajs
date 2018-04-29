/// <reference path="./node_modules/barba.js/dist/barba.min.js"/>


document.addEventListener("DOMContentLoaded", function () {
    // New Transition Effect
    var transitionEffect = Barba.BaseTransition.extend({
        start : function(){
            console.log("What is this ?", this);
            // Assign params on fadeInNewContent
            this.newContainerLoading.then(val => this.fadeInNewContent($(this.newContainer)));
        },
        fadeInNewContent : function(newContainer){
            // Hide new container first
            newContainer.hide();
            var _this = this;
            // Make fadeOut effect on oldContainer
            $(this.oldContainer).fadeOut(1000).promise().done(()=>{
                // Must set visitbility to visible on newContainer
                newContainer.css({
                    visibility : "visible"
                });
                // Then we can make new fadeIn function for newContainer.
                newContainer.fadeIn(1000 , function(){
                    _this.done();
                });
            });
        }
    });
    // Assign transition effect
    Barba.Pjax.getTransition = function(){
        return transitionEffect;
    }
    Barba.Pjax.start();
});