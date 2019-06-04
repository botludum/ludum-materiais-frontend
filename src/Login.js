import React, { Component } from 'react';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';
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
            <br/>
            <div className="FormTitle">
              <NavLink to="/sign-in" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Entrar</NavLink>
            </div>
            <Route path="/sign-in" component={SignInForm}>
            </Route>
          </div>

        </div>
      </Router>
    );
  }
}

export default App;
