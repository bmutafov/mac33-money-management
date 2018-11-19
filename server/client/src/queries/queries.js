import { gql } from 'apollo-boost';

// QUERIES
const getUsersQuery = gql`
  {
    users {
      id
      name
      color
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
        color
      }
      debts {
        debtor {
          id
          name
          color
        }
        amount
      }
      amount
      date
      description
    }
  }
`;

const getWeekExpenses = gql`
  query($before: String, $after: String) {
    expenses(before: $before, after: $after) {
      date
      amount
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
        color
      }
      debtor {
        id
        name
        color
      }
      expense {
        date
        description
        amount
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
        color
      }
      debtor {
        id
        name
        color
      }
      amount
    }
  }
`;

// MUTATIONS
const addUserMutation = gql`
  mutation AddUser($name: String!, $color: Int!){
    addUser(name: $name, color: $color) {
      id
      name
      color
    }
  }
`;

const addExpenseMutation = gql`
  mutation AddExpense($payerId: ID!, $amount: Float!, $date: String!, $description: String) {
    addExpense(payerId: $payerId, amount: $amount, date: $date, description: $description) {
      id
      payer {
        id
      }
      amount
    }
  }
`;

const addDebtMutation = gql`
  mutation AddDebt($lenderId: ID!, $debtorId: ID!, $expenseId: ID!, $amount: Float!){
    addDebt(lenderId: $lenderId, debtorId: $debtorId, expenseId: $expenseId, amount: $amount) {
      id
    }
  }
`;

const payDebtMutation = gql`
  mutation PayDebt($lenderId: ID!, $debtorId: ID!, $amount: Float!) {
    payDebts(lenderId: $lenderId, debtorId: $debtorId, amount: $amount) {
      lender {
        name
      }
      debtor {
        name
      }
      amount
    }
  }
`;

export {
  // GET QUERIES
  getUsersQuery,
  getExpensesQuery,
  getDebtsQuery,
  getMoneyOwedQuery,
  getWeekExpenses,

  // MUTATIONS
  addUserMutation,
  addExpenseMutation,
  addDebtMutation,
  payDebtMutation,
};
