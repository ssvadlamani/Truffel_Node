const mongoose = require("mongoose"),

const CommnentSchema = mongoose.Schema({
    userId: String,
    timelinePicId: String,
    comment: String
});

module.exports = mongoose.model("Comment", CommnentSchema);
