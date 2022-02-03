const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Must have a username"],
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
});

// userSchema.pre('save', async function (next) {
//   // Only run this function if password was actually modified
//   if (!this.isModified('password')) return next();

//   // Hash the password with cost of 12
//   this.password = await bcrypt.hash(this.password, 12);
//   next();
// });

// userSchema.post('save', async function (doc, next) {
//   // Only run this function if password was actually modified
//   console.log(doc)
//   console.log('After save')
//   next();
// });

// userSchema.methods.checkPassword = async function (
//   candidatePassword,
//   userPassword
// ) {
//   return await bcrypt.compare(candidatePassword, userPassword);
// };

const User = mongoose.model("user", userSchema);

module.exports = User;
