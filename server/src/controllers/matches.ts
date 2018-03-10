import { Request, Response } from 'express'
import { Match, MatchStatus } from '../interfaces/match'
import data from '../models/data'
import * as teamController from './teams'

export function findMatch(id: string): Match {
    return findMatchInRound(data.groups, id) || findMatchInRound(data.knockout, id)
}

function findMatchInRound(round: any, id: string): Match {
    for (const phase of Object.keys(round)) {
        const match = round[phase].matches.find((m) => `${m.name}` === id)

        if (match) {
            return transformMatch(match)
        }
    }

    return null
}

export function listMatches(request: Request, response: Response): void {
    response.send({ matches: getMatches() })
}

export function getMatches() {
    const matches = []

    for (const group of Object.keys(data.groups)) {
        matches.push({
            id: `group_${group}`,
            name: `Group ${group.toUpperCase()}`,
            matches: data.groups[group].matches.map((match) => transformMatch(match))
        })
    }

    return matches
}

function transformMatch(match: any): Match {
    return {
        id: `${match.name}`,
        homeTeam: teamController.findById(`${match.home_team}`),
        awayTeam: teamController.findById(`${match.away_team}`),
        status: MatchStatus.Pending,
        date: new Date(match.date),
        winnerTeamId: ''
    }
}
