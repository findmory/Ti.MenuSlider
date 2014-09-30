function ViewMenuBar() {
	var vw_menuBar = Ti.UI.createView({
	    backgroundColor: '#DDDDDD',
	    top:0,
	    width:Ti.UI.FILL,
	    height:40,
	    zIndex:100 //always on top
	});
	
	var label = Ti.UI.createLabel({
	    color:'#000000',
        text: 'swipe from left edge to bring in view',
        height:'auto',
        width:'auto'
	});
	
	vw_menuBar.add(label);

	return vw_menuBar;
}
module.exports = ViewMenuBar;