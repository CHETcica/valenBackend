const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Must have a username"],
  },
  email: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  bron: {
    type: Date,
    // required: true,
    required: false,
  },
  phone: {
    type: String,
    // required: true,
    required: false,
  },
  location: {
    type: [Number],
    required: false,
  },
  passion: {
    type: Object,
    required: true,
  },
  interested: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: false,
  },
  social: {
    type: Object,
    required: false,
  },
  userimageprofile: {
    type: [String],
    required: true,
  },
  userimage: {
    type: [String],
    required: false,
  },
  frind_id: {
    type: [String],
    required: false,
  },
  user_details: {
    higth: {
      type: Number,
      required: false,
    },
    weigth: {
      type: Number,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    interested: {
      type: String,
      required: false,
    },
    taste: {
      type: [String],
      required: false,
    },
    likes: {
      type: [String],
      required: false,
    },
    unlike: {
      type: [String],
      required: false,
    },
    likesMe: {
      type: [String],
      required: false,
    },
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
