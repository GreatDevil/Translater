document.onmouseup = function(){
  alert("hello");
	var range = getRangeObject();
  	if (range) {
    	self.port.emit("word", range);

	}
}

function getRangeObject(win) { //Gets the first range object
  win = win || window;
  if (win.getSelection) { // Firefox/Chrome/Safari/Opera/IE9
    try {
      return win.getSelection().getRangeAt(0).toString(); //W3C DOM Range Object
    } catch (e) { /*If no text is selected an exception might be thrown*/ }
  } else if (win.document.selection) { // IE8
    var range = win.document.selection.createRange(); //Microsoft TextRange Object
    return fixIERangeObject(range, win);
  }
  return null;
}


self.port.on("resp", function(message) {
	window.alert(message);
});
