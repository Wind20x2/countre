// app/connection.ts
import mongoose from 'mongoose';

const connection = 'mongodb://localhost:27017/countre';
/*
docker container run -d --name mongo --publish 27017:27017 -d mongo
*/

export const connectDb = async (): Promise<void | typeof mongoose> => {
    return mongoose
        .connect(connection, {
            useNewUrlParser: true,
            user: 'sujin',
            pass: 'sujin',
        })
        .catch((e) => {
            console.log(e);
        });
};
