import React, { useState } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HomePage from '../Pages/HomePage';
import LoginPage from '../Pages/LoginPage';
import ListTripsPage from '../Pages/ListTripsPage';
import TripDetailsPage from '../Pages/TripDetailsPage';
import CreateTripPage from '../Pages/CreateTripPage';

const Router = () => {

  const [logado, setLogado] = useState(false);
  const [token, setToken] = useState('');
  const aluno = 'rafael-cardoso-julian';
  const planets = ['Mercúrio', 'Vênus', 'Terra', 'Marte', 'Júpiter', 'Saturno', 'Urano', 'Netuno', 'Plutão'];

  return (
    <BrowserRouter>
      <Header 
        logado={logado} 
        setLogado={setLogado} 
        setToken={setToken}
      />
      <Switch>
        <Route exact path='/'>
          <HomePage 
            aluno={aluno}
          />
        </Route>
        <Route exact path='/login'>
          <LoginPage
            aluno={aluno}
            setLogado={setLogado} 
            setToken={setToken}
          />
        </Route>
        <Route exact path='/trips/list'>
          <ListTripsPage 
            aluno={aluno}
            token={token}
            planets={planets}
          />
        </Route>
        <Route exact path='/trips/details/:tripId'>
          <TripDetailsPage 
            aluno={aluno}
            token={token}
          />
        </Route>
        <Route exact path='/trips/create'>
          <CreateTripPage 
            aluno={aluno}
            token={token}
            planets={planets}
          />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}

export default Router