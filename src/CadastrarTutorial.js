import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';

class CadastrarTutorial extends Component {
  constructor(props){
    super(props);
    this.state = {
      nomeTutorial:'',
      descricaoTutorial:'',
      nomeUsuario:'',
    }
  }

  handleClick(event) {
    console.log('Clique');
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Cadastrar Tutorial"
           />
           <TextField
             hintText="Nome do seu tutorial"
             floatingLabelText="Nome tutorial"
             onChange = {(event,newValue) => this.setState({nomeTutorial:newValue})}
             />
           <br/>
           <TextField
             hintText="Escreva o seu tutorial"
             floatingLabelText="Descrição tutorial"
             onChange = {(event,newValue) => this.setState({descricaoTutorial:newValue})}
             />
           <br/>
           <RaisedButton label="Enviar" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
          </div>
         </MuiThemeProvider>
      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default CadastrarTutorial;
