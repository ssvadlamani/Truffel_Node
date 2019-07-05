const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TimeLineSchema = new Schema({
  userId: String,
  timelinePicId: String,
  timelinecomment: String,
  Likecount: Number,
  lastLikedName: String,
  commentCount:Number,
  shareCount:Number,
  picCount:Number,
  createdTime:Number
});

module.exports = mongoose.model("TimeLine", TimeLineSchema);
