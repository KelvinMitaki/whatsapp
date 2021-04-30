import gql from "graphql-tag";

export const REGISTER_USER = gql`
  mutation RegisterUser(
    $name: String!
    $about: String!
    $phoneNumber: Int!
    $countryCode: String!
    $groups: [String!]!
  ) {
    registerUser(
      values: {
        name: $name
        about: $about
        phoneNumber: $phoneNumber
        countryCode: $countryCode
        groups: $groups
      }
    ) {
      token
    }
  }
`;