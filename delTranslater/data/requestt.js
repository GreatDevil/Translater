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




 document.onmouseup = function(){

  var range = getRangeObject();
    if (range) {
var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;

var xhr = new XHR();

// (2) запрос на другой домен :)
xhr.open('GET', 'https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20170216T185607Z.227cf6c7ea443739.bc56e9903db4e0e489b81333be7c284f41a8a451&lang=en-ru&text='+ range, true);

xhr.onload = function(responseText) {
  //for(key in responseText) alert(key +"="+responseText[key]);
  //for(key in responseText.target.responseText) 
  //alert(responseText.target.responseText);
var text = JSON.parse(responseText.target.responseText);
            var result;
            if(text.def[0]){
              if(text.def[0].ts) result = text.def[0].ts + "\n" + text.def[0].tr[0].text + "\n";

              if(text.def[0].tr[0].syn){
                for(var i =0; i < text.def[0].tr[0].syn.length & i < 5; i++){
                result += text.def[0].tr[0].syn[i].text + ",";
                }
              }

              result += "\n";

              if(text.def[0].tr[0].mean){
                for(var i =0; i < text.def[0].tr[0].mean.length & i < 5; i++){
                result += text.def[0].tr[0].mean[i].text + ",";
                }
              }
              alert(result);
            }

            else {
              //var xhrr = new XMLHttpRequest();
                xhr.open('GET', "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20170216T173928Z.7ab97636c7a3b6d5.ac165fd4ffa71423021a6c0c31976dca8848df26&text="+range + "&lang=en-ru",true);
                xhr.onload = function(responseText) {
                  var text = JSON.parse(responseText.target.responseText);
                  alert(text.text); 
                }  
                xhr.onerror = function() {
                  alert( 'Ошибка ' + this.status );
                }  
              
              xhr.send();
              };



}

xhr.onerror = function() {
  alert( 'Ошибка ' + this.status );
}

xhr.send();
}
}
