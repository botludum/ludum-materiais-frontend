import React, { Component } from 'react';
import SignInForm from './pages/SignInForm';
import Ludum from './Images/lg.png';

import './Components/Login.css';

class Login extends Component {
  render() {
    return (
        <div className="App">
          <div className="App__Aside">
            <img className="Logo" src = { Ludum } alt = "LudumLogo" />
          </div>
          <div className="App__Form">
            <br/>
            <SignInForm></SignInForm>
          </div>
        </div>
    );
  }
}

export default Login;
