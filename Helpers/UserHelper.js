const db = require('../database');
const User = db.User;
const Friends  = db.Friends;
const Notification = db.Notification;



function a(req,res){
 return    User.where("username",req.params.username).exec(function (err, user) {
        if (err){
            res.status(500).send(err);
        }
        console.log(user);
        res.status(200).send(user);
      })
}



function getNotifications(req,res){
  return    Notification.where({"username":req.params.username,isViewed: false}).exec(function (err, user) {
         if (err){
             res.status(500).send(err);
         }
         console.log(user);
         res.status(200).send(user);
       })
 }

 function searchUser2(req,res){

  
  return User.find({username: {$regex: req.params.searchKey, $options: 'i'}}).limit(10).exec(function (err, user) {
    if (err){
        res.status(500).send(err);
    }
    console.log(user);
    // searchUser(req,res);
    res.status(200).send(user);
  });
} 


async function searchUser111(req,res){
 Friends.find({$and:[{status :'A'},
 { reqesterId: '5ce52e270ab1914efc868384'},
 ]}).exec(async function(err,doc){
  if(!doc){
         return res.status(200).send(user);
       }else{
         let k=''
        let promise = new Promise( function(resolve, reject) {
              // after 1 second signal that the job is done with the result "done"
              doc.forEach(async function(relaiton){
                console.log("  %%%%%%%%%%%%AAAAAAAAAAAAAAAAAAAAAa%%%%%%%%%%%%%%%%%  data ");
                if(relaiton.status == 'A'){
                  console.log("  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%  data ");
                k = relaiton.status;
                }
              })
             resolve()
            });

            let result = await promise;
              console.log(k+"   k ---------ffffffffff--->   data "+result);
       }
 });

  return User.find({username: {$regex: req.params.searchKey, $options: 'i'}}).limit(10).exec(function (err, user) {
    if (err){
        res.status(500).send(err);
    }
    console.log(user);
    // searchUser(req,res);
    res.status(200).send(user);
  });
} 

function getFriends(req, res) {
  let usersarr=[];

  Friends.find({$and:[{status :'A'},{$or:[{
    reqesterId: req.params.reqesterId
  },{
    AddresseeId: req.params.reqesterId
  }]
  }]}).select('AddresseeId reqesterId').exec(async function(err,doc){
   let p= getfriendIds(doc,res,req.params.reqesterId);
/* await doc.map(function(data){
  usersarr.push(data.AddresseeId);
  usersarr.push(data.reqesterId);
}); */

    console.log("Doc    :   "+JSON.stringify(doc));
  })
  console.log("Doc    :   "+JSON.stringify(usersarr));
}


async function getfriendIds(results,res,myid){
  var usersarr = []; // empty Object
  var uniqueArray = [] ;
  var num=[1,2];


  let promise = new Promise( async function(resolve, reject) {
    await results.forEach(async function(data) {
      console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$4");
      if(myid !== data.AddresseeId  ){
        usersarr.push(data.AddresseeId);
      }else if(myid !== data.reqesterId){
        usersarr.push(data.reqesterId);
      }
    },
      
  resolve(usersarr)
  )});
  let result = await promise;
  promise.then(function(data){
    console.log("data         :  "+JSON.stringify(data));
    uniqueArray = data.filter(function(elem, pos) {
      return data.indexOf(elem) == pos;
  }),
  console.log("uniqueArray         :  "+JSON.stringify(uniqueArray));
  User.find({_id: { $in: uniqueArray}
  }).
  limit(10).
  select('_id firstname userImg status').
  exec(function(err,users){
    console.log("Users  :  "+JSON.stringify(users));
    if(!data){
      console.log("Users errr :  ");
      return "some thing went worng";
    }else{
      return res.status(200).send(users);
      // return users
    }
  });
  });

  /* let p = new Promise(async function(resolve, reject){
    await results.forEach(async function(data) {
    let k=''

        

                num.forEach(async function(r){

                  User.findById(data.reqesterId, function(err, p) {
                    if (!p)
                      return next(new Error('Could not load Document'));
                    else {
                      usersarr.push[p];
                          console.log('success')
                    }
                  });



                  console.log("  %%%%%%%%%%%%AAAAAAAAAAAAAAAAAAAAAa%%%%%%%%%%%%%%%%%  data ");
                  if(user._id == relaiton.reqesterId || user._id == relaiton.AddresseeId ){
                    console.log(user._id +" ###############################################    :     "+relaiton.reqesterId);
                  k = relaiton.status;
                  }
                })
               resolve()
              });
  
              let result = await promise;
                console.log(k+"   k ---------ffffffffff--->   data "+result);
                users.push({
                  id:user._id,
                  name: user.firstname+" "+user.lastname,
                  userImg : user.userImg,
                  status:k
               });
               console.log("------------- User   :    "+JSON.stringify(users));
  resolve(users); */
}





