const graphql = require('graphql');
const _ = require('lodash');

// Models
const User = require('../models/User');
const Expense = require('../models/Expense');
const Debt = require('../models/Debt');
const MoneyOwed = require('../models/MoneyOwed');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLFloat,
} = graphql;

// DUMMY DATA
// let users = [
//   { id: '1', name: 'Boris' },
//   { id: '2', name: 'Boyan' },
//   { id: '3', name: 'Slav' },
// ];

// let expenses = [
//   { id: '1', payerId: '1', amount: 23, date: new Date('1-1-2018') },
//   { id: '2', payerId: '1', amount: 44, date: new Date('1-2-2018') },
//   { id: '3', payerId: '2', amount: 12, date: new Date('1-3-2018') },
// ]

// let debts = [
//   { id: '1', lenderId: '1', debtorId: '3', expenseId: '1', amount: '5' },
//   { id: '2', lenderId: '1', debtorId: '2', expenseId: '1', amount: '6' },
//   { id: '3', lenderId: '2', debtorId: '3', expenseId: '3', amount: '2' },
// ]

// let moneyOwed = [
//   { lenderId: '1', debtorId: '2', amount: 9 },
//   { lenderId: '2', debtorId: '1', amount: 6 },
//   { lenderId: '1', debtorId: '3', amount: 13 },
//   { lenderId: '3', debtorId: '1', amount: 66 },
//   { lenderId: '2', debtorId: '3', amount: 2 },
//   { lenderId: '3', debtorId: '2', amount: 0 },
// ]
// END DUMMY DATA

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
      resolve(parent, args) {
        return Expense.find({});
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({});
      }
    },
    debts: {
      type: new GraphQLList(DebtType),
      resolve(parent, args) {
        return Debt.find({});
      }
    },
    moneyOwed: {
      type: new GraphQLList(MoneyOwedType),
      resolve(parent, args) {
        return MoneyOwed.find({});
      }
    },
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Used to mutate data in the database',
  fields: {
    addUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
      },
      async resolve(parent, args) {
        let { name } = args;
        let user = new User({
          name
        });
        const otherUsers = await User.find({}).then(result => { return result.map(u => u.id) });
        const newUser = await user.save();
        if (otherUsers.length > 0) {
          for (let i = 0; i < otherUsers.length; i++) {
            let moneyOwed = new MoneyOwed({
              lenderId: otherUsers[i],
              debtorId: newUser.id,
              amount: 0,
            });
            let moneyOwedBack = new MoneyOwed({
              lenderId: newUser.id,
              debtorId: otherUsers[i],
              amount: 0,
            });
            moneyOwed.save();
            moneyOwedBack.save();
          }
        }
        return newUser;
      }
    },
    addExpense: {
      type: ExpenseType,
      args: {
        payerId: { type: GraphQLID },
        amount: { type: GraphQLFloat },
        date: { type: GraphQLString },
      },
      resolve(parent, args) {
        let { payerId, amount, date } = args;
        let expense = new Expense({
          payerId,
          amount,
          date
        });
        return expense.save();
      }
    },
    addDebt: {
      type: DebtType,
      args: {
        lenderId: { type: GraphQLID },
        debtorId: { type: GraphQLID },
        expenseId: { type: GraphQLID },
        amount: { type: GraphQLFloat },
      },
      async resolve(parent, args) {
        let { lenderId, debtorId, expenseId, amount } = args;
        let debt = new Debt({
          lenderId,
          debtorId,
          expenseId,
          amount
        });
        await MoneyOwed.findOneAndUpdate({ lenderId, debtorId }, { $inc: { amount } });
        return debt.save();
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
})