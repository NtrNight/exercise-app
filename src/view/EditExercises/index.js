import React from 'react';
import { useParams } from 'react-router-dom';
import { AppBar, Main } from '../../components/EditExercise';

export default function EditExercises() {
  const {id} = useParams();
  console.log(id);
  return(
    <div>
        <AppBar />
        <Main getID={id}/>
    </div>
  );
}
