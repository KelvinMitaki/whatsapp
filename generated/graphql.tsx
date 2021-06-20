import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Chat = {
  __typename?: 'Chat';
  _id: Scalars['String'];
  sender: User;
  recipient: User;
  message: Scalars['String'];
  type: Scalars['String'];
  unread: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type ChatWithMessage = {
  __typename?: 'ChatWithMessage';
  chat: Chat;
  message: Message;
};

export type Count = {
  __typename?: 'Count';
  count: Scalars['Int'];
};

export type Group = {
  __typename?: 'Group';
  _id: Scalars['String'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  groupProfilePhoto?: Maybe<Scalars['String']>;
  admin: Scalars['String'];
  message?: Maybe<GroupMsg>;
  participants: Array<Scalars['String']>;
  createdAt: Scalars['String'];
};

export type GroupMessageCount = {
  __typename?: 'GroupMessageCount';
  messageCount: Scalars['Int'];
  groupID: Scalars['String'];
};

export type GroupMsg = {
  __typename?: 'GroupMsg';
  _id: Scalars['String'];
  sender: User;
  message: Scalars['String'];
  group: Scalars['String'];
  read: Array<Scalars['String']>;
  deleted?: Maybe<Scalars['Boolean']>;
  received: Array<Scalars['String']>;
  createdAt: Scalars['String'];
  starredBy?: Maybe<Array<Scalars['String']>>;
};

export type GroupMsgPopulated = {
  __typename?: 'GroupMsgPopulated';
  _id: Scalars['String'];
  sender: User;
  message: Scalars['String'];
  group: Group;
  read: Array<Scalars['String']>;
  deleted?: Maybe<Scalars['Boolean']>;
  received: Array<Scalars['String']>;
  createdAt: Scalars['String'];
};

export type GroupTyping = {
  __typename?: 'GroupTyping';
  groupID: Scalars['String'];
  typingUserID: Scalars['String'];
  typing: Scalars['Boolean'];
};

export type GroupWithParticipants = {
  __typename?: 'GroupWithParticipants';
  _id: Scalars['String'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  groupProfilePhoto?: Maybe<Scalars['String']>;
  admin: Scalars['String'];
  participants: Array<User>;
  createdAt: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  _id: Scalars['String'];
  sender: Scalars['String'];
  recipient: Scalars['String'];
  message: Scalars['String'];
  chatID: Scalars['String'];
  read: Scalars['Boolean'];
  deleted: Scalars['Boolean'];
  received: Scalars['Boolean'];
  starredBy?: Maybe<Array<Scalars['String']>>;
  createdAt: Scalars['String'];
};

export type MessageCount = {
  __typename?: 'MessageCount';
  messageCount: Scalars['Int'];
  chatID: Scalars['String'];
};

export type MessagePopulated = {
  __typename?: 'MessagePopulated';
  _id: Scalars['String'];
  sender: User;
  recipient: User;
  message: Scalars['String'];
  read: Scalars['Boolean'];
  deleted: Scalars['Boolean'];
  received: Scalars['Boolean'];
  createdAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  registerUser: Token;
  addNewMessage: Message;
  addNewGroup: Group;
  addNewGroupMsg?: Maybe<GroupMsg>;
  deleteMessage?: Maybe<Message>;
  deleteGroupMsg?: Maybe<GroupMsg>;
  updateUser?: Maybe<User>;
  updateReadMessages: Array<Message>;
  updateGroupMessagesRead: Array<GroupMsg>;
  deleteAll: Token;
  updateUserTyping: UserTyping;
  updateGroupTyping: GroupTyping;
  updateUserOnline: UserOnline;
  addStarredMessages: Array<Message>;
  removeStarredMessages: Array<Message>;
  addStarredGroupMessages: Array<GroupMsg>;
  removeStarredGroupMessages: Array<GroupMsg>;
};


export type MutationRegisterUserArgs = {
  values: RegisterUserInput;
};


export type MutationAddNewMessageArgs = {
  recipient: Scalars['String'];
  message: Scalars['String'];
};


export type MutationAddNewGroupArgs = {
  name: Scalars['String'];
  participants: Array<Scalars['String']>;
};


export type MutationAddNewGroupMsgArgs = {
  group: Scalars['String'];
  message: Scalars['String'];
};


export type MutationDeleteMessageArgs = {
  messageID: Scalars['String'];
};


export type MutationDeleteGroupMsgArgs = {
  messageID: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  name?: Maybe<Scalars['String']>;
  about?: Maybe<Scalars['String']>;
  profilePhoto?: Maybe<Scalars['String']>;
};


export type MutationUpdateReadMessagesArgs = {
  messageIDs: Array<Scalars['String']>;
  chatID: Scalars['String'];
};


export type MutationUpdateGroupMessagesReadArgs = {
  messageIDs: Array<Scalars['String']>;
  groupID: Scalars['String'];
};


export type MutationUpdateUserTypingArgs = {
  typing: Scalars['Boolean'];
  chatID: Scalars['String'];
  typingUserID: Scalars['String'];
};


export type MutationUpdateGroupTypingArgs = {
  typing: Scalars['Boolean'];
  groupID: Scalars['String'];
  typingUserID: Scalars['String'];
};


export type MutationUpdateUserOnlineArgs = {
  online: Scalars['Boolean'];
};


export type MutationAddStarredMessagesArgs = {
  messageIDs: Array<Scalars['String']>;
};


export type MutationRemoveStarredMessagesArgs = {
  messageIDs: Array<Scalars['String']>;
};


export type MutationAddStarredGroupMessagesArgs = {
  groupMsgIDs: Array<Scalars['String']>;
};


export type MutationRemoveStarredGroupMessagesArgs = {
  groupMsgIDs: Array<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  fetchUsers: Array<User>;
  fetchGroups: Array<Group>;
  fetchGroup: GroupWithParticipants;
  fetchMessages: Array<Message>;
  fetchGroupMessageCount: Count;
  fetchGroupMsgs: Array<GroupMsg>;
  fetchUnreadGroupMsgs: Array<UnreadGroupMsg>;
  fetchChats: Array<Chat>;
  fetchCurrentUser: User;
  fetchStarredMsgs: StarredMsgs;
  fetchMessagesCount: Array<MessageCount>;
  fetchGroupMessagesCount: Array<GroupMessageCount>;
};


export type QueryFetchGroupArgs = {
  groupID: Scalars['String'];
};


export type QueryFetchMessagesArgs = {
  recipient: Scalars['String'];
  offset: Scalars['Int'];
  limit: Scalars['Int'];
  messageCount: Scalars['Int'];
};


export type QueryFetchGroupMessageCountArgs = {
  groupID: Scalars['String'];
};


export type QueryFetchGroupMsgsArgs = {
  groupID: Scalars['String'];
  offset: Scalars['Int'];
  limit: Scalars['Int'];
  messageCount: Scalars['Int'];
};


export type QueryFetchMessagesCountArgs = {
  userIDs: Array<Scalars['String']>;
};

export type RegisterUserInput = {
  name: Scalars['String'];
  about: Scalars['String'];
  phoneNumber: Scalars['Int'];
  countryCode: Scalars['String'];
  profilePhoto?: Maybe<Scalars['String']>;
  groups: Array<Scalars['String']>;
};

export type StarredMsgs = {
  __typename?: 'StarredMsgs';
  messages: Array<MessagePopulated>;
  groupMsgs: Array<GroupMsgPopulated>;
};

export type Subscription = {
  __typename?: 'Subscription';
  addNewMessage: Message;
  addNewGroup: Group;
  addNewChat: ChatWithMessage;
  addNewGroupMsg: GroupMsg;
  deleteMessage: Message;
  deleteGroupMsg: GroupMsg;
  updateUserTyping: UserTyping;
  updateGroupTyping: GroupTyping;
  updateUserOnline: UserOnline;
  updateReadMessages: Array<Message>;
};


export type SubscriptionAddNewMessageArgs = {
  sender: Scalars['String'];
  recipient: Scalars['String'];
};


export type SubscriptionAddNewGroupArgs = {
  userID: Scalars['String'];
};


export type SubscriptionAddNewChatArgs = {
  userID: Scalars['String'];
};


export type SubscriptionAddNewGroupMsgArgs = {
  groupID: Scalars['String'];
};


export type SubscriptionUpdateUserTypingArgs = {
  chatID: Scalars['String'];
};


export type SubscriptionUpdateGroupTypingArgs = {
  groupID: Scalars['String'];
};


export type SubscriptionUpdateReadMessagesArgs = {
  sender: Scalars['String'];
  recipient: Scalars['String'];
};

export type Token = {
  __typename?: 'Token';
  token: Scalars['String'];
};

export type UnreadGroupMsg = {
  __typename?: 'UnreadGroupMsg';
  messageCount: Scalars['Int'];
  group: Scalars['String'];
};

export type UpdatedGroupRead = {
  __typename?: 'UpdatedGroupRead';
  groupCount: UnreadGroupMsg;
  userID: Scalars['String'];
};


export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  name: Scalars['String'];
  about: Scalars['String'];
  phoneNumber: Scalars['Int'];
  countryCode: Scalars['String'];
  profilePhoto?: Maybe<Scalars['String']>;
  groups: Array<Group>;
  createdAt: Scalars['String'];
  typing: Scalars['Boolean'];
  online: Scalars['Boolean'];
  lastSeen: Scalars['String'];
};

export type UserOnline = {
  __typename?: 'UserOnline';
  userID: Scalars['String'];
  online: Scalars['Boolean'];
};

export type UserTyping = {
  __typename?: 'UserTyping';
  chatID: Scalars['String'];
  typingUserID: Scalars['String'];
  typing: Scalars['Boolean'];
};

export type RegisterUserMutationVariables = Exact<{
  name: Scalars['String'];
  about: Scalars['String'];
  phoneNumber: Scalars['Int'];
  countryCode: Scalars['String'];
  groups: Array<Scalars['String']> | Scalars['String'];
}>;


export type RegisterUserMutation = (
  { __typename?: 'Mutation' }
  & { registerUser: (
    { __typename?: 'Token' }
    & Pick<Token, 'token'>
  ) }
);

export type AddNewMessageMutationVariables = Exact<{
  recipient: Scalars['String'];
  message: Scalars['String'];
}>;


export type AddNewMessageMutation = (
  { __typename?: 'Mutation' }
  & { addNewMessage: (
    { __typename?: 'Message' }
    & Pick<Message, '_id' | 'sender' | 'recipient' | 'message' | 'read' | 'chatID' | 'createdAt' | 'deleted' | 'starredBy'>
  ) }
);

export type UpdateReadMessagesMutationVariables = Exact<{
  messageIDs: Array<Scalars['String']> | Scalars['String'];
  chatID: Scalars['String'];
}>;


export type UpdateReadMessagesMutation = (
  { __typename?: 'Mutation' }
  & { updateReadMessages: Array<(
    { __typename?: 'Message' }
    & Pick<Message, '_id' | 'sender' | 'recipient' | 'message' | 'read' | 'chatID' | 'createdAt' | 'deleted'>
  )> }
);

export type AddNewGroupMutationVariables = Exact<{
  name: Scalars['String'];
  participants: Array<Scalars['String']> | Scalars['String'];
}>;


export type AddNewGroupMutation = (
  { __typename?: 'Mutation' }
  & { addNewGroup: (
    { __typename?: 'Group' }
    & Pick<Group, '_id' | 'name' | 'description' | 'groupProfilePhoto' | 'admin' | 'participants' | 'createdAt'>
    & { message?: Maybe<(
      { __typename?: 'GroupMsg' }
      & Pick<GroupMsg, '_id' | 'message' | 'group' | 'read' | 'deleted' | 'received' | 'createdAt'>
      & { sender: (
        { __typename?: 'User' }
        & Pick<User, '_id' | 'name' | 'countryCode' | 'phoneNumber'>
      ) }
    )> }
  ) }
);

export type AddNewGroupMsgMutationVariables = Exact<{
  group: Scalars['String'];
  message: Scalars['String'];
}>;


export type AddNewGroupMsgMutation = (
  { __typename?: 'Mutation' }
  & { addNewGroupMsg?: Maybe<(
    { __typename?: 'GroupMsg' }
    & Pick<GroupMsg, '_id' | 'message' | 'createdAt' | 'read' | 'received' | 'deleted' | 'group' | 'starredBy'>
    & { sender: (
      { __typename?: 'User' }
      & Pick<User, '_id' | 'phoneNumber' | 'profilePhoto' | 'countryCode' | 'name'>
    ) }
  )> }
);

export type UpdateGroupMessagesReadMutationVariables = Exact<{
  messageIDs: Array<Scalars['String']> | Scalars['String'];
  groupID: Scalars['String'];
}>;


export type UpdateGroupMessagesReadMutation = (
  { __typename?: 'Mutation' }
  & { updateGroupMessagesRead: Array<(
    { __typename?: 'GroupMsg' }
    & Pick<GroupMsg, '_id' | 'message' | 'createdAt' | 'read' | 'received' | 'deleted' | 'group'>
    & { sender: (
      { __typename?: 'User' }
      & Pick<User, '_id' | 'phoneNumber' | 'profilePhoto' | 'countryCode' | 'name'>
    ) }
  )> }
);

export type UpdateUserOnlineMutationVariables = Exact<{
  online: Scalars['Boolean'];
}>;


export type UpdateUserOnlineMutation = (
  { __typename?: 'Mutation' }
  & { updateUserOnline: (
    { __typename?: 'UserOnline' }
    & Pick<UserOnline, 'userID' | 'online'>
  ) }
);

export type UpdateUserTypingMutationVariables = Exact<{
  typing: Scalars['Boolean'];
  chatID: Scalars['String'];
  typingUserID: Scalars['String'];
}>;


export type UpdateUserTypingMutation = (
  { __typename?: 'Mutation' }
  & { updateUserTyping: (
    { __typename?: 'UserTyping' }
    & Pick<UserTyping, 'chatID' | 'typing' | 'typingUserID'>
  ) }
);

export type UpdateGroupTypingMutationVariables = Exact<{
  groupID: Scalars['String'];
  typing: Scalars['Boolean'];
  typingUserID: Scalars['String'];
}>;


export type UpdateGroupTypingMutation = (
  { __typename?: 'Mutation' }
  & { updateGroupTyping: (
    { __typename?: 'GroupTyping' }
    & Pick<GroupTyping, 'groupID' | 'typing' | 'typingUserID'>
  ) }
);

export type AddStarredMessagesMutationVariables = Exact<{
  messageIDs: Array<Scalars['String']> | Scalars['String'];
}>;


export type AddStarredMessagesMutation = (
  { __typename?: 'Mutation' }
  & { addStarredMessages: Array<(
    { __typename?: 'Message' }
    & Pick<Message, '_id' | 'sender' | 'recipient' | 'message' | 'chatID' | 'read' | 'createdAt' | 'deleted' | 'starredBy'>
  )> }
);

export type RemoveStarredMessagesMutationVariables = Exact<{
  messageIDs: Array<Scalars['String']> | Scalars['String'];
}>;


export type RemoveStarredMessagesMutation = (
  { __typename?: 'Mutation' }
  & { removeStarredMessages: Array<(
    { __typename?: 'Message' }
    & Pick<Message, '_id' | 'sender' | 'recipient' | 'message' | 'chatID' | 'read' | 'createdAt' | 'deleted' | 'starredBy'>
  )> }
);

export type AddStarredGroupMessagesMutationVariables = Exact<{
  groupMsgIDs: Array<Scalars['String']> | Scalars['String'];
}>;


export type AddStarredGroupMessagesMutation = (
  { __typename?: 'Mutation' }
  & { addStarredGroupMessages: Array<(
    { __typename?: 'GroupMsg' }
    & Pick<GroupMsg, '_id' | 'message' | 'createdAt' | 'read' | 'received' | 'deleted' | 'group' | 'starredBy'>
    & { sender: (
      { __typename?: 'User' }
      & Pick<User, '_id' | 'phoneNumber' | 'profilePhoto' | 'countryCode' | 'name'>
    ) }
  )> }
);

export type RemoveStarredGroupMessagesMutationVariables = Exact<{
  groupMsgIDs: Array<Scalars['String']> | Scalars['String'];
}>;


export type RemoveStarredGroupMessagesMutation = (
  { __typename?: 'Mutation' }
  & { removeStarredGroupMessages: Array<(
    { __typename?: 'GroupMsg' }
    & Pick<GroupMsg, '_id' | 'message' | 'createdAt' | 'read' | 'received' | 'deleted' | 'group' | 'starredBy'>
    & { sender: (
      { __typename?: 'User' }
      & Pick<User, '_id' | 'phoneNumber' | 'profilePhoto' | 'countryCode' | 'name'>
    ) }
  )> }
);

export type FetchUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchUsersQuery = (
  { __typename?: 'Query' }
  & { fetchUsers: Array<(
    { __typename?: 'User' }
    & Pick<User, '_id' | 'name' | 'phoneNumber' | 'about' | 'countryCode' | 'profilePhoto' | 'createdAt' | 'typing' | 'lastSeen' | 'online'>
    & { groups: Array<(
      { __typename?: 'Group' }
      & Pick<Group, '_id'>
    )> }
  )> }
);

export type FetchCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchCurrentUserQuery = (
  { __typename?: 'Query' }
  & { fetchCurrentUser: (
    { __typename?: 'User' }
    & Pick<User, '_id' | 'name' | 'about' | 'phoneNumber' | 'countryCode' | 'profilePhoto' | 'createdAt' | 'typing' | 'lastSeen' | 'online'>
    & { groups: Array<(
      { __typename?: 'Group' }
      & Pick<Group, '_id' | 'name' | 'groupProfilePhoto'>
    )> }
  ) }
);

export type FetchChatsQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchChatsQuery = (
  { __typename?: 'Query' }
  & { fetchChats: Array<(
    { __typename?: 'Chat' }
    & Pick<Chat, '_id' | 'message' | 'createdAt' | 'updatedAt' | 'unread' | 'type'>
    & { sender: (
      { __typename?: 'User' }
      & Pick<User, '_id' | 'name' | 'typing' | 'lastSeen' | 'online'>
    ), recipient: (
      { __typename?: 'User' }
      & Pick<User, '_id' | 'name' | 'typing' | 'lastSeen' | 'online'>
    ) }
  )> }
);

export type FetchMessagesQueryVariables = Exact<{
  recipient: Scalars['String'];
  offset: Scalars['Int'];
  limit: Scalars['Int'];
  messageCount: Scalars['Int'];
}>;


export type FetchMessagesQuery = (
  { __typename?: 'Query' }
  & { fetchMessages: Array<(
    { __typename?: 'Message' }
    & Pick<Message, '_id' | 'sender' | 'recipient' | 'message' | 'chatID' | 'read' | 'createdAt' | 'deleted' | 'starredBy'>
  )> }
);

export type FetchGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchGroupsQuery = (
  { __typename?: 'Query' }
  & { fetchGroups: Array<(
    { __typename?: 'Group' }
    & Pick<Group, '_id' | 'name' | 'description' | 'groupProfilePhoto' | 'admin' | 'participants' | 'createdAt'>
    & { message?: Maybe<(
      { __typename?: 'GroupMsg' }
      & Pick<GroupMsg, '_id' | 'message' | 'group' | 'read' | 'deleted' | 'received' | 'createdAt'>
      & { sender: (
        { __typename?: 'User' }
        & Pick<User, '_id' | 'name' | 'countryCode' | 'phoneNumber'>
      ) }
    )> }
  )> }
);

export type FetchGroupMsgsQueryVariables = Exact<{
  groupID: Scalars['String'];
  offset: Scalars['Int'];
  limit: Scalars['Int'];
  messageCount: Scalars['Int'];
}>;


export type FetchGroupMsgsQuery = (
  { __typename?: 'Query' }
  & { fetchGroupMsgs: Array<(
    { __typename?: 'GroupMsg' }
    & Pick<GroupMsg, '_id' | 'message' | 'createdAt' | 'read' | 'received' | 'deleted' | 'group' | 'starredBy'>
    & { sender: (
      { __typename?: 'User' }
      & Pick<User, '_id' | 'phoneNumber' | 'profilePhoto' | 'countryCode' | 'name'>
    ) }
  )> }
);

export type FetchGroupQueryVariables = Exact<{
  groupID: Scalars['String'];
}>;


export type FetchGroupQuery = (
  { __typename?: 'Query' }
  & { fetchGroup: (
    { __typename?: 'GroupWithParticipants' }
    & Pick<GroupWithParticipants, '_id' | 'name' | 'description' | 'groupProfilePhoto' | 'admin' | 'createdAt'>
    & { participants: Array<(
      { __typename?: 'User' }
      & Pick<User, '_id' | 'profilePhoto' | 'name' | 'countryCode' | 'phoneNumber' | 'about'>
    )> }
  ) }
);

export type FetchUnreadGroupMsgsQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchUnreadGroupMsgsQuery = (
  { __typename?: 'Query' }
  & { fetchUnreadGroupMsgs: Array<(
    { __typename?: 'UnreadGroupMsg' }
    & Pick<UnreadGroupMsg, 'messageCount' | 'group'>
  )> }
);

export type FetchGroupMessageCountQueryVariables = Exact<{
  groupID: Scalars['String'];
}>;


export type FetchGroupMessageCountQuery = (
  { __typename?: 'Query' }
  & { fetchGroupMessageCount: (
    { __typename?: 'Count' }
    & Pick<Count, 'count'>
  ) }
);

export type FetchStarredMsgsQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchStarredMsgsQuery = (
  { __typename?: 'Query' }
  & { fetchStarredMsgs: (
    { __typename?: 'StarredMsgs' }
    & { messages: Array<(
      { __typename?: 'MessagePopulated' }
      & Pick<MessagePopulated, '_id' | 'message' | 'read' | 'deleted' | 'received' | 'createdAt'>
      & { sender: (
        { __typename?: 'User' }
        & Pick<User, '_id' | 'profilePhoto' | 'name'>
      ), recipient: (
        { __typename?: 'User' }
        & Pick<User, '_id' | 'name'>
      ) }
    )>, groupMsgs: Array<(
      { __typename?: 'GroupMsgPopulated' }
      & Pick<GroupMsgPopulated, '_id' | 'message' | 'read' | 'deleted' | 'received' | 'createdAt'>
      & { sender: (
        { __typename?: 'User' }
        & Pick<User, '_id' | 'profilePhoto' | 'name'>
      ), group: (
        { __typename?: 'Group' }
        & Pick<Group, '_id' | 'name'>
      ) }
    )> }
  ) }
);

export type FetchMessagesCountQueryVariables = Exact<{
  userIDs: Array<Scalars['String']> | Scalars['String'];
}>;


export type FetchMessagesCountQuery = (
  { __typename?: 'Query' }
  & { fetchMessagesCount: Array<(
    { __typename?: 'MessageCount' }
    & Pick<MessageCount, 'messageCount' | 'chatID'>
  )> }
);

export type FetchGroupMessagesCountQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchGroupMessagesCountQuery = (
  { __typename?: 'Query' }
  & { fetchGroupMessagesCount: Array<(
    { __typename?: 'GroupMessageCount' }
    & Pick<GroupMessageCount, 'messageCount' | 'groupID'>
  )> }
);

export type AddNewMessageSubSubscriptionVariables = Exact<{
  sender: Scalars['String'];
  recipient: Scalars['String'];
}>;


export type AddNewMessageSubSubscription = (
  { __typename?: 'Subscription' }
  & { addNewMessage: (
    { __typename?: 'Message' }
    & Pick<Message, '_id' | 'sender' | 'recipient' | 'message' | 'chatID' | 'read' | 'createdAt' | 'deleted' | 'starredBy'>
  ) }
);

export type AddNewChatSubSubscriptionVariables = Exact<{
  userID: Scalars['String'];
}>;


export type AddNewChatSubSubscription = (
  { __typename?: 'Subscription' }
  & { addNewChat: (
    { __typename?: 'ChatWithMessage' }
    & { chat: (
      { __typename?: 'Chat' }
      & Pick<Chat, '_id' | 'message' | 'createdAt' | 'updatedAt' | 'unread' | 'type'>
      & { sender: (
        { __typename?: 'User' }
        & Pick<User, '_id' | 'name' | 'typing' | 'lastSeen' | 'online'>
      ), recipient: (
        { __typename?: 'User' }
        & Pick<User, '_id' | 'name' | 'typing' | 'lastSeen' | 'online'>
      ) }
    ), message: (
      { __typename?: 'Message' }
      & Pick<Message, '_id' | 'sender' | 'recipient' | 'message' | 'chatID' | 'read' | 'createdAt' | 'deleted' | 'starredBy'>
    ) }
  ) }
);

export type AddNewGroupSubSubscriptionVariables = Exact<{
  userID: Scalars['String'];
}>;


export type AddNewGroupSubSubscription = (
  { __typename?: 'Subscription' }
  & { addNewGroup: (
    { __typename?: 'Group' }
    & Pick<Group, '_id' | 'name' | 'description' | 'groupProfilePhoto' | 'admin' | 'participants' | 'createdAt'>
    & { message?: Maybe<(
      { __typename?: 'GroupMsg' }
      & Pick<GroupMsg, '_id' | 'message' | 'group' | 'read' | 'deleted' | 'received' | 'createdAt'>
      & { sender: (
        { __typename?: 'User' }
        & Pick<User, '_id' | 'name' | 'countryCode' | 'phoneNumber'>
      ) }
    )> }
  ) }
);

export type AddNewGroupMsgSubSubscriptionVariables = Exact<{
  groupID: Scalars['String'];
}>;


export type AddNewGroupMsgSubSubscription = (
  { __typename?: 'Subscription' }
  & { addNewGroupMsg: (
    { __typename?: 'GroupMsg' }
    & Pick<GroupMsg, '_id' | 'message' | 'createdAt' | 'read' | 'received' | 'deleted' | 'group' | 'starredBy'>
    & { sender: (
      { __typename?: 'User' }
      & Pick<User, '_id' | 'phoneNumber' | 'profilePhoto' | 'countryCode' | 'name'>
    ) }
  ) }
);

export type UpdateUserOnlineSubSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type UpdateUserOnlineSubSubscription = (
  { __typename?: 'Subscription' }
  & { updateUserOnline: (
    { __typename?: 'UserOnline' }
    & Pick<UserOnline, 'userID' | 'online'>
  ) }
);

export type UpdateUserTypingSubSubscriptionVariables = Exact<{
  chatID: Scalars['String'];
}>;


export type UpdateUserTypingSubSubscription = (
  { __typename?: 'Subscription' }
  & { updateUserTyping: (
    { __typename?: 'UserTyping' }
    & Pick<UserTyping, 'chatID' | 'typing' | 'typingUserID'>
  ) }
);

export type UpdateGroupTypingSubSubscriptionVariables = Exact<{
  groupID: Scalars['String'];
}>;


export type UpdateGroupTypingSubSubscription = (
  { __typename?: 'Subscription' }
  & { updateGroupTyping: (
    { __typename?: 'GroupTyping' }
    & Pick<GroupTyping, 'groupID' | 'typing' | 'typingUserID'>
  ) }
);

export type UpdateReadMessagesSubSubscriptionVariables = Exact<{
  sender: Scalars['String'];
  recipient: Scalars['String'];
}>;


export type UpdateReadMessagesSubSubscription = (
  { __typename?: 'Subscription' }
  & { updateReadMessages: Array<(
    { __typename?: 'Message' }
    & Pick<Message, '_id' | 'sender' | 'recipient' | 'message' | 'chatID' | 'read' | 'createdAt' | 'deleted' | 'starredBy'>
  )> }
);


export const RegisterUserDocument = gql`
    mutation RegisterUser($name: String!, $about: String!, $phoneNumber: Int!, $countryCode: String!, $groups: [String!]!) {
  registerUser(
    values: {name: $name, about: $about, phoneNumber: $phoneNumber, countryCode: $countryCode, groups: $groups}
  ) {
    token
  }
}
    `;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      name: // value for 'name'
 *      about: // value for 'about'
 *      phoneNumber: // value for 'phoneNumber'
 *      countryCode: // value for 'countryCode'
 *      groups: // value for 'groups'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;
export const AddNewMessageDocument = gql`
    mutation AddNewMessage($recipient: String!, $message: String!) {
  addNewMessage(recipient: $recipient, message: $message) {
    _id
    sender
    recipient
    message
    read
    chatID
    createdAt
    deleted
    starredBy
  }
}
    `;
export type AddNewMessageMutationFn = Apollo.MutationFunction<AddNewMessageMutation, AddNewMessageMutationVariables>;

/**
 * __useAddNewMessageMutation__
 *
 * To run a mutation, you first call `useAddNewMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddNewMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addNewMessageMutation, { data, loading, error }] = useAddNewMessageMutation({
 *   variables: {
 *      recipient: // value for 'recipient'
 *      message: // value for 'message'
 *   },
 * });
 */
export function useAddNewMessageMutation(baseOptions?: Apollo.MutationHookOptions<AddNewMessageMutation, AddNewMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddNewMessageMutation, AddNewMessageMutationVariables>(AddNewMessageDocument, options);
      }
export type AddNewMessageMutationHookResult = ReturnType<typeof useAddNewMessageMutation>;
export type AddNewMessageMutationResult = Apollo.MutationResult<AddNewMessageMutation>;
export type AddNewMessageMutationOptions = Apollo.BaseMutationOptions<AddNewMessageMutation, AddNewMessageMutationVariables>;
export const UpdateReadMessagesDocument = gql`
    mutation UpdateReadMessages($messageIDs: [String!]!, $chatID: String!) {
  updateReadMessages(messageIDs: $messageIDs, chatID: $chatID) {
    _id
    sender
    recipient
    message
    read
    chatID
    createdAt
    deleted
  }
}
    `;
export type UpdateReadMessagesMutationFn = Apollo.MutationFunction<UpdateReadMessagesMutation, UpdateReadMessagesMutationVariables>;

/**
 * __useUpdateReadMessagesMutation__
 *
 * To run a mutation, you first call `useUpdateReadMessagesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateReadMessagesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateReadMessagesMutation, { data, loading, error }] = useUpdateReadMessagesMutation({
 *   variables: {
 *      messageIDs: // value for 'messageIDs'
 *      chatID: // value for 'chatID'
 *   },
 * });
 */
export function useUpdateReadMessagesMutation(baseOptions?: Apollo.MutationHookOptions<UpdateReadMessagesMutation, UpdateReadMessagesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateReadMessagesMutation, UpdateReadMessagesMutationVariables>(UpdateReadMessagesDocument, options);
      }
export type UpdateReadMessagesMutationHookResult = ReturnType<typeof useUpdateReadMessagesMutation>;
export type UpdateReadMessagesMutationResult = Apollo.MutationResult<UpdateReadMessagesMutation>;
export type UpdateReadMessagesMutationOptions = Apollo.BaseMutationOptions<UpdateReadMessagesMutation, UpdateReadMessagesMutationVariables>;
export const AddNewGroupDocument = gql`
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
export type AddNewGroupMutationFn = Apollo.MutationFunction<AddNewGroupMutation, AddNewGroupMutationVariables>;

/**
 * __useAddNewGroupMutation__
 *
 * To run a mutation, you first call `useAddNewGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddNewGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addNewGroupMutation, { data, loading, error }] = useAddNewGroupMutation({
 *   variables: {
 *      name: // value for 'name'
 *      participants: // value for 'participants'
 *   },
 * });
 */
export function useAddNewGroupMutation(baseOptions?: Apollo.MutationHookOptions<AddNewGroupMutation, AddNewGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddNewGroupMutation, AddNewGroupMutationVariables>(AddNewGroupDocument, options);
      }
export type AddNewGroupMutationHookResult = ReturnType<typeof useAddNewGroupMutation>;
export type AddNewGroupMutationResult = Apollo.MutationResult<AddNewGroupMutation>;
export type AddNewGroupMutationOptions = Apollo.BaseMutationOptions<AddNewGroupMutation, AddNewGroupMutationVariables>;
export const AddNewGroupMsgDocument = gql`
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
    group
    starredBy
  }
}
    `;
export type AddNewGroupMsgMutationFn = Apollo.MutationFunction<AddNewGroupMsgMutation, AddNewGroupMsgMutationVariables>;

/**
 * __useAddNewGroupMsgMutation__
 *
 * To run a mutation, you first call `useAddNewGroupMsgMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddNewGroupMsgMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addNewGroupMsgMutation, { data, loading, error }] = useAddNewGroupMsgMutation({
 *   variables: {
 *      group: // value for 'group'
 *      message: // value for 'message'
 *   },
 * });
 */
export function useAddNewGroupMsgMutation(baseOptions?: Apollo.MutationHookOptions<AddNewGroupMsgMutation, AddNewGroupMsgMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddNewGroupMsgMutation, AddNewGroupMsgMutationVariables>(AddNewGroupMsgDocument, options);
      }
export type AddNewGroupMsgMutationHookResult = ReturnType<typeof useAddNewGroupMsgMutation>;
export type AddNewGroupMsgMutationResult = Apollo.MutationResult<AddNewGroupMsgMutation>;
export type AddNewGroupMsgMutationOptions = Apollo.BaseMutationOptions<AddNewGroupMsgMutation, AddNewGroupMsgMutationVariables>;
export const UpdateGroupMessagesReadDocument = gql`
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
export type UpdateGroupMessagesReadMutationFn = Apollo.MutationFunction<UpdateGroupMessagesReadMutation, UpdateGroupMessagesReadMutationVariables>;

/**
 * __useUpdateGroupMessagesReadMutation__
 *
 * To run a mutation, you first call `useUpdateGroupMessagesReadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGroupMessagesReadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGroupMessagesReadMutation, { data, loading, error }] = useUpdateGroupMessagesReadMutation({
 *   variables: {
 *      messageIDs: // value for 'messageIDs'
 *      groupID: // value for 'groupID'
 *   },
 * });
 */
