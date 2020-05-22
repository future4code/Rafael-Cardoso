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

  const [name, planet, initialDate, finalDate, minDuration, maxDuration, sort] = props.inputs;
  const [setName, setPlanet, setInitialDate, setFinalDate, setMinDuration, setMaxDuration] = props.setInputs;
  
  return (
    <FilterBarContainer>
      <FilterContainer>
        <FilterFormControl>
          <FilterTextField 
            value={name}
            onChange={event => setName(event.target.value)}
            label={'Nome ou descrição'}
          />
        </FilterFormControl>
        <FilterFormControl>
          <FilterInputLabel>Planeta</FilterInputLabel>
          <FilterSelect
            value={planet}
            onChange={event => setPlanet(event.target.value)}
          >
            <FilterMenuItem key={0} value={''} > </FilterMenuItem>
            {props.planets.map((planet, idx) => {
                return <FilterMenuItem key={idx} value={planet} >{planet}</FilterMenuItem>
              })}
          </FilterSelect>
        </FilterFormControl>
        <FilterProvider utils={DateFnsUtils}>
          <FilterDatePicker 
            value={initialDate}
            onChange={setInitialDate}
            label={'Data de início'}
            format='dd/MM/yy'
            emptyLabel='dd/mm/aa'
          />
        </FilterProvider>
        <FilterProvider utils={DateFnsUtils}>
          <FilterDatePicker 
            value={finalDate}
            onChange={setFinalDate}
            label={'Data de término'}
            format='dd/MM/yy'
            emptyLabel='dd/mm/aa'
          />
        </FilterProvider>
        <FilterFormControl>
          <FilterDurationTextField 
            value={minDuration}
            onChange={event => setMinDuration(event.target.value)}
            label={'Duração mínima'}
            InputLabelProps={{ shrink: true }}
          />
        </FilterFormControl>
        <FilterFormControl>
          <FilterDurationTextField 
            value={maxDuration}
            onChange={event => setMaxDuration(event.target.value)}
            label={'Duração máxima'}
            InputLabelProps={{ shrink: true }}
          />
        </FilterFormControl>
        <FilterButton onClick={props.cleanFilters} >Apagar Filtros</FilterButton>
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