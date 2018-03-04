import React, { Component } from 'react'
import { Jumbotron, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

export default class SignUp extends Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }

    onClick = () => {
        const { name, email, password } = this.state

        fetch('http://localhost:3024/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                email,
                password
            })
        }).then(() => {
            // TODO: redirect to home
        })
    }

    onNameChange = (e) => {
        this.setState({ name: e.target.value })
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
                    <p>Please sign up to continue</p>
                </Jumbotron>
                <Form>
                    <FormGroup>
                        <ControlLabel>Name</ControlLabel>
                        <FormControl required type="name" onChange={this.onNameChange} value={this.state.name} placeholder="Jane Doe" />
                    </FormGroup>
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
                    Sign up
                </Button>
            </div>
        )
    }
}
