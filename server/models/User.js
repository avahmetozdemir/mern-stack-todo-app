import mongoose from "mongoose"

const userSchema =  new mongoose.Schema({
    username: {
        type: String,
        unique: [true, 'Already exists, try another'],
        required: [true, 'Username is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 8
    },
    id: String 

},{timestamps:true})

const User  =  mongoose.model('User', userSchema)

export default User