import React, { Component } from 'react'
import { Modal, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'
import { setToken } from '../utils/authentication'

export default class LogIn extends Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            email: '',
            password: ''
        }
    }

    onClick = () => {
        const { email, password } = this.state

        if (!email || !password) {
            return
        }

        fetch('http://localhost:3024/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password
            })
        }).then((response) => {
            setToken()
            this.props.onLogInResult(true)
        })
    }

    onEmailChange = (e) => {
        this.setState({ email: e.target.value })
    }

    onPasswordChange = (e) => {
        this.setState({ password: e.target.value })
    }

    onModalDismiss = () => {
        this.props.onLogInResult(false)
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.onModalDismiss}>
                <Modal.Header>
                    <Modal.Title>Welcome! Please log in to continue</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <FormGroup>
                            <ControlLabel>Email</ControlLabel>
                            <FormControl
                                required
                                type="email"
                                onChange={this.onEmailChange}
                                value={this.state.email}
                                placeholder="jane.doe@example.com"
                            />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Password</ControlLabel>
                            <FormControl
                                required
                                type="password"
                                onChange={this.onPasswordChange}
                                value={this.state.password}
                                placeholder="Password"
                            />
                        </FormGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.onModalDismiss}>Close</Button>
                        <Button bsStyle="primary" onClick={this.onClick} type="submit">
                            Log in
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }
}
