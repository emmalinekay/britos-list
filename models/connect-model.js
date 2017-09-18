const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const connectSchema = new Schema({
    firstName: {
      type: String,
      required: [true, 'Please provide the Connection\'s name']
    },
    lastName: {
      type: String
    },
    email: {
      type: String,
      match: [/.+@.+\..+/, "Your email doesn't have the right structure john@example.com"]
    },
    phoneNumber: {
      type: Number
    },
    originOfConnection: {
      type: String,
    },
    description: {
      type: String,
      maxlength: [1000, "Your description cannot be over 1000 characters"]
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true
    }
});


const ConnectModel = mongoose.model('Connect', connectSchema);

module.exports = ConnectModel;
