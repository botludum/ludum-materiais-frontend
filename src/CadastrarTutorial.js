import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import './Components/Modal.css'
import NavBar from './helpers/navbar';
import { withRouter } from 'react-router-dom';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6

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
  constructor(props) {
    super(props);
    this.state = {
      nomeTutorial: '',
      descricaoTutorial: '',
      nomeError: '',
      descricaoError: '',
      responseMessage: '',
      show: false,
      loading: false,
      text: ''
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
      this.setState({ nomeError, descricaoError });
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
        "description": this.state.descricaoTutorial,
        "status": null,
      };

      this.setState({ loading: true });
      axios.post(apiBaseUrl, body)
        .then((response) => {
          console.log(response.status);
          if (response.status === 200) {
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
            this.setState({ responseMessage: 'Algo deu errado, tente novamente mais tarde', loading: false });
          }
          this.showModal();
        })
        .catch((error) => {
          console.log(error);
          this.setState({ responseMessage: 'Algo deu errado, tente novamente mais tarde' });
          this.showModal();
        });
    }
  }

  handleChangeText = (value) => {
    this.setState({ descricaoTutorial: value })
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
      [event.target.name]: isText
        ? event.target.checked
        : event.target.value
    })
  };

  render() {
    const toolbarOptions = [
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image', 'code-block'],
      ['clean']
    ];

    const history = {
      delay: 2000,
      maxStack: 500,
      userOnly: true
    }
    const formats = [
      'bold', 'italic', 'underline',
      'list', 'bullet', 'indent',
      'link', 'image', 'code-block'
    ]
    return (
      <div style={{ textAlign: "center" }}>
        <NavBar></NavBar>
        <Typography variant="h3" color="inherit" style={{ textAlign: "center", marginTop: "15px" }}>
          Cadastrar Tutorial
        </Typography>
        <TextField
          error={this.state.nomeError !== ''}
          name="nomeTutorial"
          label="Nome do tutorial"
          value={this.state.nomeTutorial || ''}
          onChange={this.handleChange}
          margin="normal"
        />
        <br />
        <div style={error_style}>{this.state.nomeError}</div>
        <ReactQuill value={this.state.descricaoTutorial}
          onChange={this.handleChangeText}
          modules={{ syntax: true, toolbar: toolbarOptions, history: history }}
          theme='snow'
          formats={formats}
          style={{ height: "300px", width: "80vw", marginLeft: "140px" }} />
        <br />
        <br /><br />
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
        <Modal
          show={this.state.show}
          handleClose={this.hideModal}
        >
          <div className="modal-body">
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


export default withRouter(CadastrarTutorial);
