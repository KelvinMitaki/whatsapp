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
      typing
      lastSeen
      online
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
      typing
      lastSeen
      online
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
      starredBy
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
  query FetchGroupMsgs($groupID: String!, $offset: Int!, $limit: Int!, $messageCount: Int!) {
    fetchGroupMsgs(groupID: $groupID, offset: $offset, limit: $limit, messageCount: $messageCount) {
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

export const FETCH_UNREAD_GROUP_MSGS = gql`
  query {
    fetchUnreadGroupMsgs {
      messageCount
      group
    }
  }
`;

export const FETCH_GROUP_MSG_COUNT = gql`
  query FetchGroupMessageCount($groupID: String!) {
    fetchGroupMessageCount(groupID: $groupID) {
      count
    }
  }
`;

export const FETCH_STARRED_MESSAGES = gql`
  query {
    fetchStarredMsgs {
      messages {
        sender {
          _id
          profilePhoto
          name
        }
        recipient {
          _id
          name
        }
        message
        read
        deleted
        received
        createdAt
      }
      groupMsgs {
        sender {
          _id
          profilePhoto
          name
        }
        group {
          _id
          name
        }
        message
        read
        deleted
        received
        createdAt
      }
    }
  }
`;
