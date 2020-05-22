import styled from 'styled-components';
import {
  TextField,
  FormControl,
  Button
} from '@material-ui/core';

export const LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const LoginTextField = styled(TextField)``

export const LoginFormControl = styled(FormControl)``

export const LoginButton = styled(Button)`
  align-self: flex-end;
`