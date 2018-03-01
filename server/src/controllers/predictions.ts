import { Request, Response } from 'express'
import { db } from '../db/db'
import * as matchController from './matches'

export function postPrediction(request: Request, response: Response): void {
    // TODO: validateUser()

    const { matchId, winningTeamId } = request.body

    const match = matchController.findMatch(matchId)

    if (!match) {
        response.sendStatus(404)
        return
    }

    const isValidWinningTeamId = [match.homeTeamId, match.awayTeamId].some((teamId) => teamId === winningTeamId)

    if (!isValidWinningTeamId) {
        response.sendStatus(400)
    }

    const collection = db.collection('predictions')

    collection.insert({
        matchId,
        winningTeamId
    }, (err, result) => {
        if (err) {
            response.sendStatus(400)
        } else {
            response.send({ prediction: result.ops[0] })
        }
    })
}
