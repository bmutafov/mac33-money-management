import { gql } from 'apollo-boost';

const getUsersQuery = gql`
  {
    users {
      id
      name
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

export { getUsersQuery, addUserMutation };
