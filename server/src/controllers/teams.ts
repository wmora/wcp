import { Team } from '../interfaces/team'
import data from '../models/data'

export function findById(id: string): Team {
    const team = data.teams.find((t) => `${t.id}` === id)

    return {
        id: `${team.id}`,
        name: team.name,
        iso2: team.iso2
    }
}
