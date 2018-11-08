import React, { Component } from 'react';

import twitterLogo from '../twitter.svg';
import './Login.css';

export default class Login extends Component {

    // variável nativa do react que grava em cache os dados
    state = {
        username: '',
    }

    handleSubmit = (e) => {
        e.preventDefault();

        // usando desestruturação do ES6
        const { username } = this.state;

        // se não digitou nada e pára a função
        if ( !username.length ) return;

        // se ele tiver digitado
        // acessa o local storage do navegador
        localStorage.setItem('@GoTwitter:username', username);

        // redirecionar usuário
        this.props.history.push('/timeline');
    };

    handleInputChange = (e) => {
        this.setState({ username: e.target.value });
    };

    render() {
        return (
            <div className="login-wrapper">
                <img src={twitterLogo} alt="GoTwitter" />
                <form onSubmit={this.handleSubmit}>
                    <input value={this.state.username} onChange={this.handleInputChange} placeholder="Nome de usuário" />
                    <button type="submit">Entrar</button>
                </form>
            </div>
        );
    }
}
