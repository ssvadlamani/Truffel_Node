const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FriendsSchema = new Schema({
    reqesterId: String,
    AddresseeId: String,
    status: String,
    actionUserId: String,
});

module.exports = mongoose.model("Friends", FriendsSchema);
