var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var button = buttons.ActionButton({
  id: "mozilla-link",
  label: "Visit Mozilla",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleClick
});

var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");


function handleClick(state) {
  tabs.open("https://oauth.vk.com/authorize?client_id=5804003&display=page&redirect_uri=https://oauth.vk.com/blank.html&scope=2&response_type=token&v=5.60&state=123456"); 
//tabs.open("index.html");
var Request = require("sdk/request").Request;
var quijote = Request({
  url: "https://api.vk.com/method/account.lookupContacts?contacts=89068494095&service=phone&access_token=476a5cafbb59f077d5754315c4fb4898364ac4a33b09c1d386a74ddc51bc96ea2f32ffe507c930cd321c4&v=5.60",
  onComplete: function (response) {
    console.log(response.text);
  }
});

quijote.get();

}