const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLFloat,
} = graphql;

// Models
const Debt = require('../../models/Debt');
const User = require('../../models/User');
const Expense = require('../../models/Expense');
const MoneyOwed = require('../../models/MoneyOwed');

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A user which can be entered in the money management system',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    expenses: {
      type: new GraphQLList(ExpenseType),
      resolve(parent, args) {
        return Expense.find({ payerId: parent.id });
      }
    },
    lendedMoney: {
      type: new GraphQLList(MoneyOwedType),
      args: {
        to: { type: GraphQLID }
      },
      resolve(parent, args) {
        let { to = null } = args;
        let params = to === null ? { lenderId: parent.id } : { lenderId: parent.id, debtorId: to };
        return MoneyOwed.find(params);
      }
    },
    debtedMoney: {
      type: new GraphQLList(MoneyOwedType),
      args: {
        to: { type: GraphQLID }
      },
      resolve(parent, args) {
        let { to = null } = args;
        let params = to === null ? { debtorId: parent.id } : { debtorId: parent.id, lenderId: to };
        return MoneyOwed.find(params);
      }
    }
  })
});

const ExpenseType = new GraphQLObjectType({
  name: 'Expense',
  description: 'Only one expense, one payer. Example: Person1 payed for the groceries on 1-1-2018. The amount was 20 euro.',
  fields: () => ({
    id: { type: GraphQLID },
    payer: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.payerId);
      }
    },
    amount: { type: GraphQLFloat },
    date: { type: GraphQLString },
  })
});

const DebtType = new GraphQLObjectType({
  name: 'Debt',
  description: 'A debt from an expense.',
  fields: () => ({
    id: { type: GraphQLID },
    lender: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.lenderId);
      }
    },
    debtor: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.debtorId);
      }
    },
    expense: {
      type: ExpenseType,
      resolve(parent, args) {
        return Expense.findById(parent.expenseId);
      }
    },
    amount: { type: GraphQLFloat },
  })
});

const MoneyOwedType = new GraphQLObjectType({
  name: 'MoneyOwed',
  description: 'Total money owed person to person',
  fields: () => ({
    lender: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.lenderId);
      }
    },
    debtor: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.debtorId);
      }
    },
    amount: { type: GraphQLFloat },
  })
});

module.exports = {
  UserType,
  DebtType,
  ExpenseType,
  MoneyOwedType
};
