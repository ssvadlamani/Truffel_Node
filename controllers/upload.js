const IncomingForm = require("formidable").IncomingForm;
var fs = require('fs');
const path = require('path');
var UserHelper = require('../Helpers/UserHelper');
var TimeLineHelper = require('../Helpers/TimeLineHelper');
module.exports = function upload(req, res) {
  var form = new IncomingForm();
  // __dirname='D:\Preparations\React Js\react-ui\react-file-upload\server\profiles';
  form.on('fileBegin', function (name, file){
    console.log(req.params.id+"form.basepath     ###############################xcbvbxbcxbxcbxb########:  "+req.params.timelineComment);


    var u =file.name.substr(file.name.indexOf("."),file.name.indexOf(".")+3)  ;
    console.log("u          : "+u);
    var dir =__dirname + '/profiles/' + req.params.id;
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  }
    file.path = dir + '/' + req.params.id+""+u;

    UserHelper.f3(req.params.id,req.params.id+""+u);
});

form.on('file', function (name, file){
    console.log('Uploaded ' + req.params.id);
});
  form.on("end", () => {
    res.json();
  });
  form.parse(req);
};



module.exports = function uploadTimeLine(req, res) {
  var form = new IncomingForm();
  // console.log("form.basepath     :  "+form.dirname);
  // form.uploadDir ='D:\Preparations\React Js\react-ui\react-file-upload\server\profiles';
  // console.log("form.basepath     :  "+form.dirname);
  /* form.on("file", (field, file) => {
    console.log("form.basepath     :  "+form.dirname);
  }); */

  // __dirname='D:\Preparations\React Js\react-ui\react-file-upload\server\profiles';
  form.on('fileBegin', function (name, file){
    console.log(req.params.id+"form.basepath     ###############################xcbvbxbcxbxcbxb########:  "+form.dirname);


    var u =file.name.substr(file.name.indexOf("."),file.name.indexOf(".")+3)  ;
    console.log("u          : "+u);
    var dir =__dirname + '/profiles/' + req.params.id;
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  }
    file.path = dir + '/' + req.params.id+""+u;

    UserHelper.f3(req.params.id,req.params.id+""+u);
});

form.on('file', function (name, file){
    console.log('Uploaded ' + req.params.id);
});
  form.on("end", () => {
    res.json();
  });
  form.parse(req);
};


module.exports.getProfilePic = (req, res) => {
  var u =req.params.userImage.substr(req.params.userImage.indexOf("."),req.params.userImage.indexOf(".")+3)  ;
  var u1 =req.params.userImage.substr(0,req.params.userImage.indexOf("."))  ;
  console.log("u1    :   "+u1+"     u          : "+u);
  var dir =+ '/profiles/' + req.params.id;

  return  res.sendFile( __dirname + "\\profiles\\" +u1+"\\"+ req.params.userImage);;
};

module.exports.getTimelinePic1 = (req, res) => {
  var dirc= __dirname + "\\profiles\\"+req.params.id+"\\timeline\\"+ req.params.id+"_timeline_1559648198881.jpg";
  console.log("dirc  getTimelinePic  :   "+dirc);
  return  res.sendFile( dirc);;
};


module.exports.getTimeline = (req, res) => {
  TimeLineHelper.getTimelines(req,res);
};


module.exports.deleteTimeline = (req, res) => {
  TimeLineHelper.deleteTimeline(req,res);
};

module.exports.getTimelinePic = (req, res) => {
  console.log(req.params.timelineId+"form.basepath     ###############################xcbvbxbcxbxcbxb########:   "+__dirname + "\\profiles\\"+ req.params.userId);

  return  res.sendFile( __dirname + "\\profiles\\"+req.params.userId+"\\timeline\\"+ req.params.timelineId);
};


