import gql from "graphql-tag";

export const FETCH_USERS = gql`
  query {
    fetchUsers {
      _id
      name
      phoneNumber
      about
      countryCode
      profilePhoto
      groups {
        _id
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
      groups {
        _id
        name
        groupProfilePhoto
      }
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

export const FETCH_MESSAGES = gql`
  query FetchMessages($recipient: String!, $offset: Int!, $limit: Int!, $messageCount: Int!) {
    fetchMessages(
      recipient: $recipient
      offset: $offset
      limit: $limit
      messageCount: $messageCount
    ) {
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

export const FETCH_MESSAGE_COUNT = gql`
  query FetchMessageCount($recipient: String!) {
    fetchMessageCount(recipient: $recipient) {
      count
    }
  }
`;

export const FETCH_GROUPS = gql`
  query {
    fetchGroups {
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

export const FETCH_GROUP_MSGS = gql`
  query FetchGroupMsgs($groupID: String!) {
    fetchGroupMsgs(groupID: $groupID) {
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

export const FETCH_GROUP = gql`
  query FetchGroup($groupID: String!) {
    fetchGroup(groupID: $groupID) {
      _id
      name
      description
      groupProfilePhoto
      admin
      createdAt
      participants {
        _id
        profilePhoto
        name
        countryCode
        phoneNumber
        about
      }
    }
  }
`;
