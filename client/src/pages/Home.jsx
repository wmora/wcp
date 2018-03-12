import React, { Component } from 'react'
import { Jumbotron, Grid, Row, Col, ListGroup, Navbar, Nav, NavItem } from 'react-bootstrap'
import Team from '../components/Team'
import { isLoggedIn, getAccessToken, logout } from '../utils/authentication'
import LogIn from './LogIn'

const BASE_URL = 'http://localhost:3024'

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

        fetch(`${BASE_URL}/picks`, {
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

    fetchUserHome = () => {
        fetch(`${BASE_URL}/myhome`, {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        })
            .then((response) => response.json())
            .then(({ matches }) => {
                this.setState({
                    matches
                })
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

    onLogInSelected = () => {
        this.setState({ showLogin: true })
    }

    onLogOutSelected = () => {
        logout()
        window.location.reload()
    }

    onLogInResult = (success) => {
        this.setState({
            showLogin: false
        })

        if (success) {
            this.fetchUserHome()
        }
    }

    fetchMatches = () => {
        fetch(`${BASE_URL}/matches`)
            .then((response) => response.json())
            .then(({ matches }) => {
                this.setState({
                    matches
                })
            })
    }

    componentDidMount() {
        if (isLoggedIn()) {
            this.fetchUserHome()
        } else {
            this.fetchMatches()
        }
    }

    render() {
        const { matches } = this.state

        const matchesContent = matches.map((group) => {
            return (
                <Col sm={4} key={group.id}>
                    <h1> {group.name} </h1>
                    {group.matches.map((match) => {
                        const matchId = `${group.id}-${match.id}`
                        const homeTeamKey = `${match.id}-${match.homeTeam.id}`
                        let homeTeamBsStyle
                        if (match.winnerTeamId === match.homeTeam.id) {
                            homeTeamBsStyle = 'success'
                        }
                        const awayTeamKey = `${match.id}-${match.awayTeam.id}`
                        let awayTeamBsStyle
                        if (match.winnerTeamId === match.awayTeam.id) {
                            awayTeamBsStyle = 'success'
                        }
                        return (
                            <ListGroup key={matchId}>
                                <Team
                                    id={homeTeamKey}
                                    teamName={match.homeTeam.name}
                                    teamIso2={match.homeTeam.iso2}
                                    bsStyle={homeTeamBsStyle}
                                />
                                <Team
                                    id={awayTeamKey}
                                    teamName={match.awayTeam.name}
                                    teamIso2={match.awayTeam.iso2}
                                    bsStyle={awayTeamBsStyle}
                                />
                            </ListGroup>
                        )
                    })}
                </Col>
            )
        })

        const authNavItem = isLoggedIn() ? (
            <NavItem onClick={this.onLogOutSelected}>Log Out</NavItem>
        ) : (
            <NavItem onClick={this.onLogInSelected}>Log In / Sign up</NavItem>
        )

        const navBar = (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>WCP</Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem eventKey={1} href="#">
                        Leaderboard
                    </NavItem>
                </Nav>
                <Nav pullRight>{authNavItem}</Nav>
            </Navbar>
        )

        return (
            <div>
                <Grid>
                    <Row>
                        {navBar}
                        <Jumbotron>
                            <h1>Welcome!</h1>
                            <p>Pick the winning teams!</p>
                        </Jumbotron>
                    </Row>
                    <Row>{matchesContent}</Row>
                </Grid>
                <LogIn show={this.state.showLogin} onLogInResult={this.onLogInResult} />
            </div>
        )
    }
}
