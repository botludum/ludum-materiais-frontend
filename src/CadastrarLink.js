import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
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

const URLRegex = RegExp(
  /([--:\w?@%&+~#=]*\.[a-z]{2,4}\/{0,2})((?:[?&](?:\w+)=(?:\w+))+|[--:\w?@%&+~#=]+)?/g
)

const initialState = {
  nomeLink:'',
  tipoLink:'',
  descricaoLink:'',
  nomeLinkError:'',
  tipoLinkError:'',
  descricaoLinkError:'',
}

class CadastrarLink extends Component {
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
    let nomeLinkError = "";
    let tipoLinkError = "";
    let descricaoLinkError = "";
    const testeRegex = URLRegex.test(this.state.descricaoLink);

    if (!this.state.nomeLink) {
      nomeLinkError = "Nome em branco";
    }

    if (!this.state.descricaoLink) {
      descricaoLinkError = "Link em branco";
    } else if (!testeRegex) {
      descricaoLinkError = "Link inválido"
    }

    if (!this.state.tipoLink) {
      tipoLinkError = "Tipo em branco";
    }

     if (nomeLinkError || tipoLinkError || descricaoLinkError) {
      this.setState({nomeLinkError, tipoLinkError, descricaoLinkError});
      return false;
    }

    return true;
  };

  handleClick(event) {
    const isValid = this.validate();
    console.log(this.state);
    console.log(isValid);
    if (isValid) {
      this.setState(initialState);
    }
  }

  handleChange = (event) => {
    const isCheckbox = event.target.type === "checkbox";

    this.setState({
      [event.target.name] : isCheckbox
      ? event.target.checked
      : event.target.value
    })
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
              error={this.state.nomeLinkError !== ''}
              name="nomeLink"
              id="standard-name"
              label="Nome do Link"
              value={this.state.nomeLink || ''}
              onChange={this.handleChange}
              margin="normal"
            />
            <br/>
            <div style={error_style}>{this.state.nomeLinkError}</div>
            <TextField
              error={this.state.tipoLinkError !== ''}
              name="tipoLink"
              id="standard-name"
              label="Tipo (Livro, site, artigo...)"
              value={this.state.tipoLink || ''}
              onChange={this.handleChange}
              margin="normal"
            />
            <br/>
            <div style={error_style}>{this.state.tipoLinkError}</div>
            <TextField
              error={this.state.descricaoLinkError !== ''}
              name="descricaoLink"
              label="Adicione seu Link"
              value={this.state.descricaoLink || ''}
              onChange={this.handleChange}
              multiline={true}
              rowsMax = "2"
              rows = "5"
              variant="outlined"
              style={style_descricao}
            />
            <div style={error_style}>{this.state.descricaoLinkError}</div>
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

const error_style = {
  fontSize: 15,
  color: 'red',
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
