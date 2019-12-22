import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Header';

import Generos from './components/Generos/Generos';
import NovoGenero from './components/Generos/NovoGenero';
import EditarGeneros from './components/Generos/EditarGenero';

import Series from './components/Series/Series'
import NovaSerie from './components/Series/NovaSerie';
import InfoSerie from './components/Series/InfoSerie';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/generos" component={Generos} />
        <Route exact path="/generos/novo" component={NovoGenero} />
        <Route exact path="/generos/:id" component={EditarGeneros} />

        <Route exact path="/series" component={Series} />
        <Route exact path="/series/novo" component={NovaSerie} />
        <Route exact path="/series/:id" component={InfoSerie} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
