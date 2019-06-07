import React, { Component } from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Modal from 'react-modal';

const SendButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText('#28bbff'),
    backgroundColor: '#28bbff',
    '&:hover': {
      backgroundColor: '#28bbff',

    },
  },
}))(Button);

const initialState = {
  nomeTutorial: '',
  descricaoTutorial: '',
  nomeError: '',
  descricaoError: '',
};

class CadastrarTutorial extends Component {
  constructor(props){
    super(props);
    this.state = initialState;

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  validate = () => {
    let nomeError = "";
    let descricaoError = "";

    if (!this.state.nomeTutorial) {
      nomeError = "Nome em branco";
    }
    if (!this.state.descricaoTutorial) {
      descricaoError = "Descrição em branco";
    }

    if (nomeError || descricaoError) {
      this.setState({nomeError, descricaoError});
      return false;
    }

    return true;
  };

  handleClick = () => {
    const isValid = this.validate();
    if (isValid) {
      var apiBaseUrl = "https://ludum-materiais.herokuapp.com/api/tutoriais/cadastrar";

      var body = {
      "title": this.state.nomeTutorial,
      "description":this.state.descricaoTutorial,
      "status": null,
      }

      axios.post(apiBaseUrl, body)
     .then((response) => {
       console.log(response.status);
       if(response.status === 200){
        console.log("registration successfull");
        this.setState(initialState);
       }
     })
     .catch((error) => {
       console.log(error);
     });
    }
  }

  handleChange = (event) => {
    const isText = event.target.type === "checkbox";

    this.setState({
      [event.target.name] : isText
      ? event.target.checked
      : event.target.value
    })
  };

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
              error={this.state.nomeError !== ''}
              name="nomeTutorial"
              label="Nome do tutorial"
              value = {this.state.nomeTutorial || ''}
              onChange = {this.handleChange}
              margin="normal"
            />
            <br/>
            <div style={error_style}>{this.state.nomeError}</div>
            <TextField
              error={this.state.descricaoError !== ''}
              name="descricaoTutorial"
              label="Escreva o seu tutorial"
              value = {this.state.descricaoTutorial || ''}
              onChange = {this.handleChange}
              multiline={true}
              rowsMax = "20"
              rows = "15"
              variant="outlined"
              style={style_descricao}
            />
            <div style={error_style}>{this.state.descricaoError}</div>
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
};

const error_style = {
  fontSize: 15,
  color: 'red',
};


export default CadastrarTutorial;
