import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import HomePage from '../Pages/HomePage';
import LoginPage from '../Pages/LoginPage';
import ListTripsPage from '../Pages/ListTripsPage';
import TripDetailsPage from '../Pages/TripDetailsPage';
import CreateTripPage from '../Pages/CreateTripPage';

const Router = () => {

  const aluno = 'rafael-cardoso-julian';
  const planets = ['Mercurio', 'Venus', 'Terra', 'Marte', 'Jupiter', 'Saturno', 'Urano', 'Netuno', 'Plutão'];

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <HomePage 
            aluno={aluno}
          />
        </Route>
        <Route exact path='/login'>
          <LoginPage
            aluno={aluno}
          />
        </Route>
        <Route exact path='/trips/list'>
          <ListTripsPage 
            aluno={aluno}
            planets={planets}
          />
        </Route>
        <Route exact path='/trips/details/:tripId'>
          <TripDetailsPage 
            aluno={aluno}
          />
        </Route>
        <Route exact path='/trips/create'>
          <CreateTripPage 
            aluno={aluno}
            planets={planets}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Router