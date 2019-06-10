import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';


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


class Tutoriais extends Component{

  constructor(){
    super();
      this.state = {
        data: [],
        okay: false,
        show: false,
        descricao: 'oi',
        nome: '',
        }
    }

  componentDidMount(){
    this.setState({
      data: this.buscaEP(),
    })
  }
  
  descricaoModal = '';

  setDescricao(descricao){
    this.descricaoModal = descricao;
    console.log(descricao);
  } 

  items= [];

  url = "https://produ-o.ludum-materiais.ludumbot.club/api/tutoriais/"

  rows = [{nome: null,status: null,autor: null,visualizar: null, aceitar: null, rejeitar: null}]; 

  showModal = () => {
    this.setState({ show: true });
  }
  
  hideModal = () => {
    this.setState({ show: false });
  }
  
  createData(nome, status, autor, descricao, visualizar, aceitar, rejeitar) {
    return { nome, status, autor, descricao, visualizar, aceitar, rejeitar };
  }
  
  showModal = () => {
    this.setState({ show: true,});
  }

  hideModal = () => {
    this.setState({ show: false });
  }

  handleAceitar(event,id){
    fetch(this.url+ id +'/S',{
      method: "PUT"
    })
  }

  handleRejeitar(event,id){
    fetch(this.url + id + '/N',{
      method: "PUT"
    })
  }

  handleClick(event,nome,descricao){
    if(this.state.show){
      this.hideModal();
    }
    else{
      this.setState({nome: nome,descricao: descricao});
      this.showModal();
    }
  }
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

  

  buscaEP(){
    var status = ''
    console.log("Busca");
    fetch(this.url,{
      method: "GET"
    })
          .then((res) => {
            res.json().then((json) => {
                json.data.forEach(element => {
                  if(element.status == 'S'){
                    status = 'Aceito'
                  }
                  else if(element.status == 'N'){
                    status = 'Recusado'
                  }
                  else{
                    status = 'Pendente'
                  }
                  this.rows.push(this.createData(element.title,status,element._id,element.description))
                });
                this.setState({
                  okay: true
                })
            })
          })

    };
  
    render(){
      const classes = this.useStyles;
      if(this.state.okay)return (
        <div> 
          <MuiThemeProvider>
            <div style={style}>
              <AppBar
                style={{backgroundColor: '#63347f'}}
                title="Tutoriais"
               />
              <br/>
            </div>
        </MuiThemeProvider>
        <br/>
        <br/>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <this.StyledTableCell align="left">TITULO DO TUTORIAL</this.StyledTableCell>
                  <this.StyledTableCell align="right">STATUS</this.StyledTableCell>
                  <this.StyledTableCell align="right">AUTOR</this.StyledTableCell>
                  <this.StyledTableCell align="right">VISUALIZAR</this.StyledTableCell>
                  <this.StyledTableCell align="right">APROVAR</this.StyledTableCell>
                  <this.StyledTableCell align="right">REJEITAR</this.StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.rows.map(row => (
                  <this.StyledTableRow key={row.autor}>
                    <this.StyledTableCell component="th" scope="row">
                      {row.nome}
                    </this.StyledTableCell>
                    <this.StyledTableCell align="right">{row.status}</this.StyledTableCell>
                    <this.StyledTableCell align="right">{row.autor}</this.StyledTableCell>
                    <this.StyledTableCell align="right">{row.visualizar}
                      <IconButton className={classes.button} aria-label="Visualizar" onClick={(event) => this.handleClick(event,row.nome,row.descricao)} >

                        <VisibilityIcon />
                      </IconButton>
                    </this.StyledTableCell>
                    <this.StyledTableCell align="right">{row.aceitar}
                      <IconButton className={classes.button} aria-label="Aceitar" onClick = {this.handleAceitar(row._id)}>
                        <DoneIcon />
                      </IconButton>
                    </this.StyledTableCell>
                    <this.StyledTableCell align="right">{row.rejeitar}
                      <IconButton className={classes.button} aria-label="Rejeitar" onClick = {this.handleRejeitar(row._id)}>
                        <CloseIcon />
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
              <div className = "modal-head">
                  {this.state.nome}
              </div>
              <div className = "modal-body">
              {this.state.descricao}
              </div>
              </Modal>
          </Paper>
        </div>
      )
      else{
        console.log("teste");
        return(
          <div> CARREGANDO INFORMAÇÕES </div>
        )
      
      }
    }
}
  const style = {
    textAlign : 'center',
  };

  export default Tutoriais;