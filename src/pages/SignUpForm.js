
    
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};
class SignUpForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: null,
            password: null,
            name: null,
            hasAgreed: false, 
            formErrors: { 
              name: "",
              email: "",
              password: ""
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;
        let formErrors = this.state.formErrors;

        console.log("Nome: ", name);
        console.log("Value: ", value);

        switch(name) { 
          case "nome":
            formErrors.name = value.length < 3 && value.length > 0 
              ? "O nome deve ter pelo menos 3 letras"
              : "";
            break;
          case "senha":
            formErrors.password = value.length < 5 && value.length > 0 
              ? "A senha deve ter pelo menos 5 digítos"
              : "";
            break;
          case "email":
            formErrors.email = emailRegex.test(value) && value.length > 0 
              ? ''
              : 'Email invalido';
            break;
        }
        this.setState({
          formErrors,
          [name]: value
        }, () => console.log(this.state));
    };

    handleSubmit = e => {
        e.preventDefault();
        if(formValid(this.state)) {
          console.log(`
            --SUBMITTING--
            NOME: ${this.state.name}
            EMAIL: ${this.state.email}
            SENHA: ${this.state.password}
            `);
        } else {
          console.error('FORMA INVALIDA - MOSTRAR MENSAGEM DE ERRO');
        }
    };

    render() {
      const { formErrors } = this.state 
        return (
        <div className="FormCenter">
            <form onSubmit={this.handleSubmit} className="FormFields">
              <div className="FormField">
                <label className="FormField__Label" htmlFor="name">Nome Completo</label>
                <input 
                  type="text" 
                  id="name" 
                  className= "FormField__Input"
                  placeholder="Digite seu nome completo" 
                  name="name" 
                  value={this.state.name} 
                  onChange={this.handleChange} 
                />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Senha</label>
                <input 
                type="password" 
                id="password" 
                className="FormField__Input" 
                placeholder="Digite sua senha" 
                name="password" 
                value={this.state.password} 
                onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="email">Email</label>
                <input 
                type="email" 
                id="email" 
                className="FormField__Input" 
                placeholder="Digite seu Email" 
                name="email" 
                value={this.state.email} 
                onChange={this.handleChange} />
              </div>
              <div className="FormField">
                  <button className="FormField__Button mr-20">Cadastrar</button> <Link to="/sign-in" 
                  className="FormField__Link">Já possuo conta</Link>
              </div>
            </form>
          </div>
        );
    }
}

export default SignUpForm;