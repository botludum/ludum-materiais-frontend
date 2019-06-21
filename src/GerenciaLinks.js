import React, { Component } from 'react';
import { withStyles} from '@material-ui/core/styles';
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
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import './Components/gerencia.css';
import AuthService from './services/AuthService';
import NavBar from './helpers/navbar';
import withAuth from './services/withAuth';
import Loading from './helpers/loading';

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

const Auth = new AuthService();

class GerenciaLinks extends Component {
    constructor(props){
        super(props);
        this.state = {
            linkData: [],
            modalIsOpen: false,
            show: false,
            title: '',
            type: '',
            link: '',
            reqStatus: false,
            status: '',
        }
    }

    componentDidMount(){
        this.setState({
            linkData: this.buscaEP(),
        })
    }

    url = 'https://produ-o.ludum-materiais.ludumbot.club/api/links/';
    rows = [];
    titleModal = '';
    typeModal = '';
    linkModal = '';
    
    setModalInfo(title, type, link){
        this.titleModal = title;
        this.typeModal = type;
        this.linkModal = link;
    }

    createData(title, type, status, id, link) {
        return {title, type, status, id, link};
    }

    showModal = () => {
        this.setState({ show: true });
    }    
    
    hideModal = () => {
        this.setState({ show: false });
    }

    handleAceitar = (id) => {
        axios.put(this.url + id + '/S');
        this.setState({ status: 'Aceito' });
        this.forceUpdate();
    }

    handleRejeitar = (id) => {
        axios.put(this.url + id + '/N')
        this.setState({ status: 'Recusado' });
        this.forceUpdate();
    }

    handleClick(event, title, type, link){
        if(this.state.show){
          this.hideModal();
        }
        else{
          this.setState({title: title, type: type, link: link});
          this.showModal();
        }
    }

    buscaEP(url){
        // var status = ''
        if (!this.state.reqStatus){
            fetch(this.url,{  //Acessa a API do ludum
                method: "GET"
            })
            .then((res) => {
                res.json().then((json) => {
                    json.data.forEach(element => { //Preenche a table de acordo com as informações dos endpoints
                        if(element.status === 'S'){
                            this.setState({ status: 'Aceito' })
                        }
                        else if(element.status === 'N'){
                            this.setState({ status: 'Recusado' })
                        }
                        else{
                            this.setState({ status: 'Pendente' })
                        }

                        this.rows.push(this.createData(element.title, element.type, this.state.status, element._id, element.link))
                        
                    });
                    this.setState({
                        reqStatus: true
                    })
                })
            })
        }
    }

      handleLogout(){
        Auth.logout()
        this.props.history.replace('/');
     }
    render() {
        if(this.state.reqStatus){
            return (
                <div> 
                    <NavBar></NavBar>
                    <Typography variant="h3" color="inherit" style={{textAlign: "center", marginTop: "15px"}}>
                        Gerenciar Links
                    </Typography>
                    <Paper className = "style_root" style={{marginTop: "30px"}}>
                        <Table className = "style_table">
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
                            {this.rows.map(row => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell component="th" scope="row">
                                {row.title}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.type}</StyledTableCell>
                                <StyledTableCell align="right">{row.status}</StyledTableCell>
                                <StyledTableCell align="right">   
                                <IconButton className="style_button" aria-label="Visualizar" onClick={(event) => this.handleClick(event,row.title,row.type, row.link)}>
                                    <VisibilityIcon />
                                </IconButton>
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.accept}
                                <IconButton className="style_button" aria-label="Aceitar" onClick = {() =>this.handleAceitar(row.id)}>
                                    <DoneIcon />
                                </IconButton>
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.reject}
                                <IconButton className="style_button" aria-label="Rejeitar" onClick = {() =>this.handleRejeitar(row.id)}>
                                    <CloseIcon />
                                </IconButton>
                                </StyledTableCell>
                            </StyledTableRow>
                            ))}
                        </TableBody>
                        </Table>
                        <Modal show={this.state.show} handleClose={this.hideModal} >
                            <div className = "modal-body">
                                <p><b>Titulo: </b>{this.state.title}</p>
                                <p><b>Tipo: </b>{this.state.type}</p>
                                <p><b>Link: </b>{this.state.link}</p>
                            </div>
                        </Modal>
                    </Paper>
                </div>
            );
        }  
        else{
            return (
                <Loading/>
            )
        }      
    }
}


export default withAuth(GerenciaLinks);
