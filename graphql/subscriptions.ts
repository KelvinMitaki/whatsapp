import gql from "graphql-tag";

export const ADD_NEW_MESSAGE_SUB = gql`
  subscription AddNewMessage($sender: String!, $recipient: String!) {
    addNewMessage(sender: $sender, recipient: $recipient) {
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
