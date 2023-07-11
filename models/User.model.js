const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Username is required'],
    lowercase: true,
    trim: true,
  },
  passwordHash: {
    type: String,
    required: [true, 'Password is required'],
    }
},
{
  timestamps : true,
}
);

const User = model("User", userSchema);

module.exports = User;
