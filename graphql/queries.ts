import gql from "graphql-tag";

export const FETCH_USERS = gql`
  query {
    fetchCurrentUser {
      _id
      name
      about
      phoneNumber
      countryCode
      profilePhoto
      groups {
        _id
        name
        groupProfilePhoto
        message
      }
      createdAt
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
      sender {
        _id
        name
      }
      recipient {
        _id
        name
      }
      message
      createdAt
      updatedAt
      unread
      type
    }
  }
`;
