var Request = require("sdk/request").Request;
var quijote = Request({
  url: "https://api.vk.com/method/account.lookupContacts?contacts=89068494095&service=phone&access_token=476a5cafbb59f077d5754315c4fb4898364ac4a33b09c1d386a74ddc51bc96ea2f32ffe507c930cd321c4&v=5.60",
  //overrideMimeType: "text/plain; charset=latin1",
  onComplete: function (response) {
    console.log(response.text);
  }
});

quijote.get();