import React, { Component } from 'react';
import { AppBar, Main } from '../../components/ExercisesList';

export default class Exercises extends Component {
  render() {
    return(
        <div>
            <AppBar />
            <Main />
        </div>
    );
  }
}
