import { gql } from 'apollo-boost';

const getUsersQuery = gql`
  {
    users {
      id
      name
    }
  }
`;


const getExpensesQuery = gql`
  {
    expenses {
      id
      payer {
        id
        name
      }
      amount
      date
    }
  }
`;

const addUserMutation = gql`
  mutation AddUser($name: String!){
    addUser(name: $name) {
      id
      name
    }
  }
`;

const addExpenseMutation = gql`
  mutation AddExpense($payerId: ID!, $amount: Float!, $date: String!) {
    addExpense(payerId: $payerId, amount: $amount, date: $date) {
      id
    }
  }
`;

export {
  // GET QUERIES
  getUsersQuery,
  getExpensesQuery,

  // MUTATIONS
  addUserMutation,
  addExpenseMutation
};
