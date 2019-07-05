const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LikeSchema = Schema({
    userId: String,
    timelinePicId: String,
    isLiked: Boolean,
    iscomment: Boolean,
    isPicture:Boolean
});

module.exports = mongoose.model("Like", LikeSchema);