async function searchUser(req,res){
 await User.find({username: {$regex: req.params.searchKey, $options: 'i'}}).limit(10).exec( async function (err, searchedResults) {
   if (err){
     return  res.status(500).send(err);
   }
   if(searchedResults.length>0){
    Friends.find({$and:[{status :'A'},
 { reqesterId: '5ce52e270ab1914efc868384'},
 ]}).exec(async function(err,doc){
   if(!doc){
     return res.status(200).send(user);
   }else{
     
    let p=getSearchReuslts(searchedResults,doc);
    p.then(data=>{
      return res.status(200).send(data);
    })
   }
 })
   }
 });
}

async function getSearchReuslts(searchedResults,doc){
  var users = [] // empty Object

  let p = new Promise(async function(resolve, reject){
    await searchedResults.forEach(async function(user) {
    let k=''
          let promise = new Promise( function(resolve, reject) {
                doc.forEach(async function(relaiton){
                  if(user._id == relaiton.reqesterId || user._id == relaiton.AddresseeId ){
                  k = relaiton.status;
                  }
                })
               resolve()
              });
              let result = await promise;
                users.push({
                  id:user._id,
                  name: user.firstname+" "+user.lastname,
                  userImg : user.userImg,
                  status:k
               });
               console.log("------------- User   :    "+JSON.stringify(users));
  resolve(users);
  });
});

return p;


}







function b(req,res,a){
    User.findById(req.params.id, function(err, p) {
        if (!p)
          return next(new Error('Could not load Document'));
        else {
          // do your updates here
          p.userImg = req.params.userImg;
      
          p.save(function(err) {
            if (err)
              console.log('error')
            else
              console.log('success')
          });
        }
      });
}

function updateUserImge(a,name){
    User.findById(a, function(err, p) {
        if (!p)
          return next(new Error('Could not load Document'));
        else {
          // do your updates here
          p.userImg = name;
      
          p.save(function(err) {
            if (err)
              console.log('error')
            else
              console.log('success')
          });
        }
      });
}


function sendFriendRequest(req, res) {
  console.log(req.params.reqesterId+" --------------------     "+req.params.AddresseeId);
  try {
    var query = {};
  Friends.findOne({reqesterId:req.params.reqesterId,AddresseeId:req.params.AddresseeId}, function(err, doc){
    console.log("---------------------fffffffffffffffff------> sendFriendRequest new    ");
    if(!doc){
      var friend = new Friends({
          reqesterId: req.params.reqesterId,
          AddresseeId: req.params.AddresseeId,
          status: req.params.statusCode,
          actionUserId: req.params.reqesterId
          });
          friend.save().then(() => res.json({ Message: 'Request sent successfully' }));
      return res;
    }else{
      console.log("---------------------------> sendFriendRequest new    ");
      doc.status = req.params.statusCode;
      doc.actionUserId=req.params.AddresseeId;
      doc.save(function(err) {
          if (err)
            console.log('error')
          else
            console.log('success')
        });
    }
    if (err) 
    return res.send("succesfully saved");
});
  } catch (error) {
  console.log("---------------------------> sendFriendRequest new    "+error);
  }
  






  // console.log(req.params.reqesterId+" --------------------     "+req.params.AddresseeId);
  // var friend = new Friends({
  //   reqesterId: req.params.reqesterId,
  //   AddresseeId: req.params.AddresseeId,
  //   status: req.params.statusCode,
  //   actionUserId: req.params.reqesterId
  //   });
  //   friend.save().then(() => res.json({ Message: 'Request sent successfully' }));
}


function acceptFriendRequest(req, res) {
  var query = {'reqesterId':req.params.reqesterId,'AddresseeId':req.params.AddresseeId};
  Friends.findOneAndUpdate(query, function(err, doc){
      if(!doc){
        return res.send(500, { error: err });
      }else{
        doc.status = "A";
        doc.actionUserId=req.params.reqesterId;
          p.save(function(err) {
            if (err)
              console.log('error')
            else
              console.log('success')
          });
      }
      if (err) 
      return res.send("succesfully saved");
  });

}


function declineFriendRequest(req, res) {
  var query = {'reqesterId':req.params.reqesterId,'AddresseeId':req.params.AddresseeId};
  Friends.findOneAndUpdate(query, function(err, doc){
      if(!doc){
        return res.send(500, { error: err });
      }else{
        doc.status = "D";
        doc.actionUserId=req.params.reqesterId;
          p.save(function(err) {
            if (err)
              console.log('error')
            else
              console.log('success')
          });
      }
      if (err) 
      return res.send("succesfully saved");
});
}

function blockFriend(req, res) {
  var query = {'reqesterId':req.params.reqesterId,'AddresseeId':req.params.AddresseeId};
  Friends.findOneAndUpdate(query, function(err, doc){
      if(!doc){
        return res.send(500, { error: err });
      }else{
        doc.status = "B";
        doc.actionUserId=req.params.reqesterId;
          p.save(function(err) {
            if (err)
              console.log('error')
            else
              console.log('success')
          });
      }
      if (err) 
      return res.send("succesfully saved");
});
}

module.exports = {
    f1: a,
    f2: b,
    f3:updateUserImge,
    sendFriendRequest: sendFriendRequest,
    searchUser:searchUser,
    acceptFriendRequest:acceptFriendRequest,
    declineFriendRequest:declineFriendRequest,
    blockFriend:blockFriend,
    getFriends:getFriends,
    getNotifications:getNotifications,
  };