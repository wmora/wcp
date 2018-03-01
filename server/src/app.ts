import { connect as connectDb } from './db/db'

import * as bodyParser from 'body-parser'
import * as express from 'express'

import predictionsController = require('./controllers/predictions')

const app = express()

connectDb()

app.use(bodyParser.json())

app.post('/predictions', predictionsController.postPrediction)

app.listen(3000, () => console.log('Example app listening on port 3000!'))
