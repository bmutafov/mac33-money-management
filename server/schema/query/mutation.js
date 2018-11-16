const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLFloat
} = graphql;

// Types
const { UserType, ExpenseType, DebtType, MoneyOwedType } = require('../types/types');

// Models
const Debt = require('../../models/Debt');
const User = require('../../models/User');
const Expense = require('../../models/Expense');
const MoneyOwed = require('../../models/MoneyOwed');

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
    },
    payDebts: {
      type: MoneyOwedType,
      args: {
        lenderId: { type: GraphQLID },
        debtorId: { type: GraphQLID },
        amount: { type: GraphQLFloat },
      },
      resolve(parent, args) {
        let { lenderId, debtorId, amount } = args;
        return MoneyOwed.findOneAndUpdate(
          { lenderId: debtorId, debtorId: lenderId },
          { $inc: { amount: amount } },
          {
            returnNewDocument: true,
            // upsert: true, POSSIBLY IMPLEMENT THIS INSTEAD OF ADDING ROWS IN USER INSERTION
          });
      }
    }
  }
});

module.exports = {
  Mutation
};
