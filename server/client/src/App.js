import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import Header from './components/Header';
import GridSystem from './components/GridSystem';

// apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:8080/graphiql'
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Header />
        <div className="App">
          <GridSystem />
        </div>
      </ApolloProvider >
    );
  }
}

export default App;
