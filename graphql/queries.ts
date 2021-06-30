import gql from 'graphql-tag';

export const FETCH_USERS = gql`
  query FetchUsers {
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
  query FetchCurrentUser {
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
  query FetchChats {
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
      chatID
      read
      createdAt
      deleted
      starredBy
    }
  }
`;

export const FETCH_GROUPS = gql`
  query FetchGroups {
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
  query FetchUnreadGroupMsgs {
    fetchUnreadGroupMsgs {
      messageCount
      group
    }
  }
`;

export const FETCH_STARRED_MESSAGES = gql`
  query FetchStarredMsgs {
    fetchStarredMsgs {
      messages {
        _id
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
        _id
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

export const FETCH_MESSAGES_COUNT = gql`
  query FetchMessagesCount($userIDs: [String!]!) {
    fetchMessagesCount(userIDs: $userIDs) {
      messageCount
      chatID
    }
  }
`;

export const FETCH_GROUP_MESSAGES_COUNT = gql`
  query FetchGroupMessagesCount {
    fetchGroupMessagesCount {
      messageCount
      groupID
    }
  }
`;
