import React, { useState, useEffect } from 'react'; 
import CardTrip from '../../components/CardTrip';
import Filter from '../../components/Filter';
import {
  ListTripsPageContainer,
  ListTripsContainer
} from './style';
import axios from 'axios';

const ListTripsPage = (props) => {

  const [tripsList, setTripsList] = useState([]);
  const [nameInput, setNameInput] = useState('');
  const [planetInput, setPlanetInput] = useState('');
  const [initialDateInput, setInitialDateInput] = useState(null);
  const [finalDateInput, setFinalDateInput] = useState(null);
  const [minDurationInput, setMinDurationInput] = useState('');
  const [maxDurationInput, setMaxDurationInput] = useState('');
  const [sortInput, setSortInput] = useState('');
  const [filteredList, setFilteredList] = useState([]);
  const [filtered, setFiltered] = useState(false);

  const arrayProps = [nameInput, planetInput, initialDateInput, finalDateInput, minDurationInput, maxDurationInput, sortInput]
  const arraySetProps = [setNameInput, setPlanetInput, setInitialDateInput, setFinalDateInput, setMinDurationInput, setMaxDurationInput];

  useEffect(() => {
    axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labeX/${props.aluno}/trips`)
    .then(response => {
      setTripsList(response.data.trips);
    })
    .catch(error => {
      console.log(error);
    })
  }, [props.aluno, setTripsList]);

  useEffect(() => {
    setFiltered(true);
    setFilteredList(filterList());
  }, [tripsList, nameInput, planetInput, initialDateInput, finalDateInput, minDurationInput, maxDurationInput]);

  const filterList = () => {
    let filteredList = tripsList;
    if (nameInput !== '') {
      filteredList = filteredList.filter((trip) => {
        return (
          trip.name.toLowerCase().includes(nameInput.toLowerCase()) || 
          trip.description.toLowerCase().includes(nameInput.toLowerCase())
        );
      });
    }
    if (planetInput !== "") {
      filteredList = filteredList.filter((trip) => {
        return trip.planet === planetInput;
      });
    }
    if (minDurationInput !== "") {
      filteredList = filteredList.filter((trip) => {
        return Number(trip.durationInDays) >= Number(minDurationInput);
      });
    }
    if (maxDurationInput !== "") {
      filteredList = filteredList.filter((trip) => {
        return Number(trip.durationInDays) <= Number(maxDurationInput);
      });
    }
    // if (this.state.inputNome !== "") {
    //   listaFiltrada = listaFiltrada.filter((produto) => {
    //     return (
    //       produto.name
    //         .toLowerCase()
    //         .includes(this.state.inputNome.toLowerCase()) ||
    //       produto.description
    //         .toLowerCase()
    //         .includes(this.state.inputNome.toLowerCase())
    //     );
    //   });
    // }
    return filteredList;
  }

  const cleanFilters = () => {
    setNameInput('');
    setPlanetInput('');
    setInitialDateInput(null);
    setFinalDateInput(null);
    setMinDurationInput('');
    setMaxDurationInput('');
  }

  const sortList = (event) => {
    setSortInput(event.target.value);
    let newList = tripsList;
    if (sortInput === 'Nome') {
      newList = [].concat(tripsList).sort((a, b) => {
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
      });
    } else if (sortInput === 'Planeta') {
      newList = [].concat(tripsList).sort((a, b) => {
        return a.planet < b.planet ? -1 : a.planet > b.planet ? 1 : 0;
      })
    } else if (sortInput === 'Menor duração') {
      newList = [].concat(tripsList).sort((a, b) => {
        return a.durationInDays < b.durationInDays ? -1 : a.durationInDays > b.durationInDays ? 1 : 0;
      });
    } else if (sortInput === 'Maior duração') {
      newList = [].concat(tripsList).sort((a, b) => {
        return a.durationInDays > b.durationInDays ? -1 : a.durationInDays < b.durationInDays ? 1 : 0;
      });
    }
    setTripsList(newList)
  }

  return (
    <ListTripsPageContainer>
      <Filter 
        planets={props.planets}
        inputs={arrayProps}
        setInputs={arraySetProps}
        sortList={sortList}
        cleanFilters={cleanFilters}
      />
      <ListTripsContainer>
        {(filtered ? filteredList : tripsList).map(trip => {
          return <CardTrip key={trip.id} trip={trip} />
        })}
      </ListTripsContainer>
    </ListTripsPageContainer>
  )
}

export default ListTripsPage