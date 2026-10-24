export interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
  createdAt: string;
  updatedAt: string;
}
export interface NewNote {
  title: string;
  content: string;
  tag: string;
}

export interface User {
  username: string;
  email: string;
  avatar: string;
}
