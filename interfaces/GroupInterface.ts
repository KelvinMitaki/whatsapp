export interface Group {
  _id: string;
  admin: string;
  createdAt: string;
  description: string | null;
  message: GroupMsg | null;
  name: string;
  participants: string[];
}

export interface GroupMsg {
  _id: string;
  sender: string;
  message: string;
  group: string;
  read: string;
  deleted: string;
  received: string;
  createdAt: string;
}