export function useUpdateGroupMessagesReadMutation(baseOptions?: Apollo.MutationHookOptions<UpdateGroupMessagesReadMutation, UpdateGroupMessagesReadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateGroupMessagesReadMutation, UpdateGroupMessagesReadMutationVariables>(UpdateGroupMessagesReadDocument, options);
      }
export type UpdateGroupMessagesReadMutationHookResult = ReturnType<typeof useUpdateGroupMessagesReadMutation>;
export type UpdateGroupMessagesReadMutationResult = Apollo.MutationResult<UpdateGroupMessagesReadMutation>;
export type UpdateGroupMessagesReadMutationOptions = Apollo.BaseMutationOptions<UpdateGroupMessagesReadMutation, UpdateGroupMessagesReadMutationVariables>;
export const UpdateUserOnlineDocument = gql`
    mutation UpdateUserOnline($online: Boolean!) {
  updateUserOnline(online: $online) {
    userID
    online
  }
}
    `;
export type UpdateUserOnlineMutationFn = Apollo.MutationFunction<UpdateUserOnlineMutation, UpdateUserOnlineMutationVariables>;

/**
 * __useUpdateUserOnlineMutation__
 *
 * To run a mutation, you first call `useUpdateUserOnlineMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserOnlineMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserOnlineMutation, { data, loading, error }] = useUpdateUserOnlineMutation({
 *   variables: {
 *      online: // value for 'online'
 *   },
 * });
 */
