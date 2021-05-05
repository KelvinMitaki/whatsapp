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
  sender: {
    _id: string;
    name: string;
    countryCode: string;
    phoneNumber: number;
  };
  message: string;
  group: string;
  read: string;
  deleted: string;
  received: string;
  createdAt: string;
}
