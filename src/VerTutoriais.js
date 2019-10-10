import React, { Component } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CloseIcon from '@material-ui/icons/Close';
import NavBar from './helpers/navbar';
import Loading from './helpers/loading';
import './Components/Modal.css'

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className='modal-main' style={{height: '80vh'}}>
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


class VerTutoriais extends Component {

  constructor() {
    super();
    this.state = {
      data: [],
      okay: false,
      show: false,
      descricao: '',
      nome: '',
    }
  }

  componentDidMount() {
    this.setState({
      data: this.buscaEP(),
    })
  }

  items = [];

  url = "https://ludum-materiais.herokuapp.com/api/tutoriais/aprovados/S"

  rows = [];


  createData(nome, status, autor, descricao, visualizar, aceitar, rejeitar) {
    return { nome, status, autor, descricao, visualizar, aceitar, rejeitar };
  }

  showModal = () => { //Abre o modal
    this.setState({ show: true, });
  }

  hideModal = () => { //Fecha o modal
    this.setState({ show: false });
  }

  handleClick(event, nome, descricao) { //Abre o modal se estiver fechado e fecha o modal se estiver aberto
    if (this.state.show) {
      this.hideModal();
    }
    else {
      this.setState({ nome: nome, descricao: descricao });
      this.showModal();
    }
  }

  buscaEP() {
    var status = ''
    if (!this.state.okay) {
      fetch(this.url, {  //Acessa a API do ludum
        method: "GET"
      })
        .then((res) => {
          res.json().then((json) => {
            json.data.forEach(element => { //Preenche a table de acordo com as informações dos endpoints
              if (element.status === 'S') {
                status = 'Aceito'
              }
              else if (element.status === 'N') {
                status = 'Recusado'
              }
              else {
                status = 'Pendente'
              }
              this.rows.push(this.createData(element.title, status, element._id, element.description))
            });
            this.setState({
              okay: true
            })
          })
        })
    }

  };

  //Estilos da tabela
  StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: '#28BBFF',
      color: theme.palette.common.black,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  StyledTableRow = withStyles(theme => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  }))(TableRow);


  useStyles = makeStyles(theme => ({
    root: {
      width: '80%',
      marginTop: '10%',
      marginLeft: '10%',
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
    button: {
      marginTop: '10%',
    },
  }));


  render() { //Renderiza a tela caso tenha carregado as informações da api
    const classes = this.useStyles;
    if (this.state.okay) return (
      <div>
        <NavBar>
        </NavBar>
        <Typography variant="h3" color="inherit" style={{ textAlign: "center", marginTop: "15px" }}>
          Tutoriais
         </Typography>
        <Paper className="style_root" style={{ marginTop: "30px" }}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <this.StyledTableCell align="left">TITULO DO TUTORIAL</this.StyledTableCell>
                <this.StyledTableCell align="right">STATUS</this.StyledTableCell>
                <this.StyledTableCell align="right">VISUALIZAR</this.StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.rows.map(row => (
                <this.StyledTableRow key={row.autor}>
                  <this.StyledTableCell component="th" scope="row">
                    {row.nome}
                  </this.StyledTableCell>
                  <this.StyledTableCell align="right">{row.status}</this.StyledTableCell>
                  <this.StyledTableCell align="right">{row.visualizar}
                    <IconButton className={classes.button} aria-label="Visualizar" onClick={(event) => this.handleClick(event, row.nome, row.descricao)} >
                      <VisibilityIcon />
                    </IconButton>
                  </this.StyledTableCell>
                </this.StyledTableRow>
              ))}
            </TableBody>
          </Table>
          <Modal
            show={this.state.show}
            handleClose={this.hideModal}
          >
            <div className="modal-body">
              <p><b>Titulo: </b>{this.state.nome}</p>
              <p><b>Descrição: </b></p><div style={{ marginLeft: '20px', textAlign: 'left' }} dangerouslySetInnerHTML={{ __html: this.state.descricao }}></div>
            </div>
          </Modal>
        </Paper>
      </div>
    )
    else {
      return (
        <Loading />
      )

    }
  }
}

export default VerTutoriais;