export function useUpdateUserOnlineMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserOnlineMutation, UpdateUserOnlineMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserOnlineMutation, UpdateUserOnlineMutationVariables>(UpdateUserOnlineDocument, options);
      }
export type UpdateUserOnlineMutationHookResult = ReturnType<typeof useUpdateUserOnlineMutation>;
export type UpdateUserOnlineMutationResult = Apollo.MutationResult<UpdateUserOnlineMutation>;
export type UpdateUserOnlineMutationOptions = Apollo.BaseMutationOptions<UpdateUserOnlineMutation, UpdateUserOnlineMutationVariables>;
export const UpdateUserTypingDocument = gql`
    mutation UpdateUserTyping($typing: Boolean!, $chatID: String!, $typingUserID: String!) {
  updateUserTyping(typing: $typing, chatID: $chatID, typingUserID: $typingUserID) {
    chatID
    typing
    typingUserID
  }
}
    `;
export type UpdateUserTypingMutationFn = Apollo.MutationFunction<UpdateUserTypingMutation, UpdateUserTypingMutationVariables>;

/**
 * __useUpdateUserTypingMutation__
 *
 * To run a mutation, you first call `useUpdateUserTypingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserTypingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserTypingMutation, { data, loading, error }] = useUpdateUserTypingMutation({
 *   variables: {
 *      typing: // value for 'typing'
 *      chatID: // value for 'chatID'
 *      typingUserID: // value for 'typingUserID'
 *   },
 * });
 */
