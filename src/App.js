import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Posts from './components/Posts';
// import pusher module
import Pusher from 'pusher-js';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri : "http://localhost:4000/graphql"
});

class App extends Component {
  constructor(){
    super();
    this.pusher = new Pusher("5cf7a92728a83a88849a", {
      cluster: 'ap2',
      encrypted: true
     });
  }
  componentDidMount(){
    if ('actions' in Notification.prototype) {
      alert('You can enjoy the notification feature');
    } else {
      alert('Sorry notifications are NOT supported on your browser');
    }
  }
  render(){
    return(
      <ApolloProvider client={client}>
        <div className="App">
          <Header />
          <section className="App-main">
            <Posts pusher={this.pusher} apollo_client={client}/>
          </section>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
