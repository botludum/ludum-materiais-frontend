import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

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
           <TextField
             hintText="Nome do seu tutorial"
             floatingLabelText="Nome do tutorial"
             onChange = {(event,newValue) => this.setState({nomeTutorial:newValue})}
             />
           <br/>
           <TextField
             hintText="Escreva o seu tutorial"
             floatingLabelText="Descrição"
             onChange = {(event,newValue) => this.setState({descricaoTutorial:newValue})}
             rowsMax = "25"
             rows = "25"
             multiLine = {true}
             style = {style_descricao}
             />
           <br/>
           <RaisedButton label="Enviar" primary={true} style={style_button} onClick={(event) => this.handleClick(event)} />
          </div>
         </MuiThemeProvider>
      </div>
    );
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
}));


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
