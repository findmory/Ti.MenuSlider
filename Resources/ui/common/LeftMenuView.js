//FirstView Component Constructor
function LeftMenuView() {
    //create object instance, a parasitic subclass of Observable
    var self = Ti.UI.createView({
        // top: 50,
        // right: -100,
        height:Ti.Platform.displayCaps.platformHeight,
        width:Ti.Platform.displayCaps.platformWidth * .8,
        backgroundColor: 'transparent',
        zIndex:20
       // bubbleParent: false // so clicks on the window below don't bubble!
    });
    
    var menuItems = Ti.UI.createLabel({
        left:5,
        text:"Some Menu Items\nAndsomeMore\nAnd some others"
    });
    
    self.add(menuItems);
    
    // self.isVisible = 0; //custom property for event handling
// 
    // self.addEventListener('click', function(e) {
        // cancelBubble : true;
        // var position;
        // if (self.isVisible){
            // position = -Ti.Platform.displayCaps.platformWidth + 20;
            // self.isVisible = 0;
        // } else{
            // position = 0;
            // self.isVisible = 1;
        // }
        // self.animate({
            // left: position,
            // backgroundColor : self.isVisible ? "blue" : "transparent",
            // speed:250
        // }); 
//        
        // //TODO: i suppose i should fire an event that destroys this view now
// 
    // });

    return self;
}

module.exports = LeftMenuView;
