import React, {Component} from 'react';
import $ from 'jQuery';
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
import { create } from 'domain';

class Tutoriais extends Component{

  constructor(){
    super();
      this.state = {
        data: [],
        okay: false
        }
    }

  componentDidMount(){
    this.setState({
      data: this.buscaEP(),
    })
  }
  
  items= [];

  url = ""

  rows = [{nome: null,status: null,autor: null,visualizar: null, aceitar: null, rejeitar: null}]; 
  
  createData(nome, status, autor, visualizar, aceitar, rejeitar) {
    return { nome, status, autor, visualizar, aceitar, rejeitar };
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

  
  buscaEP(url){
    console.log("Busca");
    var result = [];
    fetch('https://ludum-materiais.herokuapp.com/api/tutoriais/',{
      method: "GET"
    })
          .then((res) => {
            res.json().then((json) => {
              console.log(json);
              json.data.forEach(element => {
                console.log(element.title)
                this.rows.push(this.createData(element.title,element.status,element._id))
              });
              this.setState({
                okay: true
              })
              console.log("row");
              console.log(this.rows)
            })
          })

    };
  
    render(){
      const classes = this.useStyles;
      console.log("RENDEEEEER");
      console.log(this.rows);
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
                      <IconButton className={classes.button} aria-label="Visualizar">
                        <VisibilityIcon />
                      </IconButton>
                    </this.StyledTableCell>
                    <this.StyledTableCell align="right">{row.aceitar}
                      <IconButton className={classes.button} aria-label="Aceitar">
                        <DoneIcon />
                      </IconButton>
                    </this.StyledTableCell>
                    <this.StyledTableCell align="right">{row.rejeitar}
                      <IconButton className={classes.button} aria-label="Rejeitar">
                        <CloseIcon />
                      </IconButton>
                    </this.StyledTableCell>
                  </this.StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </div>
      )
      else{
        console.log("teste");
        return(
          <div> HEHE </div>
        )

      }
    }
}
  const style = {
    textAlign : 'center',
  };

  export default Tutoriais;