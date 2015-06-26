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
    {
        var Event = Parse.Object.extend("Event");
        var event = new Event();
        var item = data.items[i];
        if(item)
        {
        event.set("ID",item._id);
        event.set("title",item.title);
        //event.set("description",item.about);
        //event.set("start_time",item.start);
        //event.set("end_time",item.end);
        //event.set("location",item.location);
        console.log(item.geo);
        //event.set("coordinates",new Parse.GeoPoint([item.geo.lat,item.geo.lng]));
        event.save(null,{
          success: function(gameScore) {
            // Execute any logic that should take place after the object is saved.
            console.log('New object created with objectId: ' + gameScore.id);
          },
          error: function(gameScore, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            console.log('Failed to create new object, with error code: ' + error.message);
          }
        });
      }
    }
  }
});
});
