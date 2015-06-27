require('cloud/app.js')
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
//Parse.Cloud.define("hello", function(request, response) {
//  response.success("Hello world!");
//});

Parse.Cloud.job("fetchEvents", function(request, status) {
  // Set up to modify user data
  Parse.Cloud.useMasterKey();
  var newEntries = 0;
  var url = "https://hub.gdgx.io/api/v1/chapters/100528365481290832342/events";
  Parse.Cloud.httpRequest({
    method: "GET",
    url: url,
    success:function(resp)
    {
      data = JSON.parse(resp.text)
    	status.success("Done.");
      for(i = 0; i <= data.items.length; i++)
           insertEvent(data.items[i]);  
    }
  }
});
});
