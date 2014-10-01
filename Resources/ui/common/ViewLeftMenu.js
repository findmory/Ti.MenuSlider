function ViewLeftMenu(vw_menuController, parentWindow) {
    var vw_leftMenu = Ti.UI.createView({
        left: -Ti.Platform.displayCaps.platformWidth,  //offscreen
        height:Ti.Platform.displayCaps.platformHeight,
        width:Ti.Platform.displayCaps.platformWidth * .8,
        backgroundColor: 'black',
        zIndex:20
       // bubbleParent: false // so clicks on the window below don't bubble!
    });
    
    var lbl_menuItems = Ti.UI.createLabel({
        left:5,
        text:"Some Menu Items\nAndsomeMore\nAnd some others"
    });
    
    vw_leftMenu.add(lbl_menuItems);
    
    function handleMoving(e){
        //stop if the menu is at 0
        var leftMenuViewWidth = vw_leftMenu.width;
        var loc = parseInt(e.x - leftMenuViewWidth);

        if (loc <=0){
            vw_leftMenu.left = parseInt(e.x - leftMenuViewWidth);
        }
        
        //animate background opacity
        var opac = Number((0.8 - (vw_leftMenu.left / -leftMenuViewWidth)).toFixed(2));
        vw_lightBox.opacity = opac;
    }
    
    function handleTouchEnd(e){
        //if it's open more than 2/3 way, open all the way, else send it back closed
        if (-vw_leftMenu.left <= (vw_leftMenu.width * .33)){
            vw_leftMenu.animate({
                left : 0,
                duration : 500
            });
            vw_lightBox.opacity = 0.75;
                       
        }else{
            slideClosed();
        }
    }
    
    vw_menuController.addEventListener('touchmove', handleMoving);
    vw_menuController.addEventListener('touchend', handleTouchEnd);
    vw_leftMenu.addEventListener('swipe', function(){
        slideClosed();
    });
   
   //create a greyed out layer to cover background window when menu is overlayed
    var vw_lightBox = Ti.UI.createView({
        height:Ti.UI.FILL,
        width:Ti.UI.FILL,
        left:0,
        top:0,
        backgroundColor:"#333333",
        opacity:0,
        zIndex:10
    });
    parentWindow.add(vw_lightBox);
    
    vw_lightBox.addEventListener('click',function(){
        var position;
        slideClosed();
    });
    
    function slideClosed(){
        vw_leftMenu.animate({
            left: -vw_leftMenu.width,
            duration:500
        });
        vw_lightBox.animate({opacity: 0, duration: 500});
    }
  
    return vw_leftMenu;
}

module.exports = ViewLeftMenu;