export function useUpdateUserTypingMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserTypingMutation, UpdateUserTypingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserTypingMutation, UpdateUserTypingMutationVariables>(UpdateUserTypingDocument, options);
      }
export type UpdateUserTypingMutationHookResult = ReturnType<typeof useUpdateUserTypingMutation>;
export type UpdateUserTypingMutationResult = Apollo.MutationResult<UpdateUserTypingMutation>;
export type UpdateUserTypingMutationOptions = Apollo.BaseMutationOptions<UpdateUserTypingMutation, UpdateUserTypingMutationVariables>;
export const UpdateGroupTypingDocument = gql`
    mutation UpdateGroupTyping($groupID: String!, $typing: Boolean!, $typingUserID: String!) {
  updateGroupTyping(
    groupID: $groupID
    typing: $typing
    typingUserID: $typingUserID
  ) {
    groupID
    typing
    typingUserID
  }
}
    `;
export type UpdateGroupTypingMutationFn = Apollo.MutationFunction<UpdateGroupTypingMutation, UpdateGroupTypingMutationVariables>;

/**
 * __useUpdateGroupTypingMutation__
 *
 * To run a mutation, you first call `useUpdateGroupTypingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGroupTypingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGroupTypingMutation, { data, loading, error }] = useUpdateGroupTypingMutation({
 *   variables: {
 *      groupID: // value for 'groupID'
 *      typing: // value for 'typing'
 *      typingUserID: // value for 'typingUserID'
 *   },
 * });
 */
