import React, { Component } from 'react';
// importando api criada na pasta services das chamadas de http - webservice
import api from '../services/api';
import socket from 'socket.io-client';

import twitterLogo from '../twitter.svg';
import './Timeline.css';

// componente tweet - ?
import Tweet from '../components/Tweet';

export default class Timeline extends Component {

    state = {
        tweets: [],
        newTweet: ''
    };

    // quando a tela for chamda - será executado automaticamente quando exibido em tela
    async componentDidMount() {
        this.subscribeToEvents();

        const response = await api.get('tweets');

        this.setState({ tweets: response.data });
    }

    // funcao para encapsular realtime
    subscribeToEvents = () => {
        // socket com caminho da API REST
        const io = socket('http://localhost:3000');

        // evento de recarregar em realtime os tweets
        io.on('tweet', data => {
            // seta o novo tweet no indice 0 do vetor de tweets 
            // depois pega todos os tweets que já tinham e adiciona 
            // na frente
            this.setState({ tweets: [data, ...this.state.tweets] })
        })

        // evento de recarregar em realtime os likes
        io.on('like', data => {
            // obtem o vetor de likes pelo map e verifica se é o mesmo 
            // que já está em data, caso nao seja atualiza
            this.setState({ tweets: this.state.tweets.map(tweet =>
                tweet._id === data._id ? data : tweet 
            ) })
        })
    }

    handleNewTweet = async e => {
        if (e.keyCode !== 13) return;

        // conteudo do tweet
        const content = this.state.newTweet;
        // author do tweet que está salvo no localstorage - cache
        const author = localStorage.getItem('@GoTwitter:username');

        // await - método assincrono
        // passando a rota com os dados em parametros
        await api.post('tweets', {content, author});

        // set vazio quando acaba de submeter
        this.setState({ newTweet: '' });
    };

    handleInputChange = e => {
        this.setState({newTweet: e.target.value  });
    };


  render() {
    return (
        <div className="timeline-wrapper">
            <img height={24} src={twitterLogo} alt="GoTwitter" />

            <form>
                <textarea 
                    value={this.state.newTweet} 
                    onChange={this.handleInputChange} 
                    onKeyDown={this.handleNewTweet} placeholder="O que está acontecendo?" 
                />
            </form>

            <ul className="tweet-list">
            { this.state.tweets.map(tweet => (
                // component externo (../components/Tweet) - para ter mais manutenabilidade e performance
                <Tweet key={tweet._id} tweet={tweet} />
            )) }
            </ul>
        </div>
    );
  }
}
