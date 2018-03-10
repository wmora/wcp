import { Request, Response } from 'express'
import { db } from '../db/db'

import * as jwt from 'express-jwt'
import * as jwks from 'jwks-rsa'

import env from '../config/env'

export const authCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${env.AUTH0.DOMAIN}/.well-known/jwks.json`
    }),
    audience: `${env.AUTH0.AUDIENCE}`,
    algorithms: ['RS256']
})

export const fetchUser = async (request: Request, response: Response, next) => {
    if (!request.user || !request.user.sub) {
        throw Error('not_found')
    }

    const auth0Id = request.user.sub.replace('auth0|', '')

    const collection = db.collection('users')

    const user = await collection.findOne({ auth0Id }, {})

    if (!user) {
        throw Error('not_found')
    }

    user._id = user._id.toString()

    request.user = user

    next()
}
