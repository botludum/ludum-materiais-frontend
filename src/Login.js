import React, { Component } from 'react';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';
import SignUpForm from './pages/SignUpForm';
import SignInForm from './pages/SignInForm';
import Ludum from './Images/lg.png';

import './Components/Login.css';

class App extends Component {
  render() {
    return (
      <Router basename="/login/">
        <div className="App">
          <div className="App__Aside">
            <img className="Logo" src = { Ludum } alt = "LudumLogo" />
          </div>
          <div className="App__Form">
            <div className="PageSwitcher">
                <NavLink to="/sign-in" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Entrar</NavLink>
                <NavLink exact to="/" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Cadastrar</NavLink>
              </div>
              <div className="FormTitle">
                  <NavLink to="/sign-in" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Entrar</NavLink> ou <NavLink exact to="/" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Cadastrar</NavLink>
              </div>
              <Route exact path="/" component={SignUpForm}>
              </Route>
              <Route path="/sign-in" component={SignInForm}>
              </Route>
          </div>

        </div>
      </Router>
    );
  }
}

export default App;
