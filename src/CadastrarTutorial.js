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
             title="Cadastro do Tutorial"
           />
           <TextField
             hintText="Nome do seu tutorial"
             floatingLabelText="Nome do tutorial"
             onChange = {(event,newValue) => this.setState({nomeTutorial:newValue})}
             />
           <br/>
           <TextField
             hintText="Escreva o seu tutorial"
             floatingLabelText="Descrição do tutorial"
             onChange = {(event,newValue) => this.setState({descricaoTutorial:newValue})}
             rowsMax = "20"
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
  textAlign : 'center'
};



export default CadastrarTutorial;
