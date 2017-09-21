const mongoose = require('mongoose');

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
      jobTitle: {
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
      socialLink: {
        type: String,
      }
});

const UserModel = mongoose.model('User', userSchema);


module.exports = UserModel;
