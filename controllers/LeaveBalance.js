const db = require('../database');

const Leave = db.Leave;

module.exports.createLeave = (req, res) => {
  const leave = new Leave(req.body);

  leave.save()
    .then(() => res.json({ id: leave._id }));
};

module.exports.findOne = (req, res) => {
    debugger
    console.log("  ---------- $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$    "+req.params.username);
    Leave.where("username",req.params.username)
.exec(function (err, leave) {
    if (err){
        res.status(500).send(err);
    }
    console.log(leave);
    res.status(200).send(leave);
})
};
