// app/components/user/route.ts
import express from 'express'
import { isLoggedIn } from 'app/utils/session'
import { UserController } from './controller'

const userRouter = express.Router()
const userController = new UserController()

userRouter.get('/me', isLoggedIn, async (req, res) => {
    const user = await userController.getUser(req.session?.loggedInUser).catch(() => {
        res.status(404)
        res.send({
            error: 'Not found',
            message: `User not found: ${req.session?.loggedInUser}`,
        })
    })
    res.json(user)
})

export { userRouter }
