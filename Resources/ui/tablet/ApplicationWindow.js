//Application Window Component Constructor
function ApplicationWindow() {
	//load component dependencies
	var FirstView = require('ui/common/FirstView');

	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff'
	});
	
	var label = Ti.UI.createLabel({
	    color:'#000000',
        text: 'open view 1 (or click on the left edge to bring in a view)',
        height:'auto',
        width:'auto',
        top: 20
	});
	
	self.add(label);
	
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
    var FullView = require('ui/common/FullView'); 
    var fullView = new FullView();
    fullView.left = -Ti.Platform.displayCaps.platformWidth;  //offscreen
    self.add(fullView);
	
	//create a transparent view that is 20 pix wide and runs down the left edge to control sliding a full view in and out
	var viewController = Ti.UI.createView({
	    width: 20,
	    left:0,
	    height: Ti.UI.FILL,
	    backgroundColor: "transparent"
	});
	
	self.add(viewController);
	viewController.isVisible = 0; //custom property to track view toggle
	viewController.addEventListener('click', function(e) {
        cancelBubble : true;
        var position;
        if (viewController.isVisible){
            position = -Ti.Platform.displayCaps.platformWidth + 20;
            viewController.isVisible = 0;
        } else{
            position = 0;
            viewController.isVisible = 1;
        }
        fullView.animate({
            left: position,
            backgroundColor : viewController.isVisible ? "blue" : "transparent",
            speed:250
        }); 
       
        //TODO: i suppose i should fire an event that destroys this view now

    });


	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
