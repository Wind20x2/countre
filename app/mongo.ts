// app/mongo.ts
import mongoose from 'mongoose'

const connection =
    process.env.NODE_ENN === 'development' ? 'mongodb://localhost:27017/countre' : 'mongodb://mongo:27017/countre'

export const connectDb = async (): Promise<typeof mongoose> => {
    return mongoose
        .connect(connection, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then((db) => {
            console.log('MongoDB connected')
            return db
        })
        .catch((e) => {
            console.error(`Mongo connect failure on: ${connection}`)
            throw e
        })
}
