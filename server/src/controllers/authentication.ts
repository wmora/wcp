import { Request, Response } from 'express'
import * as request from 'request'
import env from '../config/env'
import * as auth0 from '../external/auth0'

export function signUp(request: Request, response: Response) {
    const { name, email, password } = request.body

    if (!name || !email || !password) {
        response.status(400).send('Invalid credentials')
        return
    }

    // TODO, call auth0 /dbconnections/signup

    response.send({})
}

export async function logIn(req: Request, response: Response) {
    const { email, password } = req.body

    if (!email || !password) {
        response.status(400).send('Invalid credentials')
        return
    }

    try {
        const result = await auth0.logIn(email, password)
        response.send(result)
    } catch (error) {
        response.status(400).send({
            error: 'authentication_error',
            errorDescription: error.error.error_description
        })
    }
}
