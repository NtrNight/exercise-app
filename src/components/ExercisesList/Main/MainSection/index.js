/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import { Container, Table } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
      <Link to={"/Edit/"+props.exercise._id}>edit</Link> | <a href="#/" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
    </td>
  </tr>
)

export default class Main extends Component {
  constructor(props){
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this)

    this.state = {
      exercises : []
    }
  }

  componentDidMount(){
    axios.get('http://localhost:5000/exercises/')
    .then(res => {
      this.setState({exercises: res.data})
    })
    .catch(err => {
      console.log(err);
    })
  }

  deleteExercise(id){
    axios.delete('http://localhost:5000/exercises/'+id)
    .then(res => console.log(res.data));
    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    })
  }

  exerciseList() {
    return this.state.exercises.map(currentexercise => {
      return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
    })
  }

  render() {
    return(
        <Container fluid="md" className="mt-2" expand="lg">
          <div className='mt-2'>
            <h3>Logged Exercises</h3>
          </div>
          <Table hover className='mt-3'>
            <thead>
              <tr>
                <th>Username</th>
                <th>Description</th>
                <th>Duration</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            { this.exerciseList() }
              {/* {this.state.exercises && this.state.exercises.map((item) =>(
                <tr key={item._id}>
                  <td>{item.username}</td>
                  <td>{item.description}</td>
                  <td>{item.duration}</td>
                  <td>{item.date.substring(0,10)}</td>
                  <td>
                  <Link to={"/Edit/"+item._id}>Edit</Link> | <a href='#' onClick={() => {this.deleteExercise(item._id)}}>Delete</a>
                  </td>
                </tr>
              ))} */}
            </tbody>
          </Table>
        </Container>
    );
  }
}
