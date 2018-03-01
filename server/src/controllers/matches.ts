import { Match, MatchStatus } from '../interfaces/match'
import data from '../models/data'

export function findMatch(id: string): Match {
    return findMatchInRound(data.groups, id) || findMatchInRound(data.knockout, id)
}

function findMatchInRound(round: any, id: string): Match {
    for (const phase of Object.keys(round)) {
        const match = round[phase].matches.find((m) => `${m.name}` === id)

        if (match) {
            return {
                id: `${match.name}`,
                homeTeamId: `${match.home_team}`,
                awayTeamId: `${match.away_team}`,
                status: MatchStatus.Pending,
                date: new Date(match.date),
                winnerTeamId: ''
            }
        }
    }

    return null
}
