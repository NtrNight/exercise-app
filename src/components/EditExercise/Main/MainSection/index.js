import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

export default class Main extends React.Component {

  constructor(props){
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);


    this.state = {
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: []
    }
  }

  componentDidMount(){
    axios.get('http://localhost:5000/exercises/'+this.props.getID)
    .then(res => {
      console.log(res.data);
      this.setState({
        username: res.data.username,
        description: res.data.description,
        duration: res.data.duration,
        date: new Date(res.data.date)
      })
    })
    .catch(err => console.log(err));

    axios.get('http://localhost:5000/users/')
    .then(res => {
      if(res.data.length > 0){
        this.setState({
          users:res.data.map(user => user.username),
        })
      }
    })
  }

  onChangeUsername(e){
    this.setState({
      username: e.target.value
    });
  }

  onChangeDescription(e){
    this.setState({
      description: e.target.value
    });
  }

  onChangeDuration(e){
    this.setState({
      duration: e.target.value
    });
  }

  onChangeDate(date){
    this.setState({
      date: date
    });
  }

  onSubmit(e){
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    }

    console.log(exercise);

    axios.put('http://localhost:5000/exercises/update/'+this.props.getID, exercise)
    .then(res => console.log(res.data))
    .catch(err => console.log(err));

    window.location = '/';

  }

  render() {
    return(
        <Container fluid="md" className='mt-2' expand="lg">
          <div className='mt-2'>
            <h3>Edit Exercise Page</h3>
          </div>
          <Form onSubmit={this.onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicSelect">
              <Form.Label>Username</Form.Label>
              <Form.Select ref="userInput"
                required
                value={this.state.username}
                onChange={this.onChangeUsername}
                disabled
              >
                {
                  this.state.users.map((user) => {
                    return<option
                      key={user}
                      value={user}
                    >
                      {user}
                    </option>
                  })
                }
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" 
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Duration (in minutes)</Form.Label>
              <Form.Control type="number" 
                required
                value={this.state.duration}
                onChange={this.onChangeDuration}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Date</Form.Label>
              <div>
                <DatePicker 
                  selected={this.state.date}
                  onChange={this.onChangeDate}
                />
              </div>
            </Form.Group>
            <Button variant="primary" type="submit">
              Update Exercise Log
            </Button>
          </Form>
        </Container>
    );
  }
}
