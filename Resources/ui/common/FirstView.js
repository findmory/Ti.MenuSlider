//FirstView Component Constructor
function FirstView(parentView) {
	//create object instance, a parasitic subclass of Observable
	var menuView = Ti.UI.createView({
	    top: 50,
	    // right: -100,
	    height:100,
	    width:100,
	    backgroundColor: 'red'
	});
	
	parentView.moving = false;
	parentView.axis = 0;

	
	parentView.addEventListener('touchstart', function(e){
        // Get starting horizontal position
        e.source.axis = parseInt(e.x);
    });
    
    parentView.addEventListener('touchmove', function(e){
        // Subtracting current position to starting horizontal position
        var coordinates = parseInt(e.x) - e.source.axis;
        // Detecting movement after a 20px shift
        if(coordinates > 20 || coordinates < -20){
            e.source.moving = true;
        }
        // Locks the window so it doesn't move further than allowed
        if(e.source.moving == true && coordinates <= 150 && coordinates >= 0){
            // This will smooth the animation and make it less jumpy
            menuView.animate({
                left:coordinates,
                duration:20
            });
            // Defining coordinates as the final left position
            menuView.left = coordinates;
        }
    });


	return menuView;
}

module.exports = FirstView;
