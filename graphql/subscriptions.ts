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

export const ADD_NEW_GROUP_SUB = gql`
  subscription AddNewGroup($userID: String!) {
    addNewGroup(userID: $userID) {
      _id
      name
      description
      groupProfilePhoto
      admin
      message {
        _id
        sender {
          _id
          name
          countryCode
          phoneNumber
        }
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

export const ADD_NEW_GROUP_MSG_SUB = gql`
  subscription AddNewGroupMsg($groupID: String!) {
    addNewGroupMsg(groupID: $groupID) {
      _id
      sender {
        _id
        phoneNumber
        profilePhoto
        countryCode
        name
      }
      message
      createdAt
      read
      received
      deleted
      group
    }
  }
`;

export const UPDATE_GROUP_READ_SUB = gql`
  subscription UpdatedGroupRead($userID: String!) {
    updatedGroupRead(userID: $userID) {
      _id
      name
      description
      groupProfilePhoto
      admin
      message {
        _id
        sender {
          _id
          name
          countryCode
          phoneNumber
        }
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
