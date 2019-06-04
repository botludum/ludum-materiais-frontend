import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';

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
    var apiBaseUrl = "https://ludum-materiais.herokuapp.com/api/tutoriais/cadastrar";
    console.log("values",this.state.nomeTutorial,this.state.descricaoTutorial,this.state.nomeUsuario);

    var body = {
    "title": this.state.nomeTutorial,
    "description":this.state.descricaoTutorial,
    "status": null,
    }

    axios.post(apiBaseUrl, body)
   .then(function (response) {
     console.log(response);
     if(response.data.code === 200){
      console.log("registration successfull");
     }
   })
   .catch(function (error) {
     console.log(error);
   });
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div style={style}>
          <AppBar
             style={{backgroundColor: '#bd6eff'}}
             title="Cadastro do Tutorial"
           />
           <RaisedButton label="Enviar" primary={true} style={style_button} onClick={(event) => this.handleClick(event)} />
            <TextField
              error={this.state.error}
              id="standard-name"
              label="Nome do tutorial"
              onChange = {(event) => this.setState({nomeTutorial:event.target.value})}
              margin="normal"
            />
            <br/>
            <TextField
              label="Escreva o seu tutorial"
              onChange = {(event) => this.setState({descricaoTutorial: event.target.value})}
              multiline={true}
              rowsMax = "20"
              rows = "15"
              variant="outlined"
              style={style_descricao}
            />
            <br/>
          </div>
         </MuiThemeProvider>
      </div>
    );
  }
}

const style = {
  textAlign : 'center',
};

const style_button = {
  textAlign : 'center',
  primary : "#bd6eff"
}
const style_descricao = {
  width : 800
}


export default CadastrarTutorial;
