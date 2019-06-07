import React from 'react';
import ReactDOM from 'react-dom';
import './Components/index.css';
import App from './Login';
import Tutoriais from './Tutoriais';
import * as serviceWorker from './serviceWorker';
import CadastrarTutorial from './CadastrarTutorial';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import CadastrarLink from './CadastrarLink';

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/tutorial" component={CadastrarTutorial} />
      <Route path="/tutorialshow" component={Tutoriais} />
      <Route path="/link" component={CadastrarLink} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
