function ApplicationWindow() {
	var self = Ti.UI.createWindow({
		backgroundColor:'#eee',
		zIndex:0
	});
	
	//require the menu
	var ViewMenuBar = require('ui/common/ViewMenuBar');
	var vw_menuBar = new ViewMenuBar();
	self.add(vw_menuBar);
	
	
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
    self.add(vw_lightBox);
    var opacityForBackground = 0;
    
    vw_lightBox.addEventListener('click',function(){
        var position;
        slideClosed();
        leftMenuAnimate();
    });
	
	//create a transparent view that is 20 pix wide and runs down the left edge to control sliding a full view in and out
	var vw_menuController = Ti.UI.createView({
	    width: 20,
	    left:0,
	    height: Ti.UI.FILL,
	    backgroundColor: "transparent",
	    zIndex:20
	});
	
	function slideOpen() {
	    position = 0;
        vw_menuController.isVisible = 1;
        vw_menuController.width = vw_leftMenu.width;
        opacityForBackground = .75;
	}
	
	function slideClosed(){
	    position = -Ti.Platform.displayCaps.platformWidth + 20;
        vw_menuController.isVisible = 0;
        vw_menuController.width = 20;
        opacityForBackground = 0;
	}
	
	function leftMenuAnimate(){
	    vw_leftMenu.animate({
            left: position,
            backgroundColor : vw_menuController.isVisible ? "white" : "transparent",
            speed:800
        });
        
        vw_lightBox.animate({
            opacity : opacityForBackground,
            speed: 700
        });
	}
	
	self.add(vw_menuController);
	vw_menuController.isVisible = 0; //custom property to track view toggle
	//here's a fullscreen view that will be loaded by the vw_menuController below
    //here's a view that is full screen that slides in from the left
    var ViewLeftMenu = require('ui/common/ViewLeftMenu'); 
    var vw_leftMenu = new ViewLeftMenu(vw_menuController, vw_lightBox); //pass in the parent window
    vw_leftMenu.left = -Ti.Platform.displayCaps.platformWidth;  //offscreen
    self.add(vw_leftMenu);


	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
