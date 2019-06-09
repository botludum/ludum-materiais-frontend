import React, { Component } from 'react';
import AuthService from '../services/AuthService';
import { withRouter } from 'react-router-dom';

class SignInForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.Auth = new AuthService();
    }

    componentWillMount(){
      if(this.Auth.loggedIn())
        this.props.history.push('/tutorial/listar');
    }

    handleSubmit(e) {
      e.preventDefault();
      console.log(this.state.username);
      this.Auth.login(this.state.username,this.state.password)
          .then(res =>{
            this.props.history.push('/tutorial/listar');
          })
          .catch(err =>{
              alert(err);
          })
    }

    render() {
        return (
        <div className="FormCenter">
            <form className="FormFields" onSubmit={this.handleSubmit}>
            <div className="FormField">
                <label className="FormField__Label" htmlFor="username">Nome</label>
                <input type="name" id="username" className="FormField__Input" placeholder="Digite seu nome" name="username" value={this.state.username} onChange={e => this.setState({ username: e.target.value })} />
              </div>

              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Senha</label>
                <input type="password" id="password" className="FormField__Input" placeholder="Digite sua senha" name="password" value={this.state.password} onChange={e => this.setState({ password: e.target.value })} />
              </div>

              <div className="FormField">
                  <button className="FormField__Button mr-20">Entrar</button>
              </div>
            </form>
          </div>
        );
    }
}

export default withRouter(SignInForm);