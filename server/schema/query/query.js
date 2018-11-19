const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
} = graphql;

// Types
const { UserType, ExpenseType, DebtType, MoneyOwedType } = require('../types/types');

// Models
const Debt = require('../../models/Debt');
const User = require('../../models/User');
const Expense = require('../../models/Expense');
const MoneyOwed = require('../../models/MoneyOwed');


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'The main entrypoint for querying.',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id);
      }
    },
    expense: {
      type: ExpenseType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Expense.findById(args.id);
      }
    },
    debt: {
      type: new GraphQLList(DebtType),
      args: { id: { type: GraphQLID }, lenderId: { type: GraphQLID }, debtorId: { type: GraphQLID } },
      resolve(parent, args) {
        let params = { id = null, lenderId = null, debtorId = null } = args;
        return Debt.find(params);
      }
    },
    expenses: {
      type: new GraphQLList(ExpenseType),
      args: { limit: { type: GraphQLInt } },
      resolve(parent, args) {
        let { limit = null } = args;
        return Expense.find({}).sort({ date: 'desc' }).limit(limit);
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({});
      }
    },
    debts: {
      type: new GraphQLList(DebtType),
      resolve() {
        return Debt.find({});
      }
    },
    moneyOwed: {
      type: new GraphQLList(MoneyOwedType),
      resolve() {
        return MoneyOwed.find({});
      }
    },
  }
});

module.exports = {
  RootQuery
};
