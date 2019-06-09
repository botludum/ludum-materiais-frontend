import React, { Component } from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Modal from 'react-modal';
import { withRouter } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import './Components/Modal.css'

const SendButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText('#28bbff'),
    backgroundColor: '#28bbff',
    '&:hover': {
      backgroundColor: '#28bbff',
    },
  },
}))(Button);

const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? 'modal display-block' : 'modal display-none';

     return (
      <div className={showHideClassName}>
        <section className='modal-main'>
          <IconButton
            onClick={handleClose}
            >
            <CloseIcon />
        </IconButton>
            {children}
        </section>
      </div>
    );
  };

class CadastrarTutorial extends Component {
  constructor(props){
    super(props);
    this.state = {
      nomeTutorial: '',
      descricaoTutorial: '',
      nomeError: '',
      descricaoError: '',
      responseMessage: '',
      show: false,
      loading: false,
    };
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
      var apiBaseUrl = "https://produ-o.ludum-materiais.ludumbot.club/api/tutoriais/cadastrar";

      var body = {
      "title": this.state.nomeTutorial,
      "description":this.state.descricaoTutorial,
      "status": null,
      };

      this.setState({loading: true});
      axios.post(apiBaseUrl, body)
     .then((response) => {
       console.log(response.status);
       if(response.status === 200){
        console.log("registration successfull");
        this.setState({
          nomeTutorial: '',
          descricaoTutorial: '',
          nomeError: '',
          descricaoError: '',
          responseMessage: 'Tutorial enviado com sucesso',
          loading: false,
        });
      } else {
        this.setState({responseMessage: 'Algo deu errado, tente novamente mais tarde', loading: false});
      }
      this.showModal();
     })
     .catch((error) => {
       console.log(error);
       this.setState({responseMessage: 'Algo deu errado, tente novamente mais tarde'});
       this.showModal();
     });
    }
  }

  showModal = () => {
   this.setState({ show: true });
  }

  hideModal = () => {
   this.setState({ show: false });
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
            <Typography variant="h5" color="inherit" style={{marginTop: "10px"}}>
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
            {this.state.loading ?
              (
                <CircularProgress />
              ) : (
                <SendButton variant="contained"
                  disableRipple
                  color="primary"
                  onClick={(event) => this.handleClick(event)}
                  >
                  Enviar
                </SendButton>
              )
            }
          </div>
        </MuiThemeProvider>
        <Modal
        show={this.state.show}
        handleClose={this.hideModal}
        >
          <div className = "modal-body">
            {this.state.responseMessage}
          </div>
        </Modal>
      </div>
    );
  }
}

const style_bar = {
  backgroundColor: '#63347f',
  height: window.innerWidth * 0.04,
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


export default withRouter(CadastrarTutorial);
