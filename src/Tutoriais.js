import React, { Component } from 'react';
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

function createData(name, calories, fat, carbs, protein, visualizar, aceitar, rejeitar) {
  return { name, calories, fat, carbs, protein, visualizar, aceitar, rejeitar };
}

const rows = [
  createData('Flapy Bird', 'Facil', 'Pendente', 'Usuario'),
  createData('Pong','Facil','Aprovado', 'Administrador'),
  createData('Snake','Médio','Aprovado', 'Administrador'),
  createData('Tetris','Dificil','Pendente', 'Usuario'),
  createData('Juba','Dificil','Pendente', 'Usuario'),
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
              <StyledTableCell>TITULO DO TUTORIAL</StyledTableCell>
              <StyledTableCell align="right">DIFICULDADE</StyledTableCell>
              <StyledTableCell align="right">STATUS</StyledTableCell>
              <StyledTableCell align="right">AUTOR</StyledTableCell>
              <StyledTableCell align="right">VISUALIZAR</StyledTableCell>
              <StyledTableCell align="right">APROVAR</StyledTableCell>
              <StyledTableCell align="right">REJEITAR</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.calories}</StyledTableCell>
                <StyledTableCell align="right">{row.fat}</StyledTableCell>
                <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                <StyledTableCell align="right">{row.visualizar}
                  <IconButton className={classes.button} aria-label="Delete">
                    <VisibilityIcon />
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell align="right">{row.aceitar}
                  <IconButton className={classes.button} aria-label="Delete">
                    <DoneIcon />
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell align="right">{row.rejeitar}
                  <IconButton className={classes.button} aria-label="Delete">
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