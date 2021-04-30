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

export const FETCH_CURRENT_USER = gql`
  query {
    fetchCurrentUser {
      _id
      name
      about
      phoneNumber
      countryCode
      profilePhoto
      groups
      createdAt
    }
  }
`;

export const FETCH_CHATS = gql`
  query {
    fetchChats {
      _id
      sender
      recipient
      message
      createdAt
      updatedAt
    }
  }
`;
