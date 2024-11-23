const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    required: true,
  },
  work: {
    type: String,
    enum: ["chef", "waiter", "owner", "manager"],
  },
  mobile: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
});

userSchema.pre("save", async function(next){
  const user = this;

  if (!user.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);

    const hashpassword = await bcrypt.hash(user.password, salt);

    user.password = hashpassword;

    next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.ComparePassword =  async function(userPassword){
    try {
        const isMatchPassword = await bcrypt.compare(userPassword, this.password);
   return isMatchPassword;

    } catch (error) {
throw error;        
    }
}




const User = mongoose.model("User", userSchema);

module.exports = User;
