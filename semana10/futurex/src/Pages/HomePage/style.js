import styled from 'styled-components';
import {
  TextField,
  FormControl,
  MenuItem,
  Button
} from '@material-ui/core';

export const PageContainer = styled.div`
`
export const HomePageContainer = styled.div`
  padding: 1em 0;
  min-height: 420px;
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`
export const FormContainer = styled.form`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
`
export const TripTextField = styled(TextField)`
  :valid {
    color: green;
  }
  :invalid {
    color: red;
  }
`
export const TripFormControl = styled(FormControl)`
  width: 100%;
  &&{
    margin-bottom: .5em;
  }
`
export const TripMenuItem = styled(MenuItem)`
`
export const SubmitButton = styled(Button)`
  align-self: flex-end;
`