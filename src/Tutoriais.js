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

class Tutoriais extends Component{

  constructor(props){
    super(props);
    this.state={
      items: [],
    }
  }

  url = "https://ludum-materiais.herokuapp.com/api/tutoriais";

  componentDidMount(){
    fetch(this.url)
      .then(res => res.json())
      .then(json =>{
        this.setState({
          items: json,
        })
      });
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

  style = {
    textAlign : 'center',
  };
  render() {

    var {items} = this.state;

    const classes = this.useStyles();
    return (
      <div> Peery </div>,

      <div> 
        <MuiThemeProvider>
          <div style={this.style}>
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
              {items.map(item => (
                <this.StyledTableRow key={item._id}>
                  <this.StyledTableCell component="th" scope="row">
                    {item.title}
                  </this.StyledTableCell>
                  <this.StyledTableCell align="right">{item.status}</this.StyledTableCell>
                  <this.StyledTableCell align="right">{item._id}</this.StyledTableCell>
                  <this.StyledTableCell align="right">{"visualizar"}
                    <IconButton className={classes.button} aria-label="Visualizar">
                      <VisibilityIcon />
                    </IconButton>
                  </this.StyledTableCell>
                  <this.StyledTableCell align="right">{"aceitar"}
                    <IconButton className={classes.button} aria-label="Aceitar">
                      <DoneIcon />
                    </IconButton>
                  </this.StyledTableCell>
                  <this.StyledTableCell align="right">{"rejeitar"}
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
  }


  }

  export default Tutoriais;