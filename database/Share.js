const mongoose = require("mongoose"),

const ShareSchema = mongoose.Schema({
    userId: String,
    timelinePicId: String,
    sharedComment: String
});

module.exports = mongoose.model("Share", ShareSchema);
