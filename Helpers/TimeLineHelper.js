const db = require("../database");
const User = db.User;
const TimeLine = db.TimeLine;
const Like = db.Like;
const Friends = db.Friends;

function saveTimeline(req, res, timelinepicname) {
  console.log("comment ----------------------- >    "+req.params.tLComment);
  var timeLine = new TimeLine();
  timeLine.userId = req.params.id;
  timeLine.timelinePicId = timelinepicname ;
  timeLine.timelinecomment = req.params.tLComment;
  timeLine.Likecount = "0";
  timeLine.commentCount = "0";
  timeLine.shareCount = "0";
  timeLine.createdTime = Date.now();
  try {
    timeLine.save().then(() => res.json({ id: TimeLine._id }));
  } catch (err) {
    console.log("erro    :  " + err);
  }
}



function addComment(req, res, timelinepicname) {
  console.log("comment ----------------------- >    "+req.params.tLComment);
  var timeLine = new TimeLine();
  timeLine.userId = req.params.id;
  timeLine.timelinePicId = timelinepicname ;
  timeLine.timelinecomment = req.params.tLComment;
  timeLine.Likecount = "0";
  timeLine.commentCount = "0";
  timeLine.shareCount = "0";
  timeLine.createdTime = Date.now();
  try {
    timeLine.save().then(() => res.json({ id: TimeLine._id }));
  } catch (err) {
    console.log("erro    :  " + err);
  }
}

function deleteTimeline(req, res) {
  console.log(" -----------params.timelineId   ---------     "+req.params.timelineId);

  TimeLine.deleteOne({ _id: req.params.timelineId }, function(err) {
    if (!err) {
            // message.type = 'notification!';
      console.log(err);
            res.json({});
    }
    else {
      res.json({ id: "successfully deleted" });
    }
});
}

function sendFriendRequest(req, res) {
  console.log(reqesterId+" --------------------     "+AddresseeId);
  var friend = new Friends({
    reqesterId: req.params.reqesterId,
    AddresseeId: req.params.AddresseeId,
    status: "R",
    actionUserId: req.params.reqesterId
    });

    friend.save().then(() => res.json({ Message: 'Request sent successfully' }));
}

async  function getMaxTimelineVersion(user_id, res) {

  console.log("----------------------------------------------------------------------");
 await TimeLine.where('userId', '5ce52e270ab1914efc868384').select('picCount').sort('userId').exec( function(err, doc) {
    console.log("###############");
    if (err) return console.log(err);
    var resdata = JSON.parse(JSON.stringify(doc));
    let k=0;
    for(let i of resdata){
      Object.keys(i).map(key =>{
        if(key === 'picCount'){
          console.log("----------------------------->       :"   + (i[key]+1));
         if(k < (i[key]+1)){
          k=(i[key]+1)
         }
          
        }
      }
       ) // Object.values can be used as well in newer versions.
    }
    console.log(k+"----------------------------->       :");
    return k;
  });
}



function getMaxTimelineVersion1(user_id, res) {

  var  c = TimeLine.where('userId', '5ce52e270ab1914efc868384').select('picCount').sort('userId');
  
    return c;
}


function getTimelines(req, res) {
  let usersarr=[];
  Friends.find({$and:[{status :'A'},{$or:[{
    reqesterId: req.params.reqesterId
  },{
    AddresseeId: req.params.reqesterId
  }]
  }]}).select('AddresseeId reqesterId').exec(async function(err,doc){
    
   let p = await getTimelineIds(doc,res,req.params.reqesterId);

// p.then(function(data){
//   console.log("data ---------------------------------------------->    :   "+JSON.stringify(data));
// });

    

  })

  console.log("Doc    :   "+JSON.stringify(usersarr));
}


