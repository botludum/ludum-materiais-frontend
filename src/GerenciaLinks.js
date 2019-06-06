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

function createData(title, type, status , link, accept, reject) {
return { title, type, status, link, accept, reject };
}

const rows = [
createData('Criando seu pong', 'Vídeo', 'Pendente'),
createData('Criando seu snake', 'Sítio virtual', 'Aprovado'),
createData('O que é Pygame?', 'Fórum do Yahoo', 'Aprovado'),
];

const style_root = {

    width: '80%',
    marginTop: '10%',
    marginLeft: '10%',
    overflowX: 'auto',
};
const style_table = {
    minWidth: 700,
};
const style_button = {
    marginTop: '10%',
};


class GerenciaLinks extends Component {
    constructor(props){
        super(props);
        this.state = {
            tituloLink:'',
            tipoLink:'',
            statusLink:'',
            modalIsOpen: false,
            error: false,
        }
    }

    render() {
        return (
            <div> 
            <MuiThemeProvider>
                <div style={style}>
                <AppBar
                    style={{backgroundColor: '#63347f'}}
                    title="Links"
                    />
                <br/>
                </div>
            </MuiThemeProvider>
            <br/>
            <br/>
            <Paper style = {style_root}>
                <Table style = {style_table}>
                <TableHead>
                    <TableRow>
                    <StyledTableCell align="left">TITULO DO LINK</StyledTableCell>
                    <StyledTableCell align="right">TIPO</StyledTableCell>
                    <StyledTableCell align="right">STATUS</StyledTableCell>
                    <StyledTableCell align="right">VISUALIZAR</StyledTableCell>
                    <StyledTableCell align="right">APROVAR</StyledTableCell>
                    <StyledTableCell align="right">REJEITAR</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                    <StyledTableRow key={row.title}>
                        <StyledTableCell component="th" scope="row">
                        {row.title}
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.type}</StyledTableCell>
                        <StyledTableCell align="right">{row.status}</StyledTableCell>
                        <StyledTableCell align="right">{row.link}
                        <IconButton style={style_button} aria-label="Visualizar">
                            <VisibilityIcon />
                        </IconButton>
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.aceitar}
                        <IconButton style={style_button} aria-label="Aceitar">
                            <DoneIcon />
                        </IconButton>
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.rejeitar}
                        <IconButton style={style_button} aria-label="Rejeitar">
                            <CloseIcon />
                        </IconButton>
                        </StyledTableCell>
                    </StyledTableRow>
                    ))}
                </TableBody>
                </Table>
            </Paper>
            </div>
        );
    }
    }

const style = {
textAlign : 'center',
};

export default GerenciaLinks;