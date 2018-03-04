import { Request, Response } from 'express'

export function signUp(request: Request, response: Response) {
    const { name, email, password } = request.body

    if (!name || !email || !password) {
        response.status(400).send('Invalid credentials')
        return
    }

    // TODO, call auth0 /dbconnections/signup

    response.send({})
}

export function logIn(request: Request, response: Response) {
    const { email, password } = request.body

    if (!email || !password) {
        response.status(400).send('Invalid credentials')
        return
    }

    // TODO, call auth0 /oauth/token

    response.send({})
}
