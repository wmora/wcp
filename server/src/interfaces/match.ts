import { Team } from './team'

export interface Match {
    id: string
    homeTeam: Team
    awayTeam: Team
    date: Date
    status: MatchStatus
    winnerTeamId?: string
}

export enum MatchStatus {
    Pending = 'pending',
    InProgress = 'in_progress',
    Finished = 'finished'
}
