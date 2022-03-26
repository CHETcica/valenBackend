const mongoose = require("mongoose");

const sexulSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    definitionEN: {
        type: String,
        required: true,
    },
    definitionTH: {
        type: String,
        required: true,
    },
});

const Sexul = mongoose.model("sexul", sexulSchema);

module.exports = Sexul;
