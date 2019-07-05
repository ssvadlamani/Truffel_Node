const NodeCache = require("node-cache");
const myCache = new NodeCache();


async function setCache(key,value) {
    let obj = 1;
    await  myCache.set(key, value, function(err, success) {
    if (!err && success) {
      // true
      // ... do something ...
    }
  });

  }

 async function getCache(key) {
    await myCache.get( key, function( err, value ){
        if( !err ){
          if(value == undefined){
            // key not found
          }else{
            //{ my: "Special", variable: 42 }
            // ... do something ...
          }
        }
      });
    

  }
  
  module.exports = {
    setCache: setCache,
    getCache: getCache,
  };
