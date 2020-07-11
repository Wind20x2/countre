// app/app.ts
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

import { userRouter } from 'app/components/user/route'
import { staticRouter } from 'app/components/static/route'
import { loginRouter } from 'app/components/login/route'

import { connectDb } from 'app/mongo'
import { sessionSecret, session } from 'app/utils/session'

// Create a new express application instance
const app: express.Application = express()

app.use(cookieParser(sessionSecret()))
app.use(session())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', staticRouter)
app.use('/', loginRouter)
app.use('/api/users', userRouter)

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
    connectDb()
})
