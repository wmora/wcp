import * as express from 'express'
import * as bodyParser from 'body-parser'

import predictionsController = require('./controllers/predictions')

const app = express()

app.use(bodyParser.json())

app.post('/predictions', predictionsController.postPrediction)

app.listen(3000, () => console.log('Example app listening on port 3000!'))
