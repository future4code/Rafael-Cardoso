import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import ListTripsPage from './Pages/ListTripsPage';
import TripDetailsPage from './Pages/TripDetailsPage';
import CreateTripPage from './Pages/CreateTripPage';
import styled from 'styled-components';

const AppContainer = styled.div``

function App() {
  return (
    <AppContainer>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route exact path='/login'>
            <LoginPage />
          </Route>
          <Route exact path='/trips/list'>
            <ListTripsPage />
          </Route>
          <Route exact path='/trips/details/:tripId'>
            <TripDetailsPage />
          </Route>
          <Route exact path='/trips/create'>
            <CreateTripPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </AppContainer>
  );
}

export default App;
