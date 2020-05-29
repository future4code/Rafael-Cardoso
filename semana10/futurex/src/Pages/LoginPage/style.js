import styled from 'styled-components';
import {
  TextField,
  FormControl,
  Button
} from '@material-ui/core';

export const PageContainer = styled.div`
`
export const LoginPageContainer = styled.div`
  padding: 1em 0;
  min-height: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const LoginTextField = styled(TextField)`
`
export const LoginFormControl = styled(FormControl)`
  && {
    margin-bottom: .5em;
  }
`
export const LoginButton = styled(Button)`
  align-self: flex-end;
`