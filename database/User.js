const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  password: String,
  firstname: String,
  lastname: String,
  emailId: String,
  phone: Number,
  isPhoneVerified: Boolean,
  isemailVerified: Boolean,
  dept: String,
  gender: String,
  dob: Date,
  loginfailedattempts: Number,
  status: Boolean,
  role: String,
  nationality: String,
  altmobile: Number,
  prid: String,
  userImg:String,
  profileUrl:String
});

module.exports = mongoose.model("User", UserSchema);
