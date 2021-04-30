import gql from "graphql-tag";

export const FETCH_USERS = gql`
  query {
    fetchUsers {
      _id
      name
      phoneNumber
    }
  }
`;
