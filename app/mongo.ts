// app/mongo.ts
import mongoose from 'mongoose'
import { isDev } from 'app/utils/environment'

export const connectionUrl = isDev() ? 'mongodb://localhost:27017/countre' : 'mongodb://mongo:27017/countre'

export const connectDb = async (): Promise<typeof mongoose> => {
    return mongoose
        .connect(connectionUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then((db) => {
            console.log('MongoDB connected')
            return db
        })
        .catch((e) => {
            console.error(`Mongo connect failure on: ${connectionUrl}`)
            throw e
        })
}
