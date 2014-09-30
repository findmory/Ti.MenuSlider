//FirstView Component Constructor
function ViewLeftMenu(vw_menuController, lightboxView) {
    //create object instance, a parasitic subclass of Observable
    var vw_leftMenu = Ti.UI.createView({
        // top: 50,
        // right: -100,
        height:Ti.Platform.displayCaps.platformHeight,
        width:Ti.Platform.displayCaps.platformWidth * .8,
        backgroundColor: 'black',
        zIndex:20
       // bubbleParent: false // so clicks on the window below don't bubble!
    });
    
    vw_menuController.moving = false;
    vw_menuController.axis = 0;
    
    var menuItems = Ti.UI.createLabel({
        left:5,
        text:"Some Menu Items\nAndsomeMore\nAnd some others"
    });
    
    vw_leftMenu.add(menuItems);
    
    vw_menuController.addEventListener('touchstart', function(e){
        // Get starting horizontal position
        e.source.axis = parseInt(e.x);
    });
    
    vw_menuController.addEventListener('touchmove', function(e){
  
        //stop if the menu is at 0
        var loc = parseInt(e.x - vw_leftMenu.width);
        console.log(loc);
        if (loc <=0){
            vw_leftMenu.left = parseInt(e.x - vw_leftMenu.width);
        }
        //animate background opacity
    });
    vw_menuController.addEventListener('touchend', function(e){
        console.log ('left: ', vw_leftMenu.left);
        console.log('widht: ', vw_leftMenu.width);
       //if it's open more than half way, open all the way, else send it back closed
        if (-vw_leftMenu.left <= (vw_leftMenu.width / 2)){
            //animate
            vw_leftMenu.animate({
                left : 0,
                duration : 500
            });
            
            
        }else{
            //animate
            vw_leftMenu.animate({
                left: -vw_leftMenu.width,
                duration:500
            });
            lightboxView.opacity = .8;
        }
        
    });
   

    return vw_leftMenu;
}

module.exports = ViewLeftMenu;
