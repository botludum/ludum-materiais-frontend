import React, { Component } from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Modal from 'react-modal';
import RaisedButton from 'material-ui/RaisedButton';

const SendButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText('#28bbff'),
    backgroundColor: '#28bbff',
    '&:hover': {
      backgroundColor: '#28bbff',

    },
  },
}))(Button);

class CadastrarTutorial extends Component {
  constructor(props){
    super(props);
    this.state = {
      nomeTutorial:'',
      descricaoTutorial:'',
      nomeUsuario:'',
      modalIsOpen: false,
      error: false,
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  handleClick(event) {
    if (this.state.nomeTutorial === "") {
      this.setState({error: true});
    } else {
      var apiBaseUrl = "https://ludum-materiais.herokuapp.com/api/tutoriais/cadastrar";

      var body = {
      "title": this.state.nomeTutorial,
      "description":this.state.descricaoTutorial,
      "status": null,
      }

      axios.post(apiBaseUrl, body)
     .then(function (response) {
       console.log(response.status);
       if(response.status === 200){
        console.log("registration successfull");
       }
     })
     .catch(function (error) {
       console.log(error);
     });
    }

  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div style={style}>
            <AppBar
              position="static"
              style={style_bar}
            >
            <Typography variant="h5" color="inherit">
              Cadastro do Tutorial
            </Typography>
            </AppBar>

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
            <SendButton variant="contained"
              disableRipple
              color="primary"
              onClick={(event) => this.handleClick(event)}
              >
              Enviar
            </SendButton>
          </div>
        </MuiThemeProvider>
        <div>
      <Modal
      isOpen={this.state.modalIsOpen}
      onRequestClose={this.closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      >
      Hello
      </Modal>
      </div>
      </div>
    );
  }
}

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width: window.innerWidth * 0.2,
    height: window.innerHeight * 0.2,
    backgroundColor: 'white',
  },
  overlay: {
    backgroundColor: 'white',
  }
};

const style_bar = {
  backgroundColor: '#63347f',
  height: window.innerWidth * 0.03,
};

const style = {
  textAlign : 'center',
};

const style_descricao = {
  width : window.innerWidth * 0.5,
  marginTop: 20,
  marginBottom: 20,
}


export default CadastrarTutorial;