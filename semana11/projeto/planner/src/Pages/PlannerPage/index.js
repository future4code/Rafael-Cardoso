import React, { useState } from 'react';
import Form from '../../components/Form';
import Tasks from '../../components/Tasks';
import {
  PlannerPageContainer
} from './style'

const PlannerPage = () => {

  const [counter, setCounter] = useState(false);

  const dias = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
  const aluno = 'planner-julian-rafael-cardoso';

  const props = [dias, aluno, counter, setCounter]

  return (
    <PlannerPageContainer>
      <Form props={props} />
      <Tasks props={props} />
    </PlannerPageContainer>
  )
}

export default PlannerPage;