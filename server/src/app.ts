import { connect as connectDb } from './db/db'
import { authCheck } from './middleware/authentication'

import * as bodyParser from 'body-parser'
import * as express from 'express'

import * as authenticationController from './controllers/authentication'
import * as matchesController from './controllers/matches'
import * as picksController from './controllers/picks'

const app = express()

connectDb()

app.use(bodyParser.json())

app.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

app.get('/matches', matchesController.listMatches)
app.post('/picks', authCheck, picksController.postPick)
app.post('/login', authenticationController.logIn)
app.post('/signup', authenticationController.signUp)

app.use((error, request, response, next) => {
    if (error.name === 'UnauthorizedError') {
        response.status(401).send('Invalid token')
    }
})

app.listen(3024, () => console.log('Example app listening on port 3024!'))
