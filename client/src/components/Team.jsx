import React, { Component } from 'react'
import { Row, Col, FormControl, ListGroupItem } from 'react-bootstrap'

export default class TeamComponent extends Component {
    getFlagClass = (iso2) => {
        return `flag-icon flag-icon-${iso2}`
    }

    onScoreChanged = (value) => {
        console.log(this.props)
    }

    render() {
        const { teamName, teamIso2, bsStyle } = this.props

        return (
            <ListGroupItem bsStyle={bsStyle}>
                <Row xs={4} style={{ display: 'flex', alignItems: 'center' }}>
                    <Col xs={8}>
                        <span className={this.getFlagClass(teamIso2)} /> {teamName}
                    </Col>
                    <Col xs={2} style={{ paddingLeft: 0, paddingRight: 0, textAlign: 'center' }}>
                        {}
                    </Col>
                    <Col xs={2} style={{ paddingLeft: 10, paddingRight: 9, textAlign: 'center' }}>
                        <FormControl onChange={this.onScoreChanged} />
                    </Col>
                </Row>
            </ListGroupItem>
        )
    }
}
