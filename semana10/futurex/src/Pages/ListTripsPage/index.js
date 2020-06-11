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
import { useForm } from '../../hooks/useForm';
import axios from 'axios';

const ListTripsPage = (props) => {

  usePrivatePage();

  const [tripsList, setTripsList] = useState([]);
  const [initialDate, setInitialDate] = useState(null);
  const [finalDate, setFinalDate] = useState(null);
  const [sort, setSort] = useState('');
  const [filteredList, setFilteredList] = useState([]);
  const [filtered, setFiltered] = useState(false);

  const { form, onChange, resetForm } = useForm({
    name: '',
    planet: '',
    minDuration: '',
    maxDuration: '',
    sort: ''
  })

  const { name, planet, minDuration, maxDuration } = form;
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    onChange(name, value);
  }

  const arrayInputs = [form, initialDate, finalDate, sort];
  
  const arraySetInputs = [handleInputChange, setInitialDate, setFinalDate];

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
  }, [tripsList, name, planet, initialDate, finalDate, minDuration, maxDuration]);

  const formatDate = (date) => {
    const arrayDate = date.split('/');
    return `${months[Number(arrayDate[1]) - 1]} ${arrayDate[0]}, 20${arrayDate[2]}`
  }

  const filterList = () => {
    let filteredList = tripsList;
    if (name) {
      filteredList = filteredList.filter((trip) => {
        return (
          trip.name.toLowerCase().includes(name.toLowerCase()) || 
          trip.description.toLowerCase().includes(name.toLowerCase())
        );
      });
    }
    if (planet) {
      filteredList = filteredList.filter(trip => {
        return trip.planet === planet;
      });
    }
    if (minDuration) {
      filteredList = filteredList.filter(trip => {
        return Number(trip.durationInDays) >= Number(minDuration);
      });
    }
    if (maxDuration) {
      filteredList = filteredList.filter(trip => {
        return Number(trip.durationInDays) <= Number(maxDuration);
      });
    }
    if (initialDate) {
      filteredList = filteredList.filter(trip => {
        return Date.parse(formatDate(trip.date)) >= initialDate;
      });
    }
    if (finalDate) {
      filteredList = filteredList.filter(trip => {
        return Date.parse(formatDate(trip.date)) <= finalDate;
      });
    }
    return filteredList;
  }

  const sortList = (event) => {
    setSort(event.target.value)
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
          inputs={arrayInputs}
          setInputs={arraySetInputs}
          sortList={sortList}
          resetForm={resetForm}
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