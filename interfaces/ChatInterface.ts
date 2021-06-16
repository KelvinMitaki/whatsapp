import { GroupMsg } from './GroupInterface';

export interface CurrentUser {
  _id: string;
  name: string;
  about: string;
  phoneNumber: number;
  countryCode: string;
  profilePhoto: string | null;
  groups: {
    _id: string;
    name: string;
    groupProfilePhoto: string | null;
  }[];
  createdAt: string;
}

export interface User {
  _id: string;
  name: string;
  phoneNumber: number;
  about: string;
  countryCode: string;
  profilePhoto: string | null;
  groups: {
    _id: string;
  }[];
  createdAt: string;
}

export interface MessageInterface {
  _id: string;
  sender: string;
  recipient: string;
  message: string;
  read: boolean;
  createdAt: string;
  starredBy: string[];
  deleted: boolean;
}

export interface UserTyping {
  chatID: string;
  typingUserID: string;
  typing: boolean;
}

export interface StarredMessagesInterface {
  messages: MessageInterface[];
  groupMsgs: GroupMsg[];
}

export interface MessageCountInterface {
  messageCount: number;
  chatID: string;
}
