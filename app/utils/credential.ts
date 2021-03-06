import fs from 'fs'
import path from 'path'

interface ICredential {
    client_secret: string
    client_id: string
    redirect_uri: string
    secret: string
    devUserEmail: string
    devApiKey: string
}

export const credential = (): ICredential => {
    const content = fs.readFileSync(path.resolve(__dirname, '../', '../', 'credential.json'))
    if (!content) {
        throw Error('Error loading client secret file')
    }
    const credential = JSON.parse(content.toString())
    const { client_secret, client_id, redirect_uris, secret, devUserEmail, devApiKey } = credential
    return {
        client_secret,
        client_id,
        redirect_uri: redirect_uris[0],
        secret,
        devUserEmail,
        devApiKey,
    }
}
