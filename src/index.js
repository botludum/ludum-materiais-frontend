import React from 'react';
import ReactDOM from 'react-dom';
import './Components/index.css';
import Login from './Login';
import Tutoriais from './Tutoriais';
import * as serviceWorker from './serviceWorker';
import CadastrarTutorial from './CadastrarTutorial';
import GerenciaLinks from './GerenciaLinks';
import { Route, BrowserRouter as Router } from 'react-router-dom';

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={Login} />
      <Route path="/link/gerenciar" component={GerenciaLinks} />
      <Route path="/tutorial/cadastrar" component={CadastrarTutorial} />
      <Route path="/tutorial/listar" component={Tutoriais} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

