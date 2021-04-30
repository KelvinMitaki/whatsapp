export interface Chat {
  _id: string;
  sender: {
    _id: string;
    name: string;
  };
  recipient: {
    _id: string;
    name: string;
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
    groupProfilePhoto: string;
    message: string;
  };
  createdAt: string;
}
