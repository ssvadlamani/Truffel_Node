const IncomingForm = require("formidable").IncomingForm;
var fs = require("fs");
var Promise = require("Promise");
const path = require("path");
const fetch = require("node-fetch");
const Bluebird = require("bluebird");
const NodeCache = require("node-cache");
const myCache = new NodeCache();

fetch.Promise = Bluebird;
var TimeLineHelper = require("../Helpers/TimeLineHelper");
var CacheHelper = require("../Helpers/CacheHelper");

module.exports = function uploadTimeLine(req, res) {
  try {
    console.log("comment -----------uploadTimeLine  ------------ >    "+req.params.tLComment);
  } catch (error) {
    console.log(error);
  }
  
  var form = new IncomingForm();
  form.on("fileBegin", function(name, file) {
    var u = file.name.substr(
      file.name.indexOf("."),
      file.name.indexOf(".") + 3
    );
    console.log("u          : " + u);
    var dir = __dirname + "/profiles/" + req.params.id;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }var dir1 = dir + "/timeline";
    if (!fs.existsSync(dir1)) {
      fs.mkdirSync(dir1);
    }
    var timelinepicname = req.params.id + "_timeline_"+Date.now();
TimeLineHelper.saveTimeline(req,res,timelinepicname+""+u);
        let dirty = dir1 + "/" + timelinepicname+""+ u;
        console.log("dirtory               :  "+dirty);
        file.path = dirty;
  });
  form.on("file", function(name, file) {
    console.log("Uploaded " + req.params.id);
  });
  form.on("end", () => {
    res.json();
  });
  form.parse(req);


  // *******************************************************************************************************************************
};

async function setCache(key, value) {
  let obj = 1;
  await myCache.set(key, value, function(err, success) {
    if (!err && success) {
      console.log("success     :" + success);
      return success;
      // true
      // ... do something ...
    }
  });
}

async function getRegion(ipAddr) {
  let res;
  try {
    res = await iplocation(ipAddr);
    if (res.country === "US") {
      return `${res.country}`;
    } else {
      return "USA";
    }
  } catch (err) {
    throw err;
  }
}

function iplocation() {
  return "USA";
}

async function getCache(key) {
  await myCache.get(key, function(err, value) {
    if (!err) {
      if (value == undefined) {
        // key not found
      } else {
        console.log("-------fff-->  " + value);
        return value;
        //{ my: "Special", variable: 42 }
        // ... do something ...
      }
    }
  });
}


module.exports.updateLikeCount = (req, res) => {

  TimeLineHelper.updateLikeCount(req,res);
};

module.exports.findOneTime = (req, res) => {
  var u = req.params.id;

  TimeLineHelper.getMaxTimelineVersion();
};

/* // console.log("value    :  "+resdata[0][picCount]);

for (var key in resdata[0]) {
  console.log(resdata[key]+"    key   : " + key);
  console.log('------------------------- .     '+Object.values(resdata[key]));
} */

// working code

/* console.log("uploadTimeLine");
  var form = new IncomingForm();
  form.on("fileBegin", function(name, file) {
    var u = file.name.substr(
      file.name.indexOf("."),
      file.name.indexOf(".") + 3
    );
    console.log("u          : " + u);
    var dir = __dirname + "/profiles/" + req.params.id;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }var dir1 = dir + "/timeline";
    if (!fs.existsSync(dir1)) {
      fs.mkdirSync(dir1);
    }
    var timelinepicname = req.params.id + "_timeline_"
   var picCountNumber=0;
    var query = TimeLineHelper.getMaxTimelineVersion1(req.params.id, res);
 query.exec(function(err, timelineVersion) {
  if (err) return console.log(err);
  var resdata = JSON.parse(JSON.stringify(timelineVersion));
  for(let i of resdata){
    Object.keys(i).map(key =>{
      if(key === 'picCount'){
        console.log("----------------------------->       :"   + (i[key]+1));
        picCountNumber =(i[key]+1);
      }
    }
     ) // Object.values can be used as well in newer versions.
  }
});
console.log("----------------------------->    picCountNumber    :"   + picCountNumber);
TimeLineHelper.saveTimeline(req,res,timelinepicname,picCountNumber);
        let dirty = dir1 + "/" + req.params.id + "_timeline_"+picCountNumber+""+ u;
        console.log("dirtory               :  "+dirty);
        file.path = dirty;


   
  });

  form.on("file", function(name, file) {
    console.log("Uploaded " + req.params.id);
  });
  form.on("end", () => {
    res.json();
  });
  form.parse(req);
 */

// console.log("-------------------------------->    :  "+JSON.stringify(l));
// async function asyncSay(name){
// 	return new Promise((resolve, reject) => {
//     resolve(`My name is ${name}`)
//   })
// }

// async function getv(){
//   return new Promise((resolve, reject) => {
//     resolve(CacheHelper.getCache("picCount"))
//   })
// }
// async function sayMyName(){
// 	const result = await getv();
//   return result;
// }

// (async () => {
// 	console.log(await sayMyName())
// })()

// "use strict";

// // Fetch a random joke
// async function fetchQuote() {
//   try {
//     const rsp = await CacheHelper.getCache("picCount"),
//         data = await rsp;
//         console.log("data  :   "+data);
//         return data;
//   } catch (error) {
//     console.log(error);
//   }

// }

// async function sayJoke()
// {
//   try {
//     let result = await fetchQuote();
//    console.log( `Joke: ${ result }` );
//   } catch( err ) {
//     console.error( err );
//   }
// }
// sayJoke();








/* 
console.log(
  "----USA    :     " +
    getRegion("8.8.8.8")
      .then(loc => console.log("kkkkkkkkkkkkkkkkk   : " + loc))
      .catch(err => console.log(err))
);

try {
  var a=TimeLineHelper.getMaxTimelineVersion().then(res => 
    console.log("res **********************************8   :   " + res) .catch(err => console.log("res ************ 8"+err))
  );
  console.log("@@@@@@@@@@@@@@@@@@@@@@@    :  "+a);
} catch (error) {
  console.log(error);
}

// ******************************************************************************************************************************
setCache("picCount", 5);
let m = getCache("picCount");
console.log(
  "fjskfffffffffff   :  " +
    m.then(res => {
      console.log("     --------->  " + res);
    })
); */