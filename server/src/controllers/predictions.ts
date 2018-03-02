import { Request, Response } from 'express'
import { db } from '../db/db'
import { MatchStatus } from '../interfaces/match'
import * as matchController from './matches'

export function postPrediction(request: Request, response: Response): void {
    // TODO: validateUser()

    const { matchId, winningTeamId } = request.body

    const match = matchController.findMatch(matchId)

    if (!match) {
        response.sendStatus(404)
        return
    }

    if (match.status !== MatchStatus.Pending) {
        response.status(400).send('Cannot modify prediction for match')
    }

    const isValidWinningTeamId = [match.homeTeamId, match.awayTeamId].some((teamId) => teamId === winningTeamId)

    if (!isValidWinningTeamId) {
        response.status(400).send(`Invalid winningTeamId: ${winningTeamId}`)
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