export function useUpdateGroupTypingMutation(baseOptions?: Apollo.MutationHookOptions<UpdateGroupTypingMutation, UpdateGroupTypingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateGroupTypingMutation, UpdateGroupTypingMutationVariables>(UpdateGroupTypingDocument, options);
      }
export type UpdateGroupTypingMutationHookResult = ReturnType<typeof useUpdateGroupTypingMutation>;
export type UpdateGroupTypingMutationResult = Apollo.MutationResult<UpdateGroupTypingMutation>;
export type UpdateGroupTypingMutationOptions = Apollo.BaseMutationOptions<UpdateGroupTypingMutation, UpdateGroupTypingMutationVariables>;
export const AddStarredMessagesDocument = gql`
    mutation AddStarredMessages($messageIDs: [String!]!) {
  addStarredMessages(messageIDs: $messageIDs) {
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
export type AddStarredMessagesMutationFn = Apollo.MutationFunction<AddStarredMessagesMutation, AddStarredMessagesMutationVariables>;

/**
 * __useAddStarredMessagesMutation__
 *
 * To run a mutation, you first call `useAddStarredMessagesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddStarredMessagesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addStarredMessagesMutation, { data, loading, error }] = useAddStarredMessagesMutation({
 *   variables: {
 *      messageIDs: // value for 'messageIDs'
 *   },
 * });
 */
export function useAddStarredMessagesMutation(baseOptions?: Apollo.MutationHookOptions<AddStarredMessagesMutation, AddStarredMessagesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddStarredMessagesMutation, AddStarredMessagesMutationVariables>(AddStarredMessagesDocument, options);
      }
export type AddStarredMessagesMutationHookResult = ReturnType<typeof useAddStarredMessagesMutation>;
export type AddStarredMessagesMutationResult = Apollo.MutationResult<AddStarredMessagesMutation>;
export type AddStarredMessagesMutationOptions = Apollo.BaseMutationOptions<AddStarredMessagesMutation, AddStarredMessagesMutationVariables>;
export const RemoveStarredMessagesDocument = gql`
    mutation RemoveStarredMessages($messageIDs: [String!]!) {
  removeStarredMessages(messageIDs: $messageIDs) {
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
export type RemoveStarredMessagesMutationFn = Apollo.MutationFunction<RemoveStarredMessagesMutation, RemoveStarredMessagesMutationVariables>;

/**
 * __useRemoveStarredMessagesMutation__
 *
 * To run a mutation, you first call `useRemoveStarredMessagesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveStarredMessagesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeStarredMessagesMutation, { data, loading, error }] = useRemoveStarredMessagesMutation({
 *   variables: {
 *      messageIDs: // value for 'messageIDs'
 *   },
 * });
 */
export function useRemoveStarredMessagesMutation(baseOptions?: Apollo.MutationHookOptions<RemoveStarredMessagesMutation, RemoveStarredMessagesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveStarredMessagesMutation, RemoveStarredMessagesMutationVariables>(RemoveStarredMessagesDocument, options);
      }
