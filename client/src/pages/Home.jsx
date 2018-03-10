import React, { Component } from 'react'
import { Jumbotron, Grid, Col, ListGroup, ListGroupItem } from 'react-bootstrap'
import { isLoggedIn, getAccessToken } from '../utils/authentication'
import LogIn from './LogIn'

export default class Home extends Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            matches: [],
            showLogin: false
        }
    }

    postPick = (id) => {
        const separatorIndex = id.indexOf('-')
        const matchId = id.substring(0, separatorIndex)
        const winningTeamId = id.substring(separatorIndex + 1, id.length)

        const pick = {
            matchId,
            winningTeamId
        }

        fetch('http://localhost:3024/picks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getAccessToken()}`
            },
            body: JSON.stringify(pick)
        })
            .then((response) => response.json())
            .then((pick) => this.updateMatchPick(pick))
    }

    updateMatchPick = (pick) => {
        const { matches } = this.state

        for (let group of matches) {
            const index = group.matches.findIndex((match) => match.id === pick.matchId)
            if (index >= 0) {
                const match = group.matches[index]
                match.winningTeamId = pick.winningTeamId
                group.matches[index] = match
                this.setState({ matches })
                break
            }
        }
    }

    fetchPicks = () => {
        fetch('http://localhost:3024/picks', {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        })
            .then((response) => response.json())
            .then(({ picks }) => {
                picks.forEach((pick) => this.updateMatchPick(pick))
            })
    }

    onTeamPicked = (e) => {
        if (isLoggedIn()) {
            this.postPick(e.target.id)
        } else {
            this.setState({
                showLogin: true
            })
        }
    }

    onLogInResult = (success) => {
        this.setState({
            showLogin: false
        })
    }

    componentDidMount() {
        fetch('http://localhost:3024/matches')
            .then((response) => response.json())
            .then(({ matches }) => {
                this.setState({
                    matches
                })
            })
            .then(() => this.fetchPicks())
    }

    getFlagClass = (iso2) => {
        return `flag-icon flag-icon-${iso2}`
    }

    render() {
        const { matches } = this.state

        const matchesContent = matches.map((group) => {
            return (
                <Col md={4} key={group.id}>
                    <h1> {group.name} </h1>
                    {group.matches.map((match) => {
                        const matchId = `${group.id}-${match.id}`
                        const homeTeamKey = `${match.id}-${match.homeTeam.id}`
                        let homeTeamBsStyle
                        if (match.winningTeamId === match.homeTeam.id) {
                            homeTeamBsStyle = 'success'
                        }
                        const awayTeamKey = `${match.id}-${match.awayTeam.id}`
                        let awayTeamBsStyle
                        if (match.winningTeamId === match.awayTeam.id) {
                            awayTeamBsStyle = 'success'
                        }
                        return (
                            <ListGroup key={matchId}>
                                <ListGroupItem onClick={this.onTeamPicked} id={homeTeamKey} bsStyle={homeTeamBsStyle}>
                                    <span className={this.getFlagClass(match.homeTeam.iso2)} /> {match.homeTeam.name}
                                </ListGroupItem>
                                <ListGroupItem onClick={this.onTeamPicked} id={awayTeamKey} bsStyle={awayTeamBsStyle}>
                                    <span className={this.getFlagClass(match.awayTeam.iso2)} /> {match.awayTeam.name}
                                </ListGroupItem>
                            </ListGroup>
                        )
                    })}
                </Col>
            )
        })

        return (
            <div>
                <Jumbotron>
                    <h1>Welcome!</h1>
                    <p>Pick the winning teams!</p>
                </Jumbotron>
                <Grid>{matchesContent}</Grid>
                <LogIn show={this.state.showLogin} onLogInResult={this.onLogInResult} />
            </div>
        )
    }
}
