// app/components/user/route.ts
import express from 'express'
import { UserController } from './controller'

const userRouter = express.Router()
const userController = new UserController()

userRouter.get('/', async (_, res) => {
    const users = await userController.getUsers()
    res.json(users)
})

export { userRouter }
