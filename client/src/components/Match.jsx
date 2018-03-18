import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import PropTypes from 'prop-types'
import Team from './Team'
import { isNumber } from '../utils/numbers'

export default class Match extends Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            showSave: false,
            pick: {
                homeTeamResult: props.pick && `${props.pick.homeTeamResult}`,
                awayTeamResult: props.pick && `${props.pick.awayTeamResult}`
            }
        }
    }

    static propTypes = {
        matchId: PropTypes.string.isRequired,
        homeTeam: PropTypes.object.isRequired,
        awayTeam: PropTypes.object.isRequired,
        onPickSubmit: PropTypes.func.isRequired,
        pick: PropTypes.object
    }

    isValidScore = (score) => {
        return score && isNumber(score) && Number(score) >= 0
    }

    onScoreChanged = (teamId, score) => {
        const { homeTeam, awayTeam } = this.props
        const { pick } = this.state

        if (teamId === homeTeam.id) {
            pick.homeTeamResult = score
        } else if (teamId === awayTeam.id) {
            pick.awayTeamResult = score
        }

        this.setState({ pick })
    }

    showSave() {
        const { pick: originalPick } = this.props
        const { pick } = this.state
        const isValidPick = this.isValidScore(pick.homeTeamResult) && this.isValidScore(pick.awayTeamResult)

        if (!originalPick) {
            return isValidPick
        }

        const isHomeTeamModified = originalPick.homeTeamResult !== Number(pick.homeTeamResult)
        const isAwayTeamModified = originalPick.awayTeamResult !== Number(pick.awayTeamResult)

        return isValidPick && (isHomeTeamModified || isAwayTeamModified)
    }

    onSave = () => {
        const { pick } = this.state
        this.props.onPickSubmit({
            matchId: this.props.matchId,
            ...pick
        })
    }

    getTeam = (team, pickedScore) => {
        return <Team id={team.id} name={team.name} iso2={team.iso2} onScoreChanged={this.onScoreChanged} pickedScore={pickedScore} />
    }

    render() {
        const { matchId, homeTeam, awayTeam } = this.props
        const { pick } = this.state

        const saveButton = this.showSave() ? (
            <ListGroupItem active style={{ textAlign: 'center' }} onClick={this.onSave}>
                {'Save'}
            </ListGroupItem>
        ) : null

        return (
            <ListGroup key={matchId}>
                {this.getTeam(homeTeam, pick.homeTeamResult)} {this.getTeam(awayTeam, pick.awayTeamResult)}
                {saveButton}
            </ListGroup>
        )
    }
}
