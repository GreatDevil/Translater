var pageMod = require("sdk/page-mod");

var tabs = require("sdk/tabs");

var Request = require("sdk/request").Request;

tabs.on('ready', function(tab) {

var myPanel = require("sdk/panel").Panel({
  width: 180,
  height: 180,
  contentURL: "https://en.wikipedia.org/w/index.php?title=Jetpack&useformat=mobile"
});

myPanel.show();



  var worker = tab.attach({
    contentScriptFile: '../request.js'
  });
  worker.port.on("word", function(message) {
  	console.log(message);
    var quijote = Request({
  		url: "https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20170216T185607Z.227cf6c7ea443739.bc56e9903db4e0e489b81333be7c284f41a8a451&lang=en-ru&text=" + message,
  		onComplete: function (response) {
  			var text = JSON.parse(response.text);
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
  				worker.port.emit("resp", result);
  			}
  			else {
  				var qui = Request({
  					url: "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20170216T173928Z.7ab97636c7a3b6d5.ac165fd4ffa71423021a6c0c31976dca8848df26&text="+
  				     	 message + "&lang=en-ru",
  					onComplete: function (response) {
  						var text = JSON.parse(response.text);
  						worker.port.emit("resp", text.text); 
  					}    
  				});
  				qui.get();
        };
  		}
    });
	    quijote.get();
  });
});

/*pageMod.PageMod({
  include: "*",
  contentScript: 'window.onload=function(){alert(document.body.innerHTML)}'
});*/