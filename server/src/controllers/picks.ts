import { Request, Response } from 'express'
import { db } from '../db/db'
import { MatchStatus } from '../interfaces/match'
import * as matchController from './matches'
import { Pick } from '../interfaces/pick'

export async function postPick(request: Request, response: Response): void {
    const { matchId, winningTeamId } = request.body

    const match = matchController.findMatch(matchId)

    if (!match) {
        response.sendStatus(404)
        return
    }

    if (match.status !== MatchStatus.Pending) {
        response.status(400).send('Cannot modify prediction for match')
    }

    const isValidWinningTeamId = [match.homeTeam.id, match.awayTeam.id].some((teamId) => teamId === winningTeamId)

    if (!isValidWinningTeamId) {
        response.status(400).send({
            error: {
                name: 'bad_request',
                description: `Invalid winningTeamId: ${winningTeamId}`
            }
        })
        return
    }

    const collection = db.collection('picks')

    await collection.updateOne(
        {
            userId: request.user._id,
            matchId
        },
        {
            $set: {
                winningTeamId
            }
        },
        { upsert: true }
    )

    response.send({
        matchId,
        winningTeamId
    })
}

export const getPicks = (request: Request, response: Response) => {}
