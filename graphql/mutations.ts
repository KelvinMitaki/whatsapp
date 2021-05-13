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

export const ADD_NEW_GROUP_MSG = gql`
  mutation AddNewGroupMsg($group: String!, $message: String!) {
    addNewGroupMsg(group: $group, message: $message) {
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
    }
  }
`;

export const UPDATE_GROUP_MESSAGES_READ = gql`
  mutation UpdateGroupMessagesRead($messageIDs: [String!]!, $groupID: String!) {
    updateGroupMessagesRead(messageIDs: $messageIDs, groupID: $groupID) {
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

export const UPDATE_USER_ONLINE = gql`
  mutation UpdateUserOnline($online: Boolean!) {
    updateUserOnline(online: $online) {
      userID
      online
    }
  }
`;

export const UPDATE_USER_TYPING = gql`
  mutation UpdateUserTyping($typing: Boolean!, $chatID: String!, $typingUserID: String!) {
    updateUserTyping(typing: $typing, chatID: $chatID, typingUserID: $typingUserID) {
      chatID
      typing
      typingUserID
    }
  }
`;

export const UPDATE_GROUP_TYPING = gql`
  mutation UpdateGroupTyping($groupID: String!, $typing: Boolean!, $typingUserID: String!) {
    updateGroupTyping(groupID: $groupID, typing: $typing, typingUserID: $typingUserID) {
      groupID
      typing
      typingUserID
    }
  }
`;

export const ADD_STARRED_MESSAGE = gql`
  mutation AddStarredMessage($message: String, $groupMsg: String) {
    addStarredMessage(message: $message, groupMsg: $groupMsg) {
      message {
        _id
        message
        sender {
          _id
          name
          profilePhoto
        }
        recipient {
          _id
          name
          profilePhoto
        }
      }
      groupMsg {
        _id
        read
        received
        createdAt
        group
        message
        sender {
          _id
          name
          profilePhoto
        }
      }
    }
  }
`;
