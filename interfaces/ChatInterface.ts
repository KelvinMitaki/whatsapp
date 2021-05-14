import { GroupMsg } from "./GroupInterface";

export interface Chat {
  _id: string;
  sender: {
    _id: string;
    name: string;
    online: boolean;
    typing: boolean;
    lastSeen: string;
  };
  recipient: {
    _id: string;
    name: string;
    online: boolean;
    typing: boolean;
    lastSeen: string;
  };
  message: string;
  createdAt: string;
  updatedAt: string;
  unread: number;
  type: "message" | "broadcast";
}

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

export interface UserOnline {
  userID: string;
  online: boolean;
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
