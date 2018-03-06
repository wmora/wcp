import * as request from 'request-promise-native'
import env from '../config/env'

export async function signUp(email: string, password: string): Promise<any> {
    const result = await request.post({
        url: `${env.AUTH0.DOMAIN}/dbconnections/signup`,
        json: true,
        headers: { 'Content-Type': 'application/json' },
        body: {
            email,
            password,
            connection: env.AUTH0.CONNECTION,
            client_id: env.AUTH0.CLIENT_ID
        }
    })

    return result
}

export async function logIn(email: string, password: string): Promise<any> {
    const result = await request.post({
        url: `${env.AUTH0.DOMAIN}/oauth/token`,
        json: true,
        headers: { 'Content-Type': 'application/json' },
        body: {
            grant_type: 'password',
            username: email,
            password,
            scope: 'user',
            client_id: env.AUTH0.CLIENT_ID,
            client_secret: env.AUTH0.CLIENT_SECRET
        }
    })

    return result
}
