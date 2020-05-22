import styled from 'styled-components';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from '@material-ui/core';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';

export const CreateTripPageContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`
export const CreateFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
`
export const CreateTextField = styled(TextField)`
`
export const CreateFormControl = styled(FormControl)`
  width: 300px;
`
export const CreateInputLabel = styled(InputLabel)`
`
export const CreateSelect = styled(Select)`
`
export const CreateDatePicker = styled(KeyboardDatePicker)`
  width: 300px;
`
export const CreateProvider = styled(MuiPickersUtilsProvider)`
`
export const CreateMenuItem = styled(MenuItem)`
`
export const CreateSubmitButton = styled(Button)`
  align-self: flex-end;
`