
// These two lines are required to initialize Express in Cloud Code.
 express = require('express');
 app = express();

// Global app configuration section
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
app.use(express.bodyParser());    // Middleware for reading request body

function insertEvent(event)
{
	var Event = Parse.Object.extend("Event");
    var event = new Event();
    event.set("ID",item._id);
    event.set("title",item.title);
    event.set("description",item.about);
    event.set("start_time",item.start);
    event.set("end_time",item.end);
    if(item.location)
    	event.set("location",item.location);
    if(item.geo.lat && item.geo.lng)
    	event.set("coordinates",new Parse.GeoPoint([item.geo.lat,item.geo.lng]));
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

// This is an example of hooking up a request handler with a specific request
// path and HTTP verb using the Express routing API.
app.get('/hello', function(req, res) {
  res.render('hello', { message: 'Congrats, you just set up your app!' });
});

app.get('/haha',function(req,res){
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
  res.send("No worries folks!");
});

// // Example reading from the request query string of an HTTP get request.
// app.get('/test', function(req, res) {
//   // GET http://example.parseapp.com/test?message=hello
//   res.send(req.query.message);
// });

// // Example reading from the request body of an HTTP post request.
// app.post('/test', function(req, res) {
//   // POST http://example.parseapp.com/test (with request body "message=hello")
//   res.send(req.body.message);
// });

// Attach the Express app to Cloud Code.
app.listen();
