import { User } from "./ChatInterface";

export interface Group {
  _id: string;
  admin: string;
  createdAt: string;
  description: string | null;
  message: GroupMsg | null;
  name: string;
  participants: string[];
}
export interface GroupWithParticipants {
  _id: string;
  admin: string;
  createdAt: string;
  description: string | null;
  name: string;
  participants: User[];
}

export interface GroupMsg {
  _id: string;
  sender: {
    _id: string;
    name: string;
    countryCode: string;
    phoneNumber: number;
  };
  message: string;
  group: string;
  read: string[];
  deleted: string;
  received: string[];
  createdAt: string;
  starredBy: string[];
}

export interface UnreadGroupMsg {
  group: string;
  messageCount: number;
}

export interface GroupUserTyping {
  groupID: string;
  typingUserID: string;
  typing: boolean;
}
