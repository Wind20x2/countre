// app/components/user/model.ts
import mongoose, { Document } from 'mongoose'

interface IUser {
    resourceName: string
    email: string
    name: string
    photo: string
    tokens: string
}
export interface IUserDoc extends Document, IUser {}

const userSchema = new mongoose.Schema({
    resourceName: {
        type: String,
    },
    email: {
        type: String,
    },
    name: {
        type: String,
    },
    photo: {
        type: String,
    },
    tokens: {
        type: String,
    },
})

export const UserModel = mongoose.model<IUserDoc>('user', userSchema)
