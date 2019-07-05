const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = Schema({
    userId: String,
    timelinePicId: String,
    NotificationType: Boolean,
    isViewed: Boolean,
});

module.exports = mongoose.model("Notification", NotificationSchema);
