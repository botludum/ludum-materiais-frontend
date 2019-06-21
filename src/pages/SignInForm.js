import React, { Component } from 'react';
import AuthService from '../services/AuthService';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

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

  componentWillMount() {
    if (this.Auth.loggedIn())
      this.props.history.push('/link/gerenciar');
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.username);
    this.Auth.login(this.state.username, this.state.password)
      .then(res => {
        this.props.history.push('/link/gerenciar');
      })
      .catch(err => {
        alert(err);
      })
  }

  handleCadastrarTutorial(){
    this.props.history.replace('/tutorial/cadastrar');
  }

  handleCadastrarLink(){
    this.props.history.replace('/link/cadastrar');
  }

  handleTutoriais(){
    this.props.history.replace('/tutoriais');
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
        <div style={{ textAlign: "center" }}>
          <br/><br/><br/>
          <Typography variant="h6" color="inherit" style={{ textAlign: "center" }}>
            Deseja cadastrar um material? Selecione uma opção abaixo:
          </Typography>
          <br/><br/>
          <button className="FormField__Button mr-20" onClick={this.handleCadastrarTutorial.bind(this)}>Cadastrar Tutorial</button>
          <button className="FormField__Button mr-20" onClick={this.handleCadastrarLink.bind(this)}>Cadastrar Link</button>
          <br/><br/>
          <button className="FormField__Button mr-20" onClick={this.handleTutoriais.bind(this)}>Ver Tutoriais</button>
        </div>
      </div>
    );
  }
}

export default withRouter(SignInForm);