export type RemoveStarredMessagesMutationHookResult = ReturnType<typeof useRemoveStarredMessagesMutation>;
export type RemoveStarredMessagesMutationResult = Apollo.MutationResult<RemoveStarredMessagesMutation>;
export type RemoveStarredMessagesMutationOptions = Apollo.BaseMutationOptions<RemoveStarredMessagesMutation, RemoveStarredMessagesMutationVariables>;
export const AddStarredGroupMessagesDocument = gql`
    mutation AddStarredGroupMessages($groupMsgIDs: [String!]!) {
  addStarredGroupMessages(groupMsgIDs: $groupMsgIDs) {
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
export type AddStarredGroupMessagesMutationFn = Apollo.MutationFunction<AddStarredGroupMessagesMutation, AddStarredGroupMessagesMutationVariables>;

/**
 * __useAddStarredGroupMessagesMutation__
 *
 * To run a mutation, you first call `useAddStarredGroupMessagesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddStarredGroupMessagesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addStarredGroupMessagesMutation, { data, loading, error }] = useAddStarredGroupMessagesMutation({
 *   variables: {
 *      groupMsgIDs: // value for 'groupMsgIDs'
 *   },
 * });
 */
export function useAddStarredGroupMessagesMutation(baseOptions?: Apollo.MutationHookOptions<AddStarredGroupMessagesMutation, AddStarredGroupMessagesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddStarredGroupMessagesMutation, AddStarredGroupMessagesMutationVariables>(AddStarredGroupMessagesDocument, options);
      }
export type AddStarredGroupMessagesMutationHookResult = ReturnType<typeof useAddStarredGroupMessagesMutation>;
export type AddStarredGroupMessagesMutationResult = Apollo.MutationResult<AddStarredGroupMessagesMutation>;
export type AddStarredGroupMessagesMutationOptions = Apollo.BaseMutationOptions<AddStarredGroupMessagesMutation, AddStarredGroupMessagesMutationVariables>;
export const RemoveStarredGroupMessagesDocument = gql`
    mutation RemoveStarredGroupMessages($groupMsgIDs: [String!]!) {
  removeStarredGroupMessages(groupMsgIDs: $groupMsgIDs) {
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
export type RemoveStarredGroupMessagesMutationFn = Apollo.MutationFunction<RemoveStarredGroupMessagesMutation, RemoveStarredGroupMessagesMutationVariables>;

/**
 * __useRemoveStarredGroupMessagesMutation__
 *
 * To run a mutation, you first call `useRemoveStarredGroupMessagesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveStarredGroupMessagesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeStarredGroupMessagesMutation, { data, loading, error }] = useRemoveStarredGroupMessagesMutation({
 *   variables: {
 *      groupMsgIDs: // value for 'groupMsgIDs'
 *   },
 * });
 */
export function useRemoveStarredGroupMessagesMutation(baseOptions?: Apollo.MutationHookOptions<RemoveStarredGroupMessagesMutation, RemoveStarredGroupMessagesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveStarredGroupMessagesMutation, RemoveStarredGroupMessagesMutationVariables>(RemoveStarredGroupMessagesDocument, options);
      }
export type RemoveStarredGroupMessagesMutationHookResult = ReturnType<typeof useRemoveStarredGroupMessagesMutation>;
export type RemoveStarredGroupMessagesMutationResult = Apollo.MutationResult<RemoveStarredGroupMessagesMutation>;
export type RemoveStarredGroupMessagesMutationOptions = Apollo.BaseMutationOptions<RemoveStarredGroupMessagesMutation, RemoveStarredGroupMessagesMutationVariables>;
export const FetchUsersDocument = gql`
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

/**
 * __useFetchUsersQuery__
 *
 * To run a query within a React component, call `useFetchUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchUsersQuery(baseOptions?: Apollo.QueryHookOptions<FetchUsersQuery, FetchUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchUsersQuery, FetchUsersQueryVariables>(FetchUsersDocument, options);
      }
export function useFetchUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchUsersQuery, FetchUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchUsersQuery, FetchUsersQueryVariables>(FetchUsersDocument, options);
        }
export type FetchUsersQueryHookResult = ReturnType<typeof useFetchUsersQuery>;
export type FetchUsersLazyQueryHookResult = ReturnType<typeof useFetchUsersLazyQuery>;
export type FetchUsersQueryResult = Apollo.QueryResult<FetchUsersQuery, FetchUsersQueryVariables>;
export const FetchCurrentUserDocument = gql`
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

/**
 * __useFetchCurrentUserQuery__
 *
 * To run a query within a React component, call `useFetchCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<FetchCurrentUserQuery, FetchCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchCurrentUserQuery, FetchCurrentUserQueryVariables>(FetchCurrentUserDocument, options);
      }
export function useFetchCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchCurrentUserQuery, FetchCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchCurrentUserQuery, FetchCurrentUserQueryVariables>(FetchCurrentUserDocument, options);
        }
export type FetchCurrentUserQueryHookResult = ReturnType<typeof useFetchCurrentUserQuery>;
export type FetchCurrentUserLazyQueryHookResult = ReturnType<typeof useFetchCurrentUserLazyQuery>;
export type FetchCurrentUserQueryResult = Apollo.QueryResult<FetchCurrentUserQuery, FetchCurrentUserQueryVariables>;
export const FetchChatsDocument = gql`
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

/**
 * __useFetchChatsQuery__
 *
 * To run a query within a React component, call `useFetchChatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchChatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchChatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchChatsQuery(baseOptions?: Apollo.QueryHookOptions<FetchChatsQuery, FetchChatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchChatsQuery, FetchChatsQueryVariables>(FetchChatsDocument, options);
      }
export function useFetchChatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchChatsQuery, FetchChatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchChatsQuery, FetchChatsQueryVariables>(FetchChatsDocument, options);
        }
export type FetchChatsQueryHookResult = ReturnType<typeof useFetchChatsQuery>;
export type FetchChatsLazyQueryHookResult = ReturnType<typeof useFetchChatsLazyQuery>;
export type FetchChatsQueryResult = Apollo.QueryResult<FetchChatsQuery, FetchChatsQueryVariables>;
export const FetchMessagesDocument = gql`
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

/**
 * __useFetchMessagesQuery__
 *
 * To run a query within a React component, call `useFetchMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchMessagesQuery({
 *   variables: {
 *      recipient: // value for 'recipient'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      messageCount: // value for 'messageCount'
 *   },
 * });
 */
export function useFetchMessagesQuery(baseOptions: Apollo.QueryHookOptions<FetchMessagesQuery, FetchMessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchMessagesQuery, FetchMessagesQueryVariables>(FetchMessagesDocument, options);
      }
export function useFetchMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchMessagesQuery, FetchMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchMessagesQuery, FetchMessagesQueryVariables>(FetchMessagesDocument, options);
        }
export type FetchMessagesQueryHookResult = ReturnType<typeof useFetchMessagesQuery>;
export type FetchMessagesLazyQueryHookResult = ReturnType<typeof useFetchMessagesLazyQuery>;
export type FetchMessagesQueryResult = Apollo.QueryResult<FetchMessagesQuery, FetchMessagesQueryVariables>;
export const FetchGroupsDocument = gql`
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

/**
 * __useFetchGroupsQuery__
 *
 * To run a query within a React component, call `useFetchGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchGroupsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchGroupsQuery(baseOptions?: Apollo.QueryHookOptions<FetchGroupsQuery, FetchGroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchGroupsQuery, FetchGroupsQueryVariables>(FetchGroupsDocument, options);
      }
export function useFetchGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchGroupsQuery, FetchGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchGroupsQuery, FetchGroupsQueryVariables>(FetchGroupsDocument, options);
        }
export type FetchGroupsQueryHookResult = ReturnType<typeof useFetchGroupsQuery>;
export type FetchGroupsLazyQueryHookResult = ReturnType<typeof useFetchGroupsLazyQuery>;
export type FetchGroupsQueryResult = Apollo.QueryResult<FetchGroupsQuery, FetchGroupsQueryVariables>;
export const FetchGroupMsgsDocument = gql`
    query FetchGroupMsgs($groupID: String!, $offset: Int!, $limit: Int!, $messageCount: Int!) {
  fetchGroupMsgs(
    groupID: $groupID
    offset: $offset
    limit: $limit
    messageCount: $messageCount
  ) {
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

/**
 * __useFetchGroupMsgsQuery__
 *
 * To run a query within a React component, call `useFetchGroupMsgsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchGroupMsgsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchGroupMsgsQuery({
 *   variables: {
 *      groupID: // value for 'groupID'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      messageCount: // value for 'messageCount'
 *   },
 * });
 */
export function useFetchGroupMsgsQuery(baseOptions: Apollo.QueryHookOptions<FetchGroupMsgsQuery, FetchGroupMsgsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchGroupMsgsQuery, FetchGroupMsgsQueryVariables>(FetchGroupMsgsDocument, options);
      }
