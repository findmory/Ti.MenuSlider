function ViewAnimation(obj){
    /*
    * Creates an animation object you can call with view.animate(anim.slideIn || anim.slideOut)
    * 
    * You need to create a view and position it offscreen
    * 
    * Then create this object by requiring it and passing in values
    * 
    * possible values of obj
    * 
    * - view (required) : viewToAnimate
    * 
    * - direction (optional): direction to slide in from
    *      'right', 'left', 'top', 'bottom' (left if not specified)
    * 
    *  - speed (optional) : in ms.  1000 if not specified
    */
       
    var screenWidth = Ti.Platform.displayCaps.platformWidth;
    
    var speed = obj.speed || 1000;
    if (!obj.view){
        alert('you have to pass the view in or this will fail');
    };
    var viewWidth = obj.view.width;
    
    var direction = obj.direction || 'left';
    var postion = 0;    
    var anim = {};
    
    anim.slideIn = Ti.UI.createAnimation({
        duration:speed
    });
    anim.slideIn[direction] = 0;
    
    anim.slideOut = Ti.UI.createAnimation({
        duration:speed
    });
    anim.slideOut[direction] = -viewWidth;
    
    return anim;
}
    
module.exports = ViewAnimation;