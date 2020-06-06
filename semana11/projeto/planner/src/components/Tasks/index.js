import React, { useState, useEffect } from 'react';
import {
  TasksContainer,
  TasksPerDayWrapper,
  WeekDayTitle,
  TasksList,
  TaskItem,
  TaskIconButton,
  TaskDeleteIcon
} from './style';
import axios from 'axios';

const Tasks = (props) => {

  const [tasksList, setTasksList] = useState([]);

  const [dias, aluno, counter, setCounter] = props.props

  useEffect(() => {
    axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/generic/${aluno}`)
    .then(response => {
      setTasksList(response.data);
    })
    .catch(error => {
      console.log(error);
    })
  }, [aluno, counter, setTasksList]);

  const deleteTask = (id) => {
    axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/generic/${aluno}/${id}`)
    .then(response => {
      console.log(response);
      setCounter(!counter);
    })
    .catch(error => {
      console.log(error);
    })
  }

  return (
    <TasksContainer>
      {dias.map((dia, idx) => {
        return (
          <TasksPerDayWrapper key={idx} >
            <WeekDayTitle>{dia}</WeekDayTitle>
            <TasksList>
              {tasksList.map(task => {
                return (
                  task.day === dia ? (
                    <TaskItem 
                      key={task.id} 
                    >
                      {task.text}
                      <TaskIconButton 
                        size='small' 
                        onClick={() => deleteTask(task.id)}
                      >
                        <TaskDeleteIcon />
                      </TaskIconButton>
                    </TaskItem>
                  ) : (
                    null
                  )
                )
              })}
            </TasksList>
          </TasksPerDayWrapper>
        )
      })}
    </TasksContainer>
  );
}

export default Tasks;