import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import ExercisesList from './view/Exercises';
import CreateExercise from './view/CreateExercise';
import CreateUser from './view/User';
import EditExercise from './view/EditExercises';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ExercisesList />} />
        <Route path='/Edit/:id' element = {<EditExercise />} />
        <Route path='/Create' element = {<CreateExercise />} />
        <Route path='/User' element= { <CreateUser /> } />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
