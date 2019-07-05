const mongoose = require('mongoose');
const config = require('config');
const OAuthAccessToken = require('./OAuthAccessToken');
const OAuthAuthorizationCode = require('./OAuthAuthorizationCode');
const OAuthClient = require('./OAuthClient');
const OAuthRefreshToken = require('./OAuthRefreshToken');
const OAuthScope = require('./OAuthScope');
const User = require('./User');
const Leave = require('./Leave');
const Friends = require('./FriendRelations');
const Company = require('./Company');
const Product = require('./Product');
const TimeLine = require('./TimeLine');
const Like = require('./Like');
const Notification = require('./Notification');

mongoose.Promise = Promise;

function connect() {
  mongoose.connect(config.database).then(() => {
    console.log('Mongoose Connected');
  }).catch((err) => {
    console.log(err);
  });
}

module.exports = {
  connect,
  OAuthAccessToken,
  OAuthAuthorizationCode,
  OAuthClient,
  OAuthRefreshToken,
  OAuthScope,
  User,
  Leave,
  Friends,
  Company,
  Product,
  TimeLine,
  Like,
  Notification,
};
