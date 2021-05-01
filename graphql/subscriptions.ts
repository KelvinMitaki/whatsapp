import gql from "graphql-tag";

export const ADD_NEW_MESSAGE_SUB = gql`
  subscription {
    addNewMessage {
      _id
      sender
      recipient
      message
      read
      createdAt
      deleted
    }
  }
`;
