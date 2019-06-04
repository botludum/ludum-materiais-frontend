import React, { Component } from 'react';

class SignInForm extends Component {
    constructor() {
        super();

        this.state = {
            nome: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
          [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        console.log('The form was submitted with the following data:');
        console.log(this.state);
    }

    render() {
        return (
        <div className="FormCenter">
            <form className="FormFields" onSubmit={this.handleSubmit}>
            <div className="FormField">
                <label className="FormField__Label" htmlFor="email">Nome</label>
                <input type="name" id="nome" className="FormField__Input" placeholder="Digite seu nome" name="nome" value={this.state.email} onChange={this.handleChange} />
              </div>

              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Senha</label>
                <input type="password" id="password" className="FormField__Input" placeholder="Digite sua senha" name="password" value={this.state.password} onChange={this.handleChange} />
              </div>

              <div className="FormField">
                  <button className="FormField__Button mr-20">Entrar</button>
              </div>
            </form>
          </div>
        );
    }
}

export default SignInForm;