// app/models/user.ts
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
    },
})

export const User = mongoose.model('User', userSchema)
