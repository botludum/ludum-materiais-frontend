import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Button from '@material-ui/core/Button';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AuthService from '../services/AuthService';
import { withRouter } from 'react-router-dom';

const Auth = new AuthService();
class  NavBar extends Component {

    handleLogout(){
        Auth.logout()
        this.props.history.replace('/');
     }

    handleGerenciarTutorial(){
        this.props.history.replace('/tutorial/gerenciar');
    }

    handleCadastrarTutorial(){
        this.props.history.replace('/tutorial/cadastrar');
    }

    handleCadastrarLink(){
        this.props.history.replace('/link/cadastrar');
    }

    handleGerenciarLink(){
        this.props.history.replace('/link/gerenciar');
    }
    render() {
      return (
        <MuiThemeProvider>
        <div style={{textAlign : 'center'}}>
        <AppBar style={{backgroundColor: '#63347f'}} showMenuIconButton={false} >
            <Button color="inherit" style={{color: "#fff"}} onClick={this.handleCadastrarLink.bind(this)}>Cadastrar Link</Button>
            <Button color="inherit" style={{color: "#fff"}} onClick={this.handleGerenciarLink.bind(this)}>Gerenciar Links</Button>
            <Button color="inherit" style={{color: "#fff"}} onClick={this.handleCadastrarTutorial.bind(this)}>Cadastrar Tutoriais</Button>
            <Button color="inherit" style={{color: "#fff"}} onClick={this.handleGerenciarTutorial.bind(this)}>Gerenciar Tutoriais</Button>
            <Button color="inherit" style={{color: "#fff"}} onClick={this.handleLogout.bind(this)}>Sair</Button>
        </AppBar>
        </div>
        </MuiThemeProvider>
      );
    }
  };
  export default withRouter(NavBar); 