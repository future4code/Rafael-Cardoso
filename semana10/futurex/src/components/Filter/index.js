import React from 'react'; 
import {
  FilterBarContainer,
  FilterContainer,
  SortContainer,
  FilterTextField,
  FilterDurationTextField,
  FilterSelect,
  FilterFormControl,
  FilterInputLabel,
  FilterMenuItem,
  FilterDatePicker,
  FilterProvider,
  FilterButton
} from './style';
import DateFnsUtils from '@date-io/date-fns';

const Filter = (props) => {

  const [form, initialDate, finalDate, sort] = props.inputs
  const { name, planet, minDuration, maxDuration } = form;
  const [handleInputChange, setInitialDate, setFinalDate] = props.setInputs;
  
  return (
    <FilterBarContainer>
      <FilterContainer>
        <FilterFormControl>
          <FilterTextField 
            name='name'
            value={name}
            onChange={handleInputChange}
            label={'Nome ou descrição'}
          />
        </FilterFormControl>
        <FilterFormControl>
          <FilterInputLabel>Planeta</FilterInputLabel>
          <FilterSelect
            name='planet'
            value={planet}
            onChange={handleInputChange}
          >
            <FilterMenuItem key={0} value={''} > </FilterMenuItem>
            {props.planets.map((planet, idx) => {
                return <FilterMenuItem key={idx} value={planet} >{planet}</FilterMenuItem>
              })}
          </FilterSelect>
        </FilterFormControl>
        <FilterProvider utils={DateFnsUtils}>
          <FilterDatePicker 
            name='initialDate'
            value={initialDate}
            onChange={setInitialDate}
            label={'Data de início'}
            format='dd/MM/yy'
            emptyLabel='dd/mm/aa'
          />
        </FilterProvider>
        <FilterProvider utils={DateFnsUtils}>
          <FilterDatePicker 
            name='finalDate'
            value={finalDate}
            onChange={setFinalDate}
            label={'Data de término'}
            format='dd/MM/yy'
            emptyLabel='dd/mm/aa'
          />
        </FilterProvider>
        <FilterFormControl>
          <FilterDurationTextField 
            name='minDuration'
            value={minDuration}
            onChange={handleInputChange}
            label={'Duração mínima'}
            InputLabelProps={{ shrink: true }}
          />
        </FilterFormControl>
        <FilterFormControl>
          <FilterDurationTextField 
            name='maxDuration'
            value={maxDuration}
            onChange={handleInputChange}
            label={'Duração máxima'}
            InputLabelProps={{ shrink: true }}
          />
        </FilterFormControl>
        <FilterButton onClick={props.resetForm} >Apagar Filtros</FilterButton>
      </FilterContainer>
      <SortContainer>
      <FilterFormControl>
          <FilterInputLabel>Ordenar:</FilterInputLabel>
          <FilterSelect
            value={sort}
            onChange={props.sortList}
          >
            <FilterMenuItem key={0} value={''} > </FilterMenuItem>
            <FilterMenuItem key={1} value={'Nome'} >Nome</FilterMenuItem>
            <FilterMenuItem key={2} value={'Planeta'} >Planeta</FilterMenuItem>
            <FilterMenuItem key={3} value={'Menor duração'} >Menor duração</FilterMenuItem>
            <FilterMenuItem key={4} value={'Maior duração'} >Maior duração</FilterMenuItem>
          </FilterSelect>
        </FilterFormControl>
      </SortContainer>
    </FilterBarContainer>
  )
}

export default Filter