export function useFetchGroupMsgsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchGroupMsgsQuery, FetchGroupMsgsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchGroupMsgsQuery, FetchGroupMsgsQueryVariables>(FetchGroupMsgsDocument, options);
        }
export type FetchGroupMsgsQueryHookResult = ReturnType<typeof useFetchGroupMsgsQuery>;
export type FetchGroupMsgsLazyQueryHookResult = ReturnType<typeof useFetchGroupMsgsLazyQuery>;
export type FetchGroupMsgsQueryResult = Apollo.QueryResult<FetchGroupMsgsQuery, FetchGroupMsgsQueryVariables>;
export const FetchGroupDocument = gql`
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

/**
 * __useFetchGroupQuery__
 *
 * To run a query within a React component, call `useFetchGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchGroupQuery({
 *   variables: {
 *      groupID: // value for 'groupID'
 *   },
 * });
 */
export function useFetchGroupQuery(baseOptions: Apollo.QueryHookOptions<FetchGroupQuery, FetchGroupQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchGroupQuery, FetchGroupQueryVariables>(FetchGroupDocument, options);
      }
export function useFetchGroupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchGroupQuery, FetchGroupQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchGroupQuery, FetchGroupQueryVariables>(FetchGroupDocument, options);
        }
export type FetchGroupQueryHookResult = ReturnType<typeof useFetchGroupQuery>;
export type FetchGroupLazyQueryHookResult = ReturnType<typeof useFetchGroupLazyQuery>;
export type FetchGroupQueryResult = Apollo.QueryResult<FetchGroupQuery, FetchGroupQueryVariables>;
export const FetchUnreadGroupMsgsDocument = gql`
    query FetchUnreadGroupMsgs {
  fetchUnreadGroupMsgs {
    messageCount
    group
  }
}
    `;

/**
 * __useFetchUnreadGroupMsgsQuery__
 *
 * To run a query within a React component, call `useFetchUnreadGroupMsgsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchUnreadGroupMsgsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchUnreadGroupMsgsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchUnreadGroupMsgsQuery(baseOptions?: Apollo.QueryHookOptions<FetchUnreadGroupMsgsQuery, FetchUnreadGroupMsgsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchUnreadGroupMsgsQuery, FetchUnreadGroupMsgsQueryVariables>(FetchUnreadGroupMsgsDocument, options);
      }
export function useFetchUnreadGroupMsgsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchUnreadGroupMsgsQuery, FetchUnreadGroupMsgsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchUnreadGroupMsgsQuery, FetchUnreadGroupMsgsQueryVariables>(FetchUnreadGroupMsgsDocument, options);
        }
export type FetchUnreadGroupMsgsQueryHookResult = ReturnType<typeof useFetchUnreadGroupMsgsQuery>;
export type FetchUnreadGroupMsgsLazyQueryHookResult = ReturnType<typeof useFetchUnreadGroupMsgsLazyQuery>;
export type FetchUnreadGroupMsgsQueryResult = Apollo.QueryResult<FetchUnreadGroupMsgsQuery, FetchUnreadGroupMsgsQueryVariables>;
export const FetchGroupMessageCountDocument = gql`
    query FetchGroupMessageCount($groupID: String!) {
  fetchGroupMessageCount(groupID: $groupID) {
    count
  }
}
    `;

/**
 * __useFetchGroupMessageCountQuery__
 *
 * To run a query within a React component, call `useFetchGroupMessageCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchGroupMessageCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchGroupMessageCountQuery({
 *   variables: {
 *      groupID: // value for 'groupID'
 *   },
 * });
 */
export function useFetchGroupMessageCountQuery(baseOptions: Apollo.QueryHookOptions<FetchGroupMessageCountQuery, FetchGroupMessageCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchGroupMessageCountQuery, FetchGroupMessageCountQueryVariables>(FetchGroupMessageCountDocument, options);
      }
export function useFetchGroupMessageCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchGroupMessageCountQuery, FetchGroupMessageCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchGroupMessageCountQuery, FetchGroupMessageCountQueryVariables>(FetchGroupMessageCountDocument, options);
        }
export type FetchGroupMessageCountQueryHookResult = ReturnType<typeof useFetchGroupMessageCountQuery>;
export type FetchGroupMessageCountLazyQueryHookResult = ReturnType<typeof useFetchGroupMessageCountLazyQuery>;
export type FetchGroupMessageCountQueryResult = Apollo.QueryResult<FetchGroupMessageCountQuery, FetchGroupMessageCountQueryVariables>;
export const FetchStarredMsgsDocument = gql`
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

/**
 * __useFetchStarredMsgsQuery__
 *
 * To run a query within a React component, call `useFetchStarredMsgsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchStarredMsgsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchStarredMsgsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchStarredMsgsQuery(baseOptions?: Apollo.QueryHookOptions<FetchStarredMsgsQuery, FetchStarredMsgsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchStarredMsgsQuery, FetchStarredMsgsQueryVariables>(FetchStarredMsgsDocument, options);
      }
export function useFetchStarredMsgsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchStarredMsgsQuery, FetchStarredMsgsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchStarredMsgsQuery, FetchStarredMsgsQueryVariables>(FetchStarredMsgsDocument, options);
        }
export type FetchStarredMsgsQueryHookResult = ReturnType<typeof useFetchStarredMsgsQuery>;
export type FetchStarredMsgsLazyQueryHookResult = ReturnType<typeof useFetchStarredMsgsLazyQuery>;
export type FetchStarredMsgsQueryResult = Apollo.QueryResult<FetchStarredMsgsQuery, FetchStarredMsgsQueryVariables>;
export const FetchMessagesCountDocument = gql`
    query FetchMessagesCount($userIDs: [String!]!) {
  fetchMessagesCount(userIDs: $userIDs) {
    messageCount
    chatID
  }
}
    `;

/**
 * __useFetchMessagesCountQuery__
 *
 * To run a query within a React component, call `useFetchMessagesCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchMessagesCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchMessagesCountQuery({
 *   variables: {
 *      userIDs: // value for 'userIDs'
 *   },
 * });
 */
export function useFetchMessagesCountQuery(baseOptions: Apollo.QueryHookOptions<FetchMessagesCountQuery, FetchMessagesCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchMessagesCountQuery, FetchMessagesCountQueryVariables>(FetchMessagesCountDocument, options);
      }
export function useFetchMessagesCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchMessagesCountQuery, FetchMessagesCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchMessagesCountQuery, FetchMessagesCountQueryVariables>(FetchMessagesCountDocument, options);
        }
export type FetchMessagesCountQueryHookResult = ReturnType<typeof useFetchMessagesCountQuery>;
export type FetchMessagesCountLazyQueryHookResult = ReturnType<typeof useFetchMessagesCountLazyQuery>;
export type FetchMessagesCountQueryResult = Apollo.QueryResult<FetchMessagesCountQuery, FetchMessagesCountQueryVariables>;
export const FetchGroupMessagesCountDocument = gql`
    query FetchGroupMessagesCount {
  fetchGroupMessagesCount {
    messageCount
    groupID
  }
}
    `;

/**
 * __useFetchGroupMessagesCountQuery__
 *
 * To run a query within a React component, call `useFetchGroupMessagesCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchGroupMessagesCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchGroupMessagesCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchGroupMessagesCountQuery(baseOptions?: Apollo.QueryHookOptions<FetchGroupMessagesCountQuery, FetchGroupMessagesCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchGroupMessagesCountQuery, FetchGroupMessagesCountQueryVariables>(FetchGroupMessagesCountDocument, options);
      }
export function useFetchGroupMessagesCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchGroupMessagesCountQuery, FetchGroupMessagesCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchGroupMessagesCountQuery, FetchGroupMessagesCountQueryVariables>(FetchGroupMessagesCountDocument, options);
        }
export type FetchGroupMessagesCountQueryHookResult = ReturnType<typeof useFetchGroupMessagesCountQuery>;
export type FetchGroupMessagesCountLazyQueryHookResult = ReturnType<typeof useFetchGroupMessagesCountLazyQuery>;
export type FetchGroupMessagesCountQueryResult = Apollo.QueryResult<FetchGroupMessagesCountQuery, FetchGroupMessagesCountQueryVariables>;
export const AddNewMessageSubDocument = gql`
    subscription AddNewMessageSub($sender: String!, $recipient: String!) {
  addNewMessage(sender: $sender, recipient: $recipient) {
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

/**
 * __useAddNewMessageSubSubscription__
 *
 * To run a query within a React component, call `useAddNewMessageSubSubscription` and pass it any options that fit your needs.
 * When your component renders, `useAddNewMessageSubSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAddNewMessageSubSubscription({
 *   variables: {
 *      sender: // value for 'sender'
 *      recipient: // value for 'recipient'
 *   },
 * });
 */