// async function getfriendIds(results,res,myid){
  function getTimelineIds(results,res,myid){
  var usersarr = []; // empty Object
  var uniqueArray = [] ;
  var num=[1,2];


  let promise1 = new Promise( async function(resolve, reject) {
    await results.forEach(async function(data) {
        usersarr.push(data.AddresseeId);
        usersarr.push(data.reqesterId);
    },
      
  resolve(usersarr)
  )});
 
 var usersObj = [];
 var timelineResults=[];
 var timelineObj=[];
  let promise2 = new Promise( async function(resolve, reject) {
      promise1.then(function(data){
        uniqueArray = data.filter(function(elem, pos) {
          return data.indexOf(elem) == pos;
      }),
      User.find({_id: { $in: uniqueArray}
      }).
      limit(10).
      select('firstname lastname userImg ').
      exec(async function(err,users){
        if(!users){
          return "some thing went worng";
        }else{
          usersObj=users;
          let promis = new Promise( async function(resolve, reject) {
            await TimeLine.find({userId :{ $in: uniqueArray}}).limit(10).exec(async function(err,timeline){
              if(!timeline){
                console.log("error    :    "+err);
              }
              timelineObj=timeline;
              let p1 = new Promise( async function(resolve, reject) {
               await usersObj.forEach( function(user) {
                console.log("--- ````````````````````````````````````````");
                 timelineObj.forEach( async function(timeline) {
                 if(user._id == timeline.userId ){
                 let k='';
                 /* let promise5 = new Promise( async function(resolve, reject) {
                  await Like.findOne({"timelinePicId":timeline._id,"userId":myid}).exec(async function (err, m) {
                    console.log("--- &&&&&&&&&&&&&&&&&mm     before condtions  mmmmmmm&&&&&&&&&&&&&&&"+m);
                    if(err){
                      console.log(err);
                    }else{
                      console.log("--- &&&&&&&&&&&&&&&&&mmmm   else   bloc mmmmm&&&&&&&&&&&&&&&"+m);
                      if(m !== null)
                      k=m.isLiked;
                    }
                    resolve(k)
                  })
                }); */

                Like.findOne({"timelinePicId":timeline._id,"userId":myid}).exec(async function (err, m) {
                  console.log("--- &&&&&&&&&&&&&&&&&mm     before condtions  mmmmmmm&&&&&&&&&&&&&&&"+m);
                  if(err){
                    console.log(err);
                  }else{
                    console.log("--- &&&&&&&&&&&&&&&&&mmmm   else   bloc mmmmm&&&&&&&&&&&&&&&"+m);
                    if(m !== null)
                    k= await m.isLiked;
                  }
                })
               
                // promise5.then(function(data){
                //   console.log("--- ````````````````````````````````````````````````````````kkkk``````````````````"+k);
                // });
                await timelineResults.push({
                  id:user._id,
                  timeLineId:timeline._id,
                  userImg:user.userImg,
                  firstname:user.firstname,
                  lastname:user.lastname,
                  timelinePicId: timeline.timelinePicId,
                  timelinecomment: timeline.timelinecomment,
                  Likecount: timeline.Likecount,
                  isCurrentUserLiked: false,
                  lastLikedName:timeline.lastLikedName,
                  commentCount:timeline.commentCount,
                  shareCount:timeline.shareCount,
                  postedOn:((Date.now() -timeline.createdTime)/1000)/60,
               })
               k='';
                   }
                 });
               },
             resolve(usersarr)
             )}); 
            //  let r1 = await p1;
            //  console.log("-----gggggggggmmmmllllllllllllllllllllllllllllllllll------- timeline   :    "+JSON.stringify(timelineResults));
            //  return res.status(200).send(timelineResults);
            });
            // console.log("-----gggggggggggggggggggggggggggg-------- uniqueArray   :    "+JSON.stringify(timeline));




          resolve(timelineObj)
          //  console.log("-----gggggggggggggggggggggggggggg-------- uniqueArray   :    "+JSON.stringify(timelineObj));
          }).then(function(data){
            console.log("-----gggggggggggggggggggggggggggg   ffffffffff  -------- timeline   :    "+JSON.stringify(timelineResults));
            return new  Promise(async function(resolve,reject){
              let timelineFinalResults =[]
              timelineResults.forEach(async function(t){



                
                await   Like.findOne({"timelinePicId":t.timeLineId,"userId":myid}).exec(async function (err, m) {
                  if(err){
                    console.log(err);
                  }else{
                    console.log((m !== null)+"--- -------------  M value "+"--------------------------------------------------"+m);
                    if(m !== null){
                      // console.log(JSON.stringify(timelineFinalResults)+"--- -----------------------if   ----------------------------------------"+m);
                      timelineFinalResults.push({
                        id:t.id,
                        timeLineId:t.timeLineId,
                        userImg:t.userImg,
                        firstname:t.firstname,
                        lastname:t.lastname,
                        timelinePicId: t.timelinePicId,
                        timelinecomment: t.timelinecomment,
                        Likecount: t.Likecount,
                        isCurrentUserLiked:m.isLiked,
                        lastLikedName:t.lastLikedName,
                        commentCount:t.commentCount,
                        shareCount:t.shareCount,
                        postedOn:t.postedOn,
                     })
                    //  console.log(JSON.stringify(timelineFinalResults)+"--- -------------------if -end-------------------------------------------"+m);
                    }else{
                      // console.log(JSON.stringify(timelineFinalResults)+"--- -------------------else --------------------------------------------"+m);
                      timelineFinalResults.push({
                        id:t.id,
                        timeLineId:t.timeLineId,
                        userImg:t.userImg,
                        firstname:t.firstname,
                        lastname:t.lastname,
                        timelinePicId: t.timelinePicId,
                        timelinecomment: t.timelinecomment,
                        Likecount: t.Likecount,
                        isCurrentUserLiked:false,
                        lastLikedName:t.lastLikedName,
                        commentCount:t.commentCount,
                        shareCount:t.shareCount,
                        postedOn:t.postedOn,
                     })
                    //  console.log(JSON.stringify(timelineFinalResults)+"--- -------------------else -end-------------------------------------------"+m);
                    }
                  }
                });
                resolve(timelineFinalResults);
                await  res.status(200).send(timelineFinalResults);

                // console.log(JSON.stringify(timelineFinalResults)+"--- ------------------- -end of looop    -------------------------------------------");
              })
              // console.log(JSON.stringify(timelineFinalResults)+"--- ------------------- -end  of Promise -------------------------------------------");
              // resolve(timelineFinalResults);
            }).then(async function(k){
              console.log("--- ------------------------------------------------------------kkk   ---"+JSON.stringify(k));
              // return await res.status(200).send(k);
            });
           });
           let resul = await promis;
         }
            });
          });
          // let r5= await promise5;
          // let r1 = await p1;
         
         
});


/* 
let p1 = new Promise( async function(resolve, reject) {
  await usersObj.forEach(async function(user) {
   await timelineObj.forEach(async function(timeline) {
    if(user._id === timeline.userId ){
      await   timelineResults.push({
          userImg:user.userImg,
          commentCount:timeline.commentCount,
          shareCount:timeline.shareCount,
        })
      }
    });
  },
  // console.log("-----gggggggggnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnmmmmmmmmmmmmm------- timeline   :    "+JSON.stringify(timelineResults)),
resolve(usersarr)
)}); 
// let result5 = await promise5;
let result1 = await promise1;
let result2 = await promise2;
let r1 = await p1;
// console.log("-----gggggggggggggggggggggggggggg-------- timeline   :    "+JSON.stringify(timelineResults));
 */
return '';
}


