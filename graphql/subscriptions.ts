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

export const ADD_NEW_CHAT_SUB = gql`
  subscription AddNewChat($userID: String!) {
    addNewChat(userID: $userID) {
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
