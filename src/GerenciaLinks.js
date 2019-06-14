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
// import NavBar from './helpers/navbar';
import './Components/gerencia.css';

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
        }
    }

    componentDidMount(){
        this.setState({
            linkData: this.buscaEP(),
        })
    }

    url = 'https://produ-o.ludum-materiais.ludumbot.club/api/links/';
    rows = [{title: null, type: null, status: null, id: null, link: null}];
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

    handleAceitar(id){
        axios.put(this.url + id + '/S');
        this.props.history.replace('/link/gerenciar')
    }

    handleRejeitar(id){
        axios.put(this.url + id + '/N');
        this.props.history.replace('/link/gerenciar')
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
        var status = ''
        if (!this.state.reqStatus){
            fetch(this.url,{  //Acessa a API do ludum
                method: "GET"
            })
            .then((res) => {
                res.json().then((json) => {
                    json.data.forEach(element => { //Preenche a table de acordo com as informações dos endpoints
                        if(element.status === 'S'){
                            status = 'Aceito'
                        }
                        else if(element.status === 'N'){
                            status = 'Recusado'
                        }
                        else{
                            status = 'Pendente'
                        }
                        this.rows.push(this.createData(element.title, element.type, status, element._id, element.link))
                    });
                    this.setState({
                        reqStatus: true
                    })
                })
            })
        }
    }

    render() {
        if(this.state.reqStatus){
            return (
                <div> 
                {/* <NavBar></NavBar> */}
                <br/>
                <br/>
                <Paper className = "style_root">
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
                <div>
                    Carregando Informações
                </div>
            )
        }      
    }
}


export default GerenciaLinks;