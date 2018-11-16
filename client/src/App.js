import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// Components
import AddUser from './components/AddUser';
import DisplayUsers from './components/DisplayUsers';

// apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:8080/graphiql'
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <h1>Mac & Cheese money management v2</h1>
          <AddUser />
          <DisplayUsers />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
