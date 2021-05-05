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

export const ADD_NEW_MESSAGE = gql`
  mutation AddNewMessage($recipient: String!, $message: String!) {
    addNewMessage(recipient: $recipient, message: $message) {
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

export const UPDATE_READ_MESSAGES = gql`
  mutation UpdateReadMessages($messageIDs: [String!]!, $chatID: String!) {
    updateReadMessages(messageIDs: $messageIDs, chatID: $chatID) {
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

export const ADD_NEW_GROUP = gql`
  mutation AddNewGroup($name: String!, $participants: [String!]!) {
    addNewGroup(name: $name, participants: $participants) {
      _id
      name
      description
      groupProfilePhoto
      admin
      message {
        _id
        sender
        message
        group
        read
        deleted
        received
        createdAt
      }
      participants
      createdAt
    }
  }
`;
