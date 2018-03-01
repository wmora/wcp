export interface Match {
    id: string
    homeTeamId: string
    awayTeamId: string
    date: Date
    status: MatchStatus
    winnerTeamId?: string
}

export enum MatchStatus {
    Pending = 'pending',
    InProgress = 'in_progress',
    Finished = 'finished'
}
