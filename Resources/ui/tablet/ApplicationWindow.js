//Application Window Component Constructor
function ApplicationWindow() {
	//load component dependencies
	var FirstView = require('ui/common/FirstView');

	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		zIndex:0
	});
	
	//move this to file and require
	var menuBarView = Ti.UI.createView({
	    backgroundColor: '#DDDDDD',
	    top:0,
	    width:Ti.UI.FILL,
	    height:40,
	    zIndex:100 //always on top
	});
	self.add(menuBarView);
	
	var label = Ti.UI.createLabel({
	    color:'#000000',
        text: 'open view 1 (or swipe right from the left edge to bring in a view)',
        height:'auto',
        width:'auto'
	});
	
	menuBarView.add(label);
	
	var firstView = new FirstView();
	var firstViewVisible = 0;
	firstView.top = -100;
	firstView.left = 100;
	
	var ViewAnimation = require('js/ViewAnimation');
    var anim = new ViewAnimation({
        direction: 'top',
        speed: 750,
        view: firstView
    });
	
    //click the label to bring a view in from the top
	label.addEventListener('click', function(){
	    if (firstViewVisible === 0){
	        self.add(firstView);
            firstView.animate(anim.slideIn);
            firstViewVisible = 1;
	    }else{
            firstView.animate(anim.slideOut);
	        firstViewVisible = 0;
	    }
	});
	
	//here's a fullscreen view that will be loaded by the viewController below
	//here's a view that is full screen that slides in from the left
    var LeftMenuView = require('ui/common/LeftMenuView'); 
    var leftMenuView = new LeftMenuView();
    leftMenuView.left = -Ti.Platform.displayCaps.platformWidth;  //offscreen
    self.add(leftMenuView);
    
    //create a greyed out layer to cover background window when menu is overlayed
    var viewLightbox = Ti.UI.createView({
        height:Ti.UI.FILL,
        width:Ti.UI.FILL,
        left:0,
        top:0,
        backgroundColor:"#333333",
        opacity:0,
        zIndex:10
    });
    self.add(viewLightbox);
    var opacityForBackground = 0;
    
    viewLightbox.addEventListener('click',function(){
        var position;
        slideClosed();
        leftMenuAnimate();
    });
	
	//create a transparent view that is 20 pix wide and runs down the left edge to control sliding a full view in and out
	var viewController = Ti.UI.createView({
	    width: 20,
	    left:0,
	    height: Ti.UI.FILL,
	    backgroundColor: "transparent",
	    zIndex:20
	});
	
	function slideOpen() {
	    position = 0;
        viewController.isVisible = 1;
        viewController.width = leftMenuView.width;
        opacityForBackground = .75;
	}
	
	function slideClosed(){
	    position = -Ti.Platform.displayCaps.platformWidth + 20;
        viewController.isVisible = 0;
        viewController.width = 20;
        opacityForBackground = 0;
	}
	
	function leftMenuAnimate(){
	    leftMenuView.animate({
            left: position,
            backgroundColor : viewController.isVisible ? "white" : "transparent",
            speed:800
        });
        
        viewLightbox.animate({
            opacity : opacityForBackground,
            speed: 700
        });
	}
	
	self.add(viewController);
	viewController.isVisible = 0; //custom property to track view toggle
	viewController.addEventListener('swipe', function(e) {
	    console.log ("swipe: " , e.direction);
	    var position;
	    cancelBubble : true;
	    if (e.direction == "right" && !viewController.isVisible){
            slideOpen();
	    }
        if (e.direction == "left" && viewController.isVisible){
            slideClosed();
        }
        
        leftMenuAnimate();
       
        //TODO: i suppose i should fire an event that destroys this view now

    });


	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
