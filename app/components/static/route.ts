// app/components/static/route.ts
import express from 'express'
import path from 'path'
import { Response } from 'express'

import { isLoggedIn } from 'app/utils/session'
import { isDev } from 'app/utils/environment'

const staticRouter = express.Router()
const baseDirDev = path.resolve(__dirname, '../', '../', '../', 'client', 'dist')
const baseDirProd = path.resolve(__dirname, '../', '../', '../', 'client', 'build')

/**************
 * React
 ***************/
const snedIndex = (res: Response): void => {
    if (isDev()) {
        const html = `${baseDirDev}/index.html`
        res.sendFile(html)
    } else {
        const html = `${baseDirProd}/index.html`
        res.sendFile(html)
    }
}

staticRouter.get('/', (_, res) => {
    snedIndex(res)
})

staticRouter.get('/dashboard/', isLoggedIn, (_, res) => {
    snedIndex(res)
})

staticRouter.get('/login-failure/', (_, res) => {
    snedIndex(res)
})

/**************
 * Assets
 ***************/
staticRouter.get('/manifest.json', (_, res) => {
    if (isDev()) {
        res.send('{}')
    } else {
        const html = `${baseDirProd}/manifest.json`
        res.sendFile(html)
    }
})

staticRouter.get('/static(/*)', (req, res) => {
    if (isDev()) {
        const html = `${baseDirDev}${req.url}`
        res.sendFile(html)
    } else {
        const html = `${baseDirProd}${req.url}`
        res.sendFile(html)
    }
})

export { staticRouter }
