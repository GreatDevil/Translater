document.onmouseup = function(){
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
	alert(message);
});

//key = trnsl.1.1.20170216T173928Z.7ab97636c7a3b6d5.ac165fd4ffa71423021a6c0c31976dca8848df26
//key_for_dictionary = dict.1.1.20170216T185607Z.227cf6c7ea443739.bc56e9903db4e0e489b81333be7c284f41a8a451