const db = require('../database');
var fs = require('fs');
var timeLineHelper = require('../Helpers/TimeLineHelper');

module.exports.createFriendRequest = (req, res) => {
    timeLineHelper.sendFriendRequest(req, res);
};

module.exports.findOne = (req, res) => {
  console.log(req.params.username +"  -----d----- ggggggggggggggggggggggggggggggggggggggggggggg    ");
// User.where("username",req.params.username).exec(function (err, user) {
//   if (err){
//       res.status(500).send(err);
//   }
//   console.log(user);
//   UserHelper.f1();
//   UserHelper.f2();
//   res.status(200).send(user);
// })
UserHelper.f1(req,res,'');


};




module.exports.updateUserImage = (req, res) => {
    console.log(req.params.username +"  -----c----- ggggggggggggggggggggggggggggggggggggggggggggg    ");
    /* User.findById(req.params.id, function(err, p) {
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
      }); */

      UserHelper.f2(req, res);
  };
  