function updateLikeCount(req,res){

  var users = [] // empty Object

  let p = new Promise(async function(resolve, reject){
    let username ='';
    let timelineId =req.params.timelineId;
    let userId = req.params.userId;
    console.log("inside promise P     req.params.timelineId    "+req.params.timelineId);

    let promise = new Promise( function(resolve, reject) {
      console.log("inside promise 'promise'");
      User.findById(req.params.userId, function(err, p) {
        if (!p)
          return 'Could not load Document';
        else {
          username = p.username;
          console.log(timelineId+"          username    : "+username);
          TimeLine.findById(timelineId, function(err, timeline) {
            if (!p)
              return 'Could not load Document';
            else {
              // console.log("inside promise 'promise' else block"+timeline.Likecount== null ?0:1);
              // do your updates here
              timeline.Likecount = timeline.Likecount+1;
              timeline.lastLikedName = username;
              timeline.save(function(err) {
                if (err)
                  console.log('---------------------error')
                else
                  console.log(timelineId+'--------------------->    success     '+userId);
                  Like.findOne({"timelinePicId":timelineId,"userId":userId}).exec(async function (err, m) {
                    console.log("LIke ~~~~~~~~~~~~err   A  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~    "+m);
                    let LikedObj ='';
                    if (err){
                      console.log("LIke ~~~~~~~~~~~~err   A  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@    "+m !== 'null');
                     
                    }else{
                      console.log("LIke ~~~~~~~~~~~~err   A  =========================    "+(m !== null));
                      // LikedObj=Liked;
                      if(m !== null && m.length != 0 ){
                        m.isLiked = m.isLiked ? false:true;
                        console.log("Liked ------------------------------------------------------------"+m);
                      await  m.save().then(function(err, result) {
                        console.log('User Created');
                    });;
                      }else{
                        console.log("LIke ~~~~~~~~~~~~err  else  if  D ~~~~!!!!!!!!!!!!!!!!!!!!!!~~~~~~~~    "+m);
                        var like = new Like();
                        like.userId = userId;
                        like.timelinePicId = timelineId ;
                        like.isLiked=true;
                        try {
                          like.save(function(err) {
                            if (err)
                              console.log('error')
                            else
                              console.log('success')
                          });
                         return res.send("succesfully Liked");
                        } catch (err) {
                          console.log("erro    :  " + err);
                        }
                      }
                    console.log("LIke ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~    "+like);
                    return res.send("succesfully Liked");
                    // res.status(200).send(user);
                  }
            });
              });
            }
          });
        }
      })
     resolve()
    });
    let result = await promise;
});
}



  
module.exports = {
  updateLikeCount:updateLikeCount,
  sendFriendRequest: sendFriendRequest,
  getTimelines: getTimelines,
  getMaxTimelineVersion: getMaxTimelineVersion,
  saveTimeline: saveTimeline,
  getMaxTimelineVersion1:getMaxTimelineVersion1,
  deleteTimeline:deleteTimeline
};






 /*  let promise3 = new Promise( async function(resolve, reject) {
         await   users.map(async function(user){
              TimeLine.find({userId :{ $in: uniqueArray}}).limit(10).exec(async function(err,timeline){
                if(!timeline){
                  console.log("error    :    "+err);
                }
                timelineObj=timeline;
                // console.log("JSON.stringify(timeline)          :   "+JSON.stringify(timeline));
                timeline.map(async function(timelineObj){
                  if(user._id === timelineObj.userId ){
                  await   usersObj.push({
                      userImg:user.userImg,
                      commentCount:timeline.commentCount,
                      shareCount:timeline.shareCount,
                    })
                  }
                })
               
            })
            })
            console.log("usersObj   dddd :   "+JSON.stringify(usersObj));
           resolve(usersObj);
          });
          // console.log("usersObj    :   "+JSON.stringify(usersObj));
          let result2 = await promise2;
          let result3 = await promise3; */