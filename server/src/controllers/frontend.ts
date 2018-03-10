import { Request, Response } from 'express'
import { getMatches } from './matches'
import { getPicks } from './picks'

export const getHome = async (request: Request, response: Response) => {
    const matches = getMatches()
    const picks = await getPicks(request.user._id)

    picks.forEach((pick) => updateMatchPick(matches, pick))

    response.send({ matches })
}

const updateMatchPick = (matches, pick) => {
    for (const group of matches) {
        const index = group.matches.findIndex((match) => match.id === pick.matchId)
        if (index >= 0) {
            const match = group.matches[index]
            match.winningTeamId = pick.winningTeamId
            group.matches[index] = match
            break
        }
    }
}
