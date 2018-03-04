import React, { Component } from 'react'
import { Jumbotron, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

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

        fetch('http://localhost:3024/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password
            })
        }).then(() => {
            // TODO: redirect to home
        })
    }

    onEmailChange = (e) => {
        this.setState({ email: e.target.value })
    }

    onPasswordChange = (e) => {
        this.setState({ password: e.target.value })
    }

    render() {
        return (
            <div>
                <Jumbotron>
                    <h1>Welcome!</h1>
                    <p>Please log in to continue</p>
                </Jumbotron>
                <Form>
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
                </Form>
                <Button onClick={this.onClick} type="submit">
                    Log in
                </Button>
            </div>
        )
    }
}
