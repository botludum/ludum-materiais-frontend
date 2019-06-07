import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles} from '@material-ui/core/styles';
import Modal from 'react-modal';
import './Components/link.css';

const SendButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText('#28bbff'),
    backgroundColor: '#28bbff',
    '&:hover': {
      backgroundColor: '#28bbff',

    },
  },
}))(Button);

class CadastrarLink extends Component {
  constructor(props){
    super(props);
    this.state = {
      nomeLink:'',
      tipoLink:'',
      descricaoLink:'',
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
    console.log('Clicando');
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
              Cadastrar Links
            </Typography>
            </AppBar>
            <TextField
              error={this.state.error}
              id="standard-name"
              label="Nome do Link"
              onChange = {(event) => this.setState({nomeLink:event.target.value})}
              margin="normal"
            />
            <br/>
            <TextField
              error={this.state.error}
              id="standard-name"
              label="Tipo(Ex: Livro, site..)"
              onChange = {(event) => this.setState({tipoLink:event.target.value})}
              margin="normal"
            />
            <br/>
            <TextField
              label="Adicione seu Link"
              onChange = {(event) => this.setState({descricaoLink: event.target.value})}
              multiline={true}
              rowsMax = "1"
              rows = "1"
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


export default CadastrarLink;
