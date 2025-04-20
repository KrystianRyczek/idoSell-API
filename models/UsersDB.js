const mongoose = require('mongoose')
const bCrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    userName: {
        type: String,},
    password: {
        type: String,
        required: [true, 'Password is required'],
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
      },
      token: {
        type: String,
        default: null,
      },
},{
    versionKey: false,
    timestamps: true,
})


userSchema.methods.setPassword = async function (password) {
  this.password = await bCrypt.hash(password, 10)
}
 
userSchema.methods.validatePassword = async function (password) {
  return bCrypt.compare(password, this.password)
}
const Users = mongoose.model('user', userSchema, 'users')

module.exports = Users