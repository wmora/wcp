import { Request, Response } from 'express'
import * as _ from 'lodash'
import { db } from '../db/db'
import { MatchStatus } from '../interfaces/match'
import { Pick } from '../interfaces/pick'
import * as matchController from './matches'

const isValidScore = (score: number): boolean => {
    return _.isInteger(score) && score >= 0
}

export async function postPick(request: Request, response: Response) {
    const { matchId, homeTeamResult: pickedHomeTeamResult, awayTeamResult: pickedAwayTeamResult } = request.body

    if (!matchId) {
        response.status(400).send('Missing matchId')
        return
    }

    const SCORES = [pickedHomeTeamResult, pickedAwayTeamResult]

    SCORES.forEach((score) => {
        if (!isValidScore(Number(score))) {
            response.status(400).send({
                error: {
                    name: 'bad_request',
                    description: `Invalid value ${score}`
                }
            })
            return
        }
    })

    const match = matchController.findMatch(matchId)

    if (!match) {
        response.sendStatus(404)
        return
    }

    if (match.status !== MatchStatus.Pending) {
        response.status(400).send({
            error: {
                name: 'bad_request',
                description: 'Cannot modify prediction for match'
            }
        })
        return
    }

    const homeTeamResult = Number(pickedHomeTeamResult)
    const awayTeamResult = Number(pickedAwayTeamResult)

    const collection = db.collection('picks')

    await collection.updateOne(
        {
            userId: request.user._id,
            matchId
        },
        {
            $set: {
                homeTeamResult,
                awayTeamResult
            }
        },
        { upsert: true }
    )

    response.send({
        matchId,
        homeTeamResult,
        awayTeamResult
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
    const { matchId, homeTeamResult, awayTeamResult } = pick

    return {
        matchId,
        homeTeamResult,
        awayTeamResult
    }
}
