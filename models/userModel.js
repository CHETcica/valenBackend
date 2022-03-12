const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: false,
  },
  born: {
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
    required: false,
  },
  interested: {
    type: String,
    required: false,
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
    type: String,
    required: false,
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
    taste: {
      type: [String],
      required: false,
    },
    likes: {
      type: [String],
      required: false,
    },
    unlikes: {
      type: [String],
      required: false,
    },
    likesMe: {
      type: [String],
      required: false,
    },
  },
});

userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.post("save", async function (doc, next) {
  // Only run this function if password was actually modified
  console.log(doc);
  console.log("After save");
  next();
});

userSchema.methods.checkPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("user", userSchema);

module.exports = User;
