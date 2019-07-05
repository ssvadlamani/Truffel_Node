const oauthMiddlewares = require('./oauthServerMiddlewares');
const usersController = require('./controllers/users');
const clientsController = require('./controllers/clients');
const leavesController = require('./controllers/LeaveBalance');
const upload = require('./controllers/upload');
const uploadTimeLine = require('./controllers/UploadTimeLine');
var companies = require('./controllers/CompanyControllers')
var products = require('./controllers/ProductControllers');

function initialize(app) {
  app.all('/oauth/token', oauthMiddlewares.token);

  // app.get('/oauth/authorize', oauthMiddlewares.authorize);
  app.post('/oauth/authorize', oauthMiddlewares.authorize);

  app.get('/secure', oauthMiddlewares.authenticate, (req, res) => {
    res.json({ message: 'Secure data' });
  });

  app.post('/users', usersController.createUser);
  app.post('/users/:reqesterId/:AddresseeId/:statusCode', usersController.sendFriendRequest);
  app.get('/users/getFriends/:reqesterId', usersController.getFriends);
  app.get('/users/:username', usersController.findOne);
  app.post('/users/:id/:userImg', usersController.updateUserImage);
  app.get('/users/searchUser/:searchKey', usersController.searchUser);

  app.post('/clients', clientsController.createClient);
  app.get('/clients', clientsController.getClient);

  app.get("/getProfilePic/:userImage", upload.getProfilePic);
  app.get("/getTimeline/:reqesterId", upload.getTimeline);
  app.post("/upload/:id", upload);
  app.post("/uploadTimeLine/:tLComment/:id", uploadTimeLine);
  app.post('/createLeave' ,leavesController.createLeave);
  app.get('/getMyLeaveBalance/:username' ,leavesController.findOne);
  app.get("/getTimelinePic/:userId/:timelineId", upload.getTimelinePic);
  app.get("/getNotifications/:userId", upload.getTimelinePic);


  app.delete("/timeline/delete/:timelineId", upload.deleteTimeline);

  app.get("/updateLikeCount/:userId/:timelineId", uploadTimeLine.updateLikeCount);
  /* app.get('/getMyLeaveBalance' ,function(request,response){
    var query1=request.body.username;
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%     :   "+query1);
    }); */


    
  
    app.get('/api/companies/init', companies.init);
    app.get('/api/companies', companies.findAll);

    app.get('/api/products', products.findAll);
        
    // Find a single Product by Name
      app.get('/api/products/:productName', products.findByName);
    
    // Find all Products of a Company
      app.get('/api/products/company/:companyId', products.findByCompanyId);



      app.post("/echo", function(req, res) {
        var temp = {
          google: {
            expectUserResponse: true,
            richResponse: {
              items: [
                {
                  simpleResponse: {
                    textToSpeech: "this is a simple response"
                  }
                }
              ]
            }
          }
        };
        var speech =
    req.body.queryResult &&
    req.body.queryResult.parameters &&
    req.body.queryResult.parameters.echoText
      ? req.body.queryResult.parameters.echoText
      : "Seems like some problem. Speak again.";
  return res.json({
    payload: temp,
    data: temp,
    fulfillmentText: "Sample response",
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
  });
});
      

}

module.exports = initialize;
