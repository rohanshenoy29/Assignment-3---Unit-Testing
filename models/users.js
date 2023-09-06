const mongoose = require('mongoose')
const validator = require('validator')





// Creating a user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email ID already present"],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  phoneNumber: {
    type: String,
    minlength: 10,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

// Creating a collection 
const User = new mongoose.model("User",userSchema);

module.exports = User;


 