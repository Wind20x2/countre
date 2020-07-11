// @see https://medium.com/@jackrobertscott/how-to-use-google-auth-api-with-node-js-888304f7e3a0
// @see https://developers.google.com/people/quickstart/nodejs

import fs from 'fs'
import path from 'path'
import { google } from 'googleapis'
import { OAuth2Client } from 'googleapis-common'
import { Credentials } from 'google-auth-library'

type NullableString = string | null

export interface IGoogleUser {
    resourceName: string
    email: string
    name: string
    photo: string
    tokens: Credentials
}

const defaultScope = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
]

/**
 * Create an OAuth2 client with the given credentials
 * @return {OAuth2Client | string}
 */
const createConnection = (): OAuth2Client => {
    const content = fs.readFileSync(path.resolve(__dirname, '../', '../', '../', 'credential.json'))

    if (!content) {
        throw Error('Error loading client secret file')
    }

    const credential = JSON.parse(content.toString())

    const { client_secret, client_id, redirect_uris } = credential.web
    return new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])
}

/**
 * Get connection URL
 * @parm {OAuth2Client} auth An authorized OAuth2 client
 * @return {string} URL
 */
const getConnectionUrl = (auth: OAuth2Client): string => {
    return auth.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: defaultScope,
    })
}

/**
 * Get tokens from returning code
 * @parm {string} code Returning code from auth URL
 * @return {Promise<Credentials>}
 */
const getTocken = async (code: string): Promise<Credentials> => {
    const auth = createConnection()

    const data = await auth.getToken(code).catch((e) => console.error(e))
    if (!data) {
        throw Error('Failed to get token.')
    }

    return data.tokens
}

/**
 * Get connection URL if it's available
 * @return {string} URL
 */
export const url = (): string => {
    const auth = createConnection()
    const url = getConnectionUrl(auth)
    return url
}

/**
 * Get Google account information from the given code
 *
 * @param {string} code
 * @return {Promise<IGoogleUser>}
 */
export const getGoogleAccountFromCode = async (code: string): Promise<IGoogleUser> => {
    const auth = createConnection()

    const tokens = await getTocken(code).catch((e) => {
        throw e
    })

    auth.setCredentials(tokens)
    const service = google.people({ version: 'v1', auth })

    const me = await service.people
        .get({
            personFields: 'emailAddresses,names,photos',
            resourceName: 'people/me',
        })
        .catch((e) => {
            throw e
        })

    const email = (me.data.emailAddresses && me.data.emailAddresses[0] && me.data.emailAddresses[0].value) || null
    const name = (me.data.names && me.data.names[0] && me.data.names[0].displayName) || null
    const photo = (me.data.photos && me.data.photos[0] && me.data.photos[0].url) || ''

    if (!me.data.resourceName || !email || !name) {
        throw Error('Google account information is missing.')
    }

    return {
        resourceName: me.data.resourceName,
        email,
        name,
        photo,
        tokens,
    }
}
