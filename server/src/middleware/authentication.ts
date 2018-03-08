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
