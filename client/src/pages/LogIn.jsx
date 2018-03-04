import React, { Component } from 'react'
import { Jumbotron, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

export default class LogIn extends Component {
  render() {
    return (
      <div>
        <Jumbotron>
          <h1>Welcome!</h1>
          <p>Please log in to continue</p>
        </Jumbotron>
        <Form>
          <FormGroup>
            <ControlLabel>Name</ControlLabel>
            <FormControl required type="text" placeholder="Jane Doe" />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Email</ControlLabel>
            <FormControl required type="email" placeholder="jane.doe@example.com" />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Password</ControlLabel>
            <FormControl required type="password" placeholder="Password" />
          </FormGroup>
          <Button type="submit">Log in</Button>
        </Form>
      </div>
    )
  }
}
