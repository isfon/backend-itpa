const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
    unique: true,
    trim: true,
    maxlength: [20, 'must be less than or equal to 20'],
    minlength: [3, 'must be greater than 3'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  }
});


// Encrpt the password ad Presave it
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    //  only run if password is modified
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12); // hashing password
  next();
});

// comparing password
userSchema.methods.correctPassword = async function (candidate_Password, user_Password) {
  console.log(candidate_Password);
  return await bcrypt.compare(candidate_Password, user_Password);
};

const User = mongoose.model('User', userSchema);

export default User