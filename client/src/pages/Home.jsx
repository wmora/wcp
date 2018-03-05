import React, { Component } from 'react'
import { Jumbotron, Grid, Col, ListGroup, ListGroupItem } from 'react-bootstrap'
import { isLoggedIn } from '../utils/authentication'
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
        console.log(`Posting pick ${id}`)
    }

    onTeamPicked = (e) => {
        if (isLoggedIn()) {
            // TODO: Create pick
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
                        const awayTeamKey = `${match.id}-${match.awayTeam.id}`
                        return (
                            <ListGroup key={matchId}>
                                <ListGroupItem onClick={this.onTeamPicked} id={homeTeamKey}>
                                    {match.homeTeam.name}
                                </ListGroupItem>
                                <ListGroupItem onClick={this.onTeamPicked} id={awayTeamKey}>
                                    {match.awayTeam.name}
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