export function useAddNewMessageSubSubscription(baseOptions: Apollo.SubscriptionHookOptions<AddNewMessageSubSubscription, AddNewMessageSubSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<AddNewMessageSubSubscription, AddNewMessageSubSubscriptionVariables>(AddNewMessageSubDocument, options);
      }
export type AddNewMessageSubSubscriptionHookResult = ReturnType<typeof useAddNewMessageSubSubscription>;
export type AddNewMessageSubSubscriptionResult = Apollo.SubscriptionResult<AddNewMessageSubSubscription>;
export const AddNewChatSubDocument = gql`
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
      chatID
      read
      createdAt
      deleted
      starredBy
      chatID
    }
  }
}
    `;

/**
 * __useAddNewChatSubSubscription__
 *
 * To run a query within a React component, call `useAddNewChatSubSubscription` and pass it any options that fit your needs.
 * When your component renders, `useAddNewChatSubSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAddNewChatSubSubscription({
 *   variables: {
 *      userID: // value for 'userID'
 *   },
 * });
 */
export function useAddNewChatSubSubscription(baseOptions: Apollo.SubscriptionHookOptions<AddNewChatSubSubscription, AddNewChatSubSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<AddNewChatSubSubscription, AddNewChatSubSubscriptionVariables>(AddNewChatSubDocument, options);
      }
export type AddNewChatSubSubscriptionHookResult = ReturnType<typeof useAddNewChatSubSubscription>;
export type AddNewChatSubSubscriptionResult = Apollo.SubscriptionResult<AddNewChatSubSubscription>;
export const AddNewGroupSubDocument = gql`
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

/**
 * __useAddNewGroupSubSubscription__
 *
 * To run a query within a React component, call `useAddNewGroupSubSubscription` and pass it any options that fit your needs.
 * When your component renders, `useAddNewGroupSubSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAddNewGroupSubSubscription({
 *   variables: {
 *      userID: // value for 'userID'
 *   },
 * });
 */
export function useAddNewGroupSubSubscription(baseOptions: Apollo.SubscriptionHookOptions<AddNewGroupSubSubscription, AddNewGroupSubSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<AddNewGroupSubSubscription, AddNewGroupSubSubscriptionVariables>(AddNewGroupSubDocument, options);
      }
export type AddNewGroupSubSubscriptionHookResult = ReturnType<typeof useAddNewGroupSubSubscription>;
export type AddNewGroupSubSubscriptionResult = Apollo.SubscriptionResult<AddNewGroupSubSubscription>;
export const AddNewGroupMsgSubDocument = gql`
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

/**
 * __useAddNewGroupMsgSubSubscription__
 *
 * To run a query within a React component, call `useAddNewGroupMsgSubSubscription` and pass it any options that fit your needs.
 * When your component renders, `useAddNewGroupMsgSubSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAddNewGroupMsgSubSubscription({
 *   variables: {
 *      groupID: // value for 'groupID'
 *   },
 * });
 */
export function useAddNewGroupMsgSubSubscription(baseOptions: Apollo.SubscriptionHookOptions<AddNewGroupMsgSubSubscription, AddNewGroupMsgSubSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<AddNewGroupMsgSubSubscription, AddNewGroupMsgSubSubscriptionVariables>(AddNewGroupMsgSubDocument, options);
      }
export type AddNewGroupMsgSubSubscriptionHookResult = ReturnType<typeof useAddNewGroupMsgSubSubscription>;
export type AddNewGroupMsgSubSubscriptionResult = Apollo.SubscriptionResult<AddNewGroupMsgSubSubscription>;
export const UpdateUserOnlineSubDocument = gql`
    subscription UpdateUserOnlineSub {
  updateUserOnline {
    userID
    online
  }
}
    `;

/**
 * __useUpdateUserOnlineSubSubscription__
 *
 * To run a query within a React component, call `useUpdateUserOnlineSubSubscription` and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserOnlineSubSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUpdateUserOnlineSubSubscription({
 *   variables: {
 *   },
 * });
 */
export function useUpdateUserOnlineSubSubscription(baseOptions?: Apollo.SubscriptionHookOptions<UpdateUserOnlineSubSubscription, UpdateUserOnlineSubSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<UpdateUserOnlineSubSubscription, UpdateUserOnlineSubSubscriptionVariables>(UpdateUserOnlineSubDocument, options);
      }
export type UpdateUserOnlineSubSubscriptionHookResult = ReturnType<typeof useUpdateUserOnlineSubSubscription>;
export type UpdateUserOnlineSubSubscriptionResult = Apollo.SubscriptionResult<UpdateUserOnlineSubSubscription>;
export const UpdateUserTypingSubDocument = gql`
    subscription UpdateUserTypingSub($chatID: String!) {
  updateUserTyping(chatID: $chatID) {
    chatID
    typing
    typingUserID
  }
}
    `;

/**
 * __useUpdateUserTypingSubSubscription__
 *
 * To run a query within a React component, call `useUpdateUserTypingSubSubscription` and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserTypingSubSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUpdateUserTypingSubSubscription({
 *   variables: {
 *      chatID: // value for 'chatID'
 *   },
 * });
 */
export function useUpdateUserTypingSubSubscription(baseOptions: Apollo.SubscriptionHookOptions<UpdateUserTypingSubSubscription, UpdateUserTypingSubSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<UpdateUserTypingSubSubscription, UpdateUserTypingSubSubscriptionVariables>(UpdateUserTypingSubDocument, options);
      }
export type UpdateUserTypingSubSubscriptionHookResult = ReturnType<typeof useUpdateUserTypingSubSubscription>;
export type UpdateUserTypingSubSubscriptionResult = Apollo.SubscriptionResult<UpdateUserTypingSubSubscription>;
export const UpdateGroupTypingSubDocument = gql`
    subscription UpdateGroupTypingSub($groupID: String!) {
  updateGroupTyping(groupID: $groupID) {
    groupID
    typing
    typingUserID
  }
}
    `;

/**
 * __useUpdateGroupTypingSubSubscription__
 *
 * To run a query within a React component, call `useUpdateGroupTypingSubSubscription` and pass it any options that fit your needs.
 * When your component renders, `useUpdateGroupTypingSubSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUpdateGroupTypingSubSubscription({
 *   variables: {
 *      groupID: // value for 'groupID'
 *   },
 * });
 */
export function useUpdateGroupTypingSubSubscription(baseOptions: Apollo.SubscriptionHookOptions<UpdateGroupTypingSubSubscription, UpdateGroupTypingSubSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<UpdateGroupTypingSubSubscription, UpdateGroupTypingSubSubscriptionVariables>(UpdateGroupTypingSubDocument, options);
      }
export type UpdateGroupTypingSubSubscriptionHookResult = ReturnType<typeof useUpdateGroupTypingSubSubscription>;
export type UpdateGroupTypingSubSubscriptionResult = Apollo.SubscriptionResult<UpdateGroupTypingSubSubscription>;
export const UpdateReadMessagesSubDocument = gql`
    subscription UpdateReadMessagesSub($sender: String!, $recipient: String!) {
  updateReadMessages(sender: $sender, recipient: $recipient) {
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

/**
 * __useUpdateReadMessagesSubSubscription__
 *
 * To run a query within a React component, call `useUpdateReadMessagesSubSubscription` and pass it any options that fit your needs.
 * When your component renders, `useUpdateReadMessagesSubSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUpdateReadMessagesSubSubscription({
 *   variables: {
 *      sender: // value for 'sender'
 *      recipient: // value for 'recipient'
 *   },
 * });
 */
export function useUpdateReadMessagesSubSubscription(baseOptions: Apollo.SubscriptionHookOptions<UpdateReadMessagesSubSubscription, UpdateReadMessagesSubSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<UpdateReadMessagesSubSubscription, UpdateReadMessagesSubSubscriptionVariables>(UpdateReadMessagesSubDocument, options);
      }
export type UpdateReadMessagesSubSubscriptionHookResult = ReturnType<typeof useUpdateReadMessagesSubSubscription>;
export type UpdateReadMessagesSubSubscriptionResult = Apollo.SubscriptionResult<UpdateReadMessagesSubSubscription>;