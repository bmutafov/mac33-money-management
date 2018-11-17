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

const getDebtsQuery = gql`
  {
    debts {
      id
      lender {
        id
        name
      }
      debtor {
        id
        name
      }
      expense {
        date
      }
      amount
    }
  }
`;

const getMoneyOwedQuery = gql`
  {
    moneyOwed {
      id
      lender {
        id 
        name
      }
      debtor {
        id
        name
      }
      amount
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
      payer {
        id
      }
      amount
    }
  }
`;

const addDebtMutation = gql`
  mutation AddDebt($lenderId: ID!, $debtorId: ID!, $expenseId: ID!, $amount: Float){
    addDebt(lenderId: $lenderId, debtorId: $debtorId, expenseId: $expenseId, amount: $amount) {
      id
    }
  }
`;

export {
  // GET QUERIES
  getUsersQuery,
  getExpensesQuery,
  getDebtsQuery,
  getMoneyOwedQuery,

  // MUTATIONS
  addUserMutation,
  addExpenseMutation,
  addDebtMutation,
};
