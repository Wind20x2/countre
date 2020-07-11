// app/components/user/model.ts
import mongoose, { Document } from 'mongoose'

interface IUser {
    email: string
    name: string
    photo: string
}
export interface IUserDoc extends Document, IUser {}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    name: {
        type: String,
    },
    photo: {
        type: String,
    },
})

export const UserModel = mongoose.model<IUserDoc>('user', userSchema)
