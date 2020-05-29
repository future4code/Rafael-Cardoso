import styled from 'styled-components';
import {
  TextField,
  FormControl,
  MenuItem,
  Button
} from '@material-ui/core';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';

export const PageContainer = styled.div`
`
export const CreateTripPageContainer = styled.div`
  padding: 1em 0;
  min-height: 420px;
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`
export const CreateFormContainer = styled.form`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
`
export const CreateFormControl = styled(FormControl)`
  width: 100%;
  &&{
    margin-bottom: .5em;
  }
`
export const CreateTextField = styled(TextField)`
`
export const CreateDatePicker = styled(KeyboardDatePicker)`
  width: 100%;
`
export const CreateProvider = styled(MuiPickersUtilsProvider)`
`
export const CreateMenuItem = styled(MenuItem)`
`
export const CreateSubmitButton = styled(Button)`
  align-self: flex-end;
`