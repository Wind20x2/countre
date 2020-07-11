// app/components/login/route.ts
import express from 'express'

import { UserController } from 'app/components/user/controller'
import { IUserDoc } from 'app/components/user/model'
import { url, getGoogleAccountFromCode, IGoogleUser } from 'app/utils/googleapi'
import { isDev } from 'app/utils/environment'
import { credential } from 'app/utils/credential'
import { login } from 'app/utils/session'

const loginRouter = express.Router()

loginRouter.get('/login', (req, res) => {
    if (!isDev()) {
        res.redirect(url())
        return
    }

    if (!req.session) {
        res.redirect(url())
        return
    }

    login(req.session, credential().devUserEmail)
    res.redirect('/dashboard')
})

loginRouter.get('/logout', (req, res) => {
    if (!req.session) {
        res.redirect('/')
        return
    }

    req.session.destroy(() => {})
    res.redirect('/')
})

loginRouter.get('/auth', async (req, res) => {
    const code = req.query.code as string
    if (!code || !req.session) {
        res.redirect('/login-failure')
        return
    }

    await getGoogleAccountFromCode(code)
        .then((account: IGoogleUser) => {
            const userController = new UserController()
            userController
                .getOrAddUser(account)
                .then((user: IUserDoc) => {
                    login(req.session!, user.email)
                    res.redirect('/dashboard')
                })
                .catch(() => {
                    res.redirect('/login-failure')
                })
        })
        .catch(() => {
            res.redirect('/login-failure')
        })
})

export { loginRouter }
