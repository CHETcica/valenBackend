const mongoose = require("mongoose");

const sexulSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    definition: {
        type: String,
        required: true,
    },
});

const Sexul = mongoose.model("sexul", sexulSchema);

module.exports = Sexul;
