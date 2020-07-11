// app/app.ts
import express from 'express'

import { userRouter } from './components/user/route'
import { staticRouter } from './components/static/route'
import { connectDb } from './mongo'

// Create a new express application instance
const app: express.Application = express()

app.use('/', staticRouter)
app.use('/api/users', userRouter)

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
    connectDb()
})
