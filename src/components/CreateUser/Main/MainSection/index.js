import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';

export default class Main extends Component {
  constructor(props){
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);


    this.state = {
      username: '',
    }
  }

  onChangeUsername(e){
    this.setState({
      username: e.target.value
    });
  }

  onSubmit(e){
    e.preventDefault();

    const user = {
      username: this.state.username,
    }

    console.log(user);

    axios.post('http://localhost:5000/users/add', user)
    .then(res => console.log(res.data))
    .catch(err => console.log(err));

    this.setState({
      username: ''
    })

  }

  render() {
    return(
        <Container fluid="md" className='mt-2' expand="lg">
          <div className='mt-2'>
            <h3>Create User Page</h3>
          </div>
          <Form onSubmit={this.onSubmit}>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text"
              required
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </Form.Group>
            <Button variant="primary" type="submit">
              Create User
            </Button>
          </Form>
        </Container>
    );
  }
}
