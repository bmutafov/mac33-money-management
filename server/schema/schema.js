const graphql = require('graphql');

const { RootQuery } = require('./query/query');
const { Mutation } = require('./query/mutation');

const { GraphQLSchema } = graphql;

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
})