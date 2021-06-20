import gql from 'graphql-tag';

export const ADD_NEW_MESSAGE_SUB = gql`
  subscription AddNewMessageSub($sender: String!, $recipient: String!) {
    addNewMessage(sender: $sender, recipient: $recipient) {
      _id
      sender
      recipient
      message
      read
      createdAt
      deleted
      starredBy
    }
  }
`;

export const ADD_NEW_CHAT_SUB = gql`
  subscription AddNewChatSub($userID: String!) {
    addNewChat(userID: $userID) {
      chat {
        _id
        sender {
          _id
          name
          typing
          lastSeen
          online
        }
        recipient {
          _id
          name
          typing
          lastSeen
          online
        }
        message
        createdAt
        updatedAt
        unread
        type
      }
      message {
        _id
        sender
        recipient
        message
        read
        createdAt
        deleted
        starredBy
      }
    }
  }
`;

export const ADD_NEW_GROUP_SUB = gql`
  subscription AddNewGroupSub($userID: String!) {
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
  subscription AddNewGroupMsgSub($groupID: String!) {
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
      starredBy
    }
  }
`;

export const UPDATE_USER_ONLINE_SUB = gql`
  subscription UpdateUserOnlineSub {
    updateUserOnline {
      userID
      online
    }
  }
`;

export const UPDATE_USER_TYPING_SUB = gql`
  subscription UpdateUserTypingSub($chatID: String!) {
    updateUserTyping(chatID: $chatID) {
      chatID
      typing
      typingUserID
    }
  }
`;

export const UPDATE_GROUP_TYPING_SUB = gql`
  subscription UpdateGroupTypingSub($groupID: String!) {
    updateGroupTyping(groupID: $groupID) {
      groupID
      typing
      typingUserID
    }
  }
`;

export const UPDATE_READ_MESSAGES_SUB = gql`
  subscription UpdateReadMessagesSub($sender: String!, $recipient: String!) {
    updateReadMessages(sender: $sender, recipient: $recipient) {
      _id
      sender
      recipient
      message
      read
      createdAt
      deleted
      starredBy
    }
  }
`;
