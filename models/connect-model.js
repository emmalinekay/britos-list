const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.plugin(require('mongoose-regex-search'));

const connectSchema = new Schema({
    firstName: {
      type: String,
      normalized: String,
      index: true,
      searchable: true,
      required: [true, 'Please provide the Connection\'s name']
    },
    lastName: {
      type: String,
      normalized: String,
      index: true,
      searchable: true,
    },
    jobTitle: {
      type: String,
      index: true,
      searchable: true,
    },
    photoUrl: {
      type: String,
    },
    email: {
      type: String,
      match: [/.+@.+\..+/, "Your email doesn't have the right structure john@example.com"],
      index: true,
      searchable: true,
    },
    company: {
      type: String,
      normalized: String,
      index: true,
      searchable: true,
    },
    phoneNumber: {
      type: Number,
      index: true,
      searchable: true,
    },
    socialLink: {
      type: String,
      index: true,
      searchable: true,
    },
    originOfConnection: {
      type: String,
      index: true,
      searchable: true,
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
