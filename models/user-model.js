const mongoose = require('mongoose');
// const ConnectModel = require('../models/connect-model.js');

const Schema = mongoose.Schema;


const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true
    },
    encryptedPassword: {
      type: String
    },
      firstName: {
        type: String,

      },
      lastName: {
        type: String,
      },
      photoUrl: {
        type: String,
      },
      company: {
        type: String,
      },
      phoneNumber: {
        type: Number,
      },
});

const UserModel = mongoose.model('User', userSchema);


module.exports = UserModel;
