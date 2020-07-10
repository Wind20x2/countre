// app/app.ts
import express from 'express';
import path from 'path';
import { User } from './models/user';
import { connectDb } from './connection';

// Create a new express application instance
const app: express.Application = express();

// Static files (React)
app.get('/', (_, res) => {
    if (process.env.NODE_ENV === 'production') {
        res.sendFile(path.resolve(__dirname, '../', '../', 'client', 'build', 'index.html'));
    } else {
        res.sendFile(path.resolve(__dirname, '../', 'client', 'dist', 'index.html'));
    }
});

app.get('/manifest.json', (_, res) => {
    if (process.env.NODE_ENV === 'production') {
        res.sendFile(path.resolve(__dirname, '../', '../', 'client', 'build', 'manifest.json'));
    }
});

app.get('/static(/*)', (req, res) => {
    if (process.env.NODE_ENV === 'production') {
        res.sendFile(path.resolve(__dirname, '../', '../', 'client', `build${req.url}`));
    } else {
        res.sendFile(path.resolve(__dirname, '../', 'client', `dist${req.url}`));
    }
});

// API
app.get('/api/users', async (_, res) => {
    const users = await User.find();
    res.json(users);
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');

    connectDb().then(() => {
        console.log('MongoDb connected');
    });
});
