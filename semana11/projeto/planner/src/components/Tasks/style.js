import styled from 'styled-components';
import {
  Paper,
  IconButton
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

export const TasksContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 1em;
`
export const TasksPerDayWrapper = styled(Paper)`
  min-height: 200px;
  padding: 1em;
`
export const WeekDayTitle = styled.h3`
  margin-bottom: .5em;
`
export const TasksList = styled.ul`
`
export const TaskItem = styled.li`
  padding-left: .5em;
  list-style-type: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const TaskIconButton = styled(IconButton)`
`
export const TaskDeleteIcon = styled(DeleteIcon)`
`