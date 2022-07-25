const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
    _id1: {
        type: String,
        required: false,
    },
    _id2: {
        type: String,
        required: false,
    },
    time: {
        type: Date,
        required: false,
    },
    details:{
        type: String,
        required: false,
    },
});

const History = mongoose.model("history", historySchema);

module.exports = History;
