import { Request, Response } from 'express'
import { db } from '../db/db'
import { MatchStatus } from '../interfaces/match'
import { Pick } from '../interfaces/pick'
import * as matchController from './matches'

export async function postPick(request: Request, response: Response) {
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

export const listPicks = async (request: Request, response: Response) => {
    const picks = await getPicks(request.user._id)
    response.send({ picks })
}

export const getPicks = async (userId): Promise<Pick[]> => {
    const collection = db.collection('picks')
    const picks = await collection.find({ userId }, {}).toArray()
    return picks.map((pick) => transformPick(pick))
}

const transformPick = (pick): Pick => {
    const { matchId, winningTeamId } = pick

    return {
        matchId,
        winningTeamId
    }
}
