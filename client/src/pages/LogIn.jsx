import React, { Component } from "react"
import { Form, FormGroup, FormControl, ControlLabel, Button } from "react-bootstrap"

export default class LogIn extends Component {
  render() {
    return (
      <Form>
        <FormGroup>
          <ControlLabel>Name</ControlLabel>
          <FormControl type="text" placeholder="Jane Doe" />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Email</ControlLabel>
          <FormControl type="email" placeholder="jane.doe@example.com" />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Password</ControlLabel>
          <FormControl type="password" placeholder="Password" />
        </FormGroup>
        <Button type="submit">Send invitation</Button>
      </Form>
    )
  }
}
