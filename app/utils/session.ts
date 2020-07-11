import { Request, Response, NextFunction } from 'express'
import expressSession from 'express-session'
import connectMongo from 'connect-mongo'

import { connectionUrl } from 'app/mongo'
import { credential } from './credential'

export const sessionSecret = (): string => {
    const content = credential()
    return content.secret
}

// middleware to secure request
export const isLoggedIn = (req: Request, res: Response, next: NextFunction): Response | undefined => {
    const session = req.session

    if (!session || !session.loggedInUser) {
        return res.status(401).json({ error: 'Access denied' })
    }

    next() // to continue the flow
}

export const login = (session: Express.Session, email: string) => {
    session.loggedInUser = email
}

export const session = () => {
    const MongoStore = connectMongo(expressSession)
    return expressSession({
        secret: sessionSecret(),
        saveUninitialized: false,
        resave: true,
        store: new MongoStore({
            url: connectionUrl,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7 * 2, // two weeks
        }
    })
}
