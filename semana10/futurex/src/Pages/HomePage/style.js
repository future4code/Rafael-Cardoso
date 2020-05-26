import styled from 'styled-components';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from '@material-ui/core';

export const PageContainer = styled.div`
`
export const HomePageContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`
export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
`
export const TripTextField = styled(TextField)``

export const TripFormControl = styled(FormControl)`
  width: 300px;
`
export const TripInputLabel = styled(InputLabel)``

export const TripSelect = styled(Select)``

export const TripMenuItem = styled(MenuItem)``

export const SubmitButton = styled(Button)`
  align-self: flex-end;
`