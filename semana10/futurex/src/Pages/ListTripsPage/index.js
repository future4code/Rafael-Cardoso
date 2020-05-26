import React, { useState, useEffect } from 'react'; 
import CardTrip from '../../components/CardTrip';
import Filter from '../../components/Filter';
import {
  PageContainer,
  ListTripsPageContainer,
  ListTripsContainer
} from './style';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { usePrivatePage } from '../../hooks/usePrivatePage';
import axios from 'axios';

const ListTripsPage = (props) => {

  usePrivatePage();

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

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

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

  const formatDate = (date) => {
    const arrayDate = date.split('/');
    return `${months[Number(arrayDate[1]) - 1]} ${arrayDate[0]}, 20${arrayDate[2]}`
  }

  const filterList = () => {
    let filteredList = tripsList;
    if (nameInput) {
      filteredList = filteredList.filter((trip) => {
        return (
          trip.name.toLowerCase().includes(nameInput.toLowerCase()) || 
          trip.description.toLowerCase().includes(nameInput.toLowerCase())
        );
      });
    }
    if (planetInput) {
      filteredList = filteredList.filter(trip => {
        return trip.planet === planetInput;
      });
    }
    if (minDurationInput) {
      filteredList = filteredList.filter(trip => {
        return Number(trip.durationInDays) >= Number(minDurationInput);
      });
    }
    if (maxDurationInput) {
      filteredList = filteredList.filter(trip => {
        return Number(trip.durationInDays) <= Number(maxDurationInput);
      });
    }
    if (initialDateInput) {
      filteredList = filteredList.filter(trip => {
        return Date.parse(formatDate(trip.date)) >= initialDateInput;
      });
    }
    if (finalDateInput) {
      filteredList = filteredList.filter(trip => {
        return Date.parse(formatDate(trip.date)) <= finalDateInput;
      });
    }
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
    if (event.target.value === 'Nome') {
      newList = [].concat(tripsList).sort((a, b) => {
        return a.name < b.name ? -1 : (a.name > b.name ? 1 : 0);
      });
    } else if (event.target.value === 'Planeta') {
      newList = [].concat(tripsList).sort((a, b) => {
        return a.planet < b.planet ? -1 : (a.planet > b.planet ? 1 : 0);
      })
    } else if (event.target.value === 'Menor duração') {
      newList = [].concat(tripsList).sort((a, b) => {
        return a.durationInDays < b.durationInDays ? -1 : (a.durationInDays > b.durationInDays ? 1 : 0);
      });
    } else if (event.target.value === 'Maior duração') {
      newList = [].concat(tripsList).sort((a, b) => {
        return a.durationInDays > b.durationInDays ? -1 : (a.durationInDays < b.durationInDays ? 1 : 0);
      });
    }
    setTripsList(newList)
  }

  return (
    <PageContainer>
      <Header />
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
      <Footer />
    </PageContainer>
  )
}

export default ListTripsPage