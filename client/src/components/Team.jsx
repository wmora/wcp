import React, { Component } from 'react'
import { Row, Col, FormControl, ListGroupItem } from 'react-bootstrap'
import PropTypes from 'prop-types'

export default class TeamComponent extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        onScoreChanged: PropTypes.func,
        name: PropTypes.string.isRequired,
        iso2: PropTypes.string.isRequired,
        pickedScore: PropTypes.string,
        realScore: PropTypes.string,
        bsStyle: PropTypes.string
    }

    getFlagClass = (iso2) => {
        return `flag-icon flag-icon-${iso2}`
    }

    onScoreChanged = (e) => {
        this.props.onScoreChanged(this.props.id, e.target.value)
    }

    render() {
        const { name, iso2, pickedScore, realScore, bsStyle } = this.props

        return (
            <ListGroupItem bsStyle={bsStyle}>
                <Row xs={4} style={{ display: 'flex', alignItems: 'center' }}>
                    <Col xs={8}>
                        <span className={this.getFlagClass(iso2)} /> {name}
                    </Col>
                    <Col xs={2} style={{ paddingLeft: 0, paddingRight: 0, textAlign: 'center' }}>
                        {realScore}
                    </Col>
                    <Col xs={2} style={{ paddingLeft: 10, paddingRight: 9, textAlign: 'center' }}>
                        <FormControl onChange={this.onScoreChanged} value={pickedScore || ''} />
                    </Col>
                </Row>
            </ListGroupItem>
        )
    }
}
