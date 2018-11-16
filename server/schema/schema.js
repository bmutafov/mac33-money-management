const graphql = require('graphql');
const _ = require('lodash');

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
let users = [
  { id: '1', name: 'Boris' },
  { id: '2', name: 'Boyan' },
  { id: '3', name: 'Slav' },
];

let expenses = [
  { id: '1', payerId: '1', amount: 23, date: new Date('1-1-2018') },
  { id: '2', payerId: '1', amount: 44, date: new Date('1-2-2018') },
  { id: '3', payerId: '2', amount: 12, date: new Date('1-3-2018') },
]

let debts = [
  { id: '1', lenderId: '1', debtorId: '3', expenseId: '1', amount: '5' },
  { id: '2', lenderId: '1', debtorId: '2', expenseId: '1', amount: '6' },
  { id: '3', lenderId: '2', debtorId: '3', expenseId: '3', amount: '2' },
]

let moneyOwed = [
  { lenderId: '1', debtorId: '2', amount: 9 },
  { lenderId: '2', debtorId: '1', amount: 6 },
  { lenderId: '1', debtorId: '3', amount: 13 },
  { lenderId: '3', debtorId: '1', amount: 66 },
  { lenderId: '2', debtorId: '3', amount: 2 },
  { lenderId: '3', debtorId: '2', amount: 0 },
]
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
        return _.filter(expenses, { payerId: parent.id });
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
        return _.find(users, { id: parent.payerId });
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
        return _.find(users, { id: parent.lenderId });
      }
    },
    debtor: {
      type: UserType,
      resolve(parent, args) {
        return _.find(users, { id: parent.debtorId });
      }
    },
    expense: {
      type: ExpenseType,
      resolve(parent, args) {
        return _.find(expenses, { id: parent.expenseId });
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
        return _.find(users, { id: parent.lenderId });
      }
    },
    debtor: {
      type: UserType,
      resolve(parent, args) {
        return _.find(users, { id: parent.debtorId });
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
        return _.find(users, { id: args.id });
      }
    },
    expense: {
      type: ExpenseType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(expenses, { id: args.id });
      }
    },
    debt: {
      type: new GraphQLList(DebtType),
      args: { id: { type: GraphQLID }, lenderId: { type: GraphQLID }, debtorId: { type: GraphQLID } },
      resolve(parent, args) {
        let params = { id = null, lenderId = null, debtorId = null } = args;
        return _.filter(debts, params);
      }
    },
    expenses: {
      type: new GraphQLList(ExpenseType),
      resolve(parent, args) {
        return _.filter(expenses, {});
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return _.filter(users, {});
      }
    },
    debts: {
      type: new GraphQLList(DebtType),
      resolve(parent, args) {
        return _.filter(debts, {});
      }
    },
    moneyOwedPersonal: {
      type: MoneyOwedType,
      args: { lenderId: { type: GraphQLID }, debtorId: { type: GraphQLID } },
      resolve(parent, args) {
        let { lenderId, debtorId } = args;
        let owed = _.find(moneyOwed, { lenderId, debtorId });
        let owedBack = _.find(moneyOwed, { lenderId: debtorId, debtorId: lenderId });
        if (owed.amount > owedBack.amount) {
          return {
            lenderId,
            debtorId,
            amount: owed.amount - owedBack.amount
          }
        } else {
          return {
            lenderId: debtorId,
            debtorId: lenderId,
            amount: owedBack.amount - owed.amount
          }
        }
      }
    },
    moneyOwed: {
      type: new GraphQLList(MoneyOwedType),
      resolve(parent, args) {
        return _.filter(moneyOwed, {});
      }
    },
    moneyOwedCalculated: {
      type: GraphQLList(MoneyOwedType),
      resolve(parent, args) {
        let moneyOwedCopy = [...moneyOwed];
        let result = [];
        for (const owe of moneyOwedCopy) {
          let { lenderId, debtorId } = owe;
          let owedBack = _.find(moneyOwedCopy, { lenderId: debtorId, debtorId: lenderId });
          let index = _.indexOf(moneyOwedCopy, owedBack);
          moneyOwedCopy.splice(index, 1);
          if (owe.amount > owedBack.amount) {
            result.push({
              lenderId,
              debtorId,
              amount: owe.amount - owedBack.amount
            });
          } else {
            result.push({
              lenderId: debtorId,
              debtorId: lenderId,
              amount: owedBack.amount - owe.amount
            });
          }
        }
        return result;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
})