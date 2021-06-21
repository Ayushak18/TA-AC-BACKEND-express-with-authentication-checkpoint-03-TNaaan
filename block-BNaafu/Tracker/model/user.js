let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bcrypt = require('bcrypt');

let userSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  age: Number,
  phoneNumber: Number,
  country: String,
  isVerified: { type: Boolean, default: false },
});

userSchema.pre('save', function (next) {
  if (this.password) {
    bcrypt.hash(this.password, 10, (error, hashedPassword) => {
      if (error) {
        next(error);
      } else {
        this.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

userSchema.methods.verifyPassword = function (password, cb) {
  bcrypt.compare(password, this.password, (error, result) => {
    return cb(error, result);
  });
};

let User = mongoose.model('user', userSchema);

module.exports = User;
