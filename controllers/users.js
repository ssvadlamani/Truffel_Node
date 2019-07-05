const db = require('../database');
const IncomingForm = require("formidable").IncomingForm;
var fs = require('fs');
var UserHelper = require('../Helpers/UserHelper');
const path = require('path')

const User = db.User;

module.exports.createUser = (req, res) => {
  const user = new User(req.body);

  user.save()
    .then(() => res.json({ id: user._id }));


};

module.exports.findOne = (req, res) => {
  console.log(req.params.username +"  ---r------- ggggggggggggggggggggggggggggggggggggggggggggg    ");
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
    console.log(req.params.username +"  -----m----- ggggggggggggggggggggggggggggggggggggggggggggg    ");
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

  module.exports.searchUser = (req, res) => {
    console.log(req.params.searchKey +"  -----l- ---- ggggggggggggggggggggggggggggggggggggggggggggg    ");
      UserHelper.searchUser(req, res);
  };

  module.exports.getNotifications = (req, res) => {
    console.log(req.params.searchKey +"  -----l- ---- ggggggggggggggggggggggggggggggggggggggggggggg    ");
      UserHelper.getNotifications(req, res);
  };


  module.exports.sendFriendRequest = (req, res) => {
    console.log("  -------------------------------------------------------------------------------- g");
      UserHelper.sendFriendRequest(req, res);
  };

  module.exports.acceptFriendRequest = (req, res) => {
    console.log("  --------------------------------------acceptFriendRequest------------------------------------------ g");
      UserHelper.acceptFriendRequest(req, res);
  };

  module.exports.declineFriendRequest = (req, res) => {
    console.log("  -----------------------------------------declineFriendRequest--------------------------------------- g");
      UserHelper.declineFriendRequest(req, res);
  };

  module.exports.blockFriend = (req, res) => {
    console.log("  --------------------------------blockFriend------------------------------------------------ g");
      UserHelper.blockFriend(req, res);
  };

  module.exports.getFriends = (req, res) => {
    console.log("  ------------------------------------------getFriends-------------------------------------- g");
      UserHelper.getFriends(req, res);
  };

