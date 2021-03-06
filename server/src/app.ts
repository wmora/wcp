import { connect as connectDb } from './db/db'
import { authCheck, fetchUser } from './middleware/authentication'

import * as bodyParser from 'body-parser'
import * as express from 'express'

import * as authenticationController from './controllers/authentication'
import * as frontendController from './controllers/frontend'
import * as matchesController from './controllers/matches'
import * as picksController from './controllers/picks'

const app = express()

connectDb()

app.use(bodyParser.json())

app.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.get('/matches', matchesController.listMatches)
app.get('/myhome', authCheck, fetchUser, frontendController.getHome)
app.get('/picks', authCheck, fetchUser, picksController.listPicks)
app.post('/picks', authCheck, fetchUser, picksController.postPick)
app.post('/login', authenticationController.logIn)
app.post('/signup', authenticationController.signUp)

app.use((error, request, response, next) => {
    if (error.name === 'UnauthorizedError') {
        response.status(401).send('Invalid token')
    } else {
        response.status(error.status || 500).send(error)
    }
})

app.listen(3024, () => console.log('Example app listening on port 3024!'))
