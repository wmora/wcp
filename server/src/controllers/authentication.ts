import { Request, Response } from 'express'
import env from '../config/env'
import { db } from '../db/db'
import * as auth0 from '../external/auth0'

export async function signUp(request: Request, response: Response) {
    const { name, email, password } = request.body

    if (!name || !email || !password) {
        response.status(400).send('Invalid credentials')
        return
    }

    try {
        const { _id } = await auth0.signUp(email, password)

        const collection = db.collection('users')

        const result = await collection.insert({
            name,
            email,
            auth0Id: _id
        })

        const newUser = result.ops[0]
        const session = await auth0.logIn(email, password)

        response.send({
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                ...session
            }
        })
    } catch (error) {
        response.status(400).send({
            error: 'signup_error',
            errorDescription: error.error.description
        })
    }
}

export async function logIn(req: Request, response: Response) {
    const { email, password } = req.body

    if (!email || !password) {
        response.status(400).send('Invalid credentials')
        return
    }

    try {
        const collection = db.collection('users')

        const user = await collection.findOne({ email }, {})

        if (!user) {
            response.status(404).send('User not found')
            return
        }

        const session = await auth0.logIn(email, password)
        response.send({
            user: {
                _id: user._id,
                name: user.name,
                email,
                ...session
            }
        })
    } catch (error) {
        response.status(400).send({
            error: 'authentication_error',
            errorDescription: error.error.error_description
        })
    }
}
