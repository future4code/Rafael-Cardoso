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

export const FilterBarContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em 0;
`
export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
`
export const SortContainer = styled.div`
`
export const FilterTextField = styled(TextField)`
`
export const FilterDurationTextField = styled(TextField)`
  width: 70px;
`
export const FilterFormControl = styled(FormControl)`
`
export const FilterInputLabel = styled(InputLabel)`
`
export const FilterSelect = styled(Select)`
  width: 120px;
`
export const FilterMenuItem = styled(MenuItem)`
`
export const FilterButton = styled(Button)`
`
export const FilterDatePicker = styled(KeyboardDatePicker)`
  width: 140px;
`
export const FilterProvider = styled(MuiPickersUtilsProvider)`
`