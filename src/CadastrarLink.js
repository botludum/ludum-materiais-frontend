import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
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

const URLRegex = RegExp(
  /([--:\w?@%&+~#=]*\.[a-z]{2,4}\/{0,2})((?:[?&](?:\w+)=(?:\w+))+|[--:\w?@%&+~#=]+)?/g
)

class CadastrarLink extends Component {
  constructor(props){
    super(props);
    this.state = {
      nomeLink:'',
      tipoLink:'',
      descricaoLink:'',
      nomeLinkError:'',
      tipoLinkError:'',
      descricaoLinkError:'',
      responseMessage:'',
      show: false,
    }
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
    if (isValid) {
      var apiBaseUrl = "https://produ-o.ludum-materiais.ludumbot.club/api/links/cadastrar";

      var body = {
      "title": this.state.nomeLink,
      "type":this.state.tipoLink,
      "link":this.state.descricaoLink,
      "status": null,
      }

      axios.post(apiBaseUrl, body)
     .then((response) => {
       console.log(response.status);
       if(response.status === 200){
        this.setState({
          nomeLink:'',
          tipoLink:'',
          descricaoLink:'',
          nomeLinkError:'',
          tipoLinkError:'',
          descricaoLinkError:'',
          responseMessage: 'Link enviado com sucesso',
        });
      } else {
        this.setState({responseMessage: 'Algo deu errado, tente novamente mais tarde'})
      }
      this.showModal();
     })
     .catch((error) => {
       console.log(error);
       this.setState({responseMessage: 'Algo deu errado, tente novamente mais tarde'})
       this.showModal();
     });
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

  showModal = () => {
    this.setState({ show: true });
  }

  hideModal = () => {
    this.setState({ show: false });
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
