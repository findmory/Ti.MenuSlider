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
        width:'auto',
        left: 'auto',
        font: { fontSize:12 }
	});
	vw_menuBar.add(label);
	
	var btn_menu = Ti.UI.createImageView({
	    image: 'images/bar_menu.png',
	    left: -2,
	    height: 20,
	    width:20
	});
	vw_menuBar.add(btn_menu);
	btn_menu.addEventListener('click', function(){
	    //aniamte it to the left
	    //toggle open closed
	    Ti.App.fireEvent('app:menuSlider',{state: 'closed'}); // can pass a dictionary of keys  like state:'open'
	});
	

	return vw_menuBar;
}
module.exports = ViewMenuBar;