const mongoose = require("mongoose");

const passionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
});

const Passion = mongoose.model("passion", passionSchema);

module.exports = Passion;
