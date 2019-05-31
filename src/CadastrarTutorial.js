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
          <div>
          <AppBar
             title="Cadastrar Tutorial"
           />
           <TextField
             hintText="Nome do seu tutorial"
             floatingLabelText="Nome tutorial"
             onChange = {(event,newValue) => this.setState({nomeTutorial:newValue})}
             style = {style_text}
             />
           <br/>
           <TextField
             hintText="Escreva o seu tutorial"
             floatingLabelText="Descrição tutorial"
             onChange = {(event,newValue) => this.setState({descricaoTutorial:newValue})}
             style = {style_text}
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
  marginLeft: 750,
  marginRight: 750,
  display : 'flex',
  marginTop: 60,
};

const style_text = {
  marginLeft: 750,
  marginRight: 750,
  marginTop: 20,
}

export default CadastrarTutorial;
