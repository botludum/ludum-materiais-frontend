import React from 'react';
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

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#28BBFF',
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

function createData(nome, status, autor, visualizar, aceitar, rejeitar) {
  return { nome, status, autor, visualizar, aceitar, rejeitar };
}

const rows = [
  createData('Flapy Bird','Pendente', 'Usuario'),
  createData('Pong','Aprovado', 'Administrador'),
  createData('Snake','Aprovado', 'Administrador'),
  createData('Tetris','Pendente', 'Usuario'),
  createData('Juba','Pendente', 'Usuario'),
];

const useStyles = makeStyles(theme => ({
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

function Tutoriais() {
  const classes = useStyles();
  return (
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
              <StyledTableCell align="left">TITULO DO TUTORIAL</StyledTableCell>
              <StyledTableCell align="right">STATUS</StyledTableCell>
              <StyledTableCell align="right">AUTOR</StyledTableCell>
              <StyledTableCell align="right">VISUALIZAR</StyledTableCell>
              <StyledTableCell align="right">APROVAR</StyledTableCell>
              <StyledTableCell align="right">REJEITAR</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <StyledTableRow key={row.nome}>
                <StyledTableCell component="th" scope="row">
                  {row.nome}
                </StyledTableCell>
                <StyledTableCell align="right">{row.status}</StyledTableCell>
                <StyledTableCell align="right">{row.autor}</StyledTableCell>
                <StyledTableCell align="right">{row.visualizar}
                  <IconButton className={classes.button} aria-label="Visualizar">
                    <VisibilityIcon />
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell align="right">{row.aceitar}
                  <IconButton className={classes.button} aria-label="Aceitar">
                    <DoneIcon />
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell align="right">{row.rejeitar}
                  <IconButton className={classes.button} aria-label="Rejeitar">
                    <CloseIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  )
}

const style = {
  textAlign : 'center',
};

export default Tutoriais;