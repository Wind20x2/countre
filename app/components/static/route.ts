// app/components/static/route.ts
import express from 'express'
import path from 'path'
import { url, getGoogleAccountFromCode } from '../../utils/googleapi'
import { UserController } from '../user/controller'

const staticRouter = express.Router()

staticRouter.get('/', async (req, res) => {
    if (process.env.NODE_ENN === 'development') {
        const html = path.resolve(__dirname, '../', '../', '../', 'client', 'dist', 'index.html')
        res.sendFile(html)
    } else {
        const html = path.resolve(__dirname, '../', '../', '../', '../', 'client', 'build', 'index.html')
        res.sendFile(html)
    }
})

staticRouter.get('/manifest.json', (req, res) => {
    if (process.env.NODE_ENN === 'development') {
        res.send('{}')
    } else {
        const html = path.resolve(__dirname, '../', '../', '../', '../', 'client', 'build', 'manifest.json')
        res.sendFile(html)
    }
})

staticRouter.get('/static(/*)', (req, res) => {
    if (process.env.NODE_ENN === 'development') {
        const html = path.resolve(__dirname, '../', '../', '../', 'client', `dist${req.url}`)
        res.sendFile(html)
    } else {
        const html = path.resolve(__dirname, '../', '../', '../', '../', 'client', `build${req.url}`)
        res.sendFile(html)
    }
})

staticRouter.get('/login', (req, res) => {
    res.redirect(url())
})

staticRouter.get('/auth', async (req, res) => {
    // @todo dev mode
    await getGoogleAccountFromCode(req.query.code as string)
        .then((account) => {
            const userController = new UserController()
            userController
                .getOrAddUser(account)
                .then((user) => {
                    console.log(user)
                    // @todo Session
                    res.send('<p>auth</p>')
                    // @todo Dashboard
                    // res.redirect('/dashboard')
                })
                .catch(() => {
                    res.redirect('/login-failure')
                    return
                })
        })
        .catch(() => {
            res.redirect('/login-failure')
            return
        })
})

export { staticRouter }
