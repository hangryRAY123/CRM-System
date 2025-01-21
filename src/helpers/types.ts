export enum TabKeys {
  all = 'all',
  completed = 'completed',
  inWork = 'inWork',
}

export type AllTask = {
  id: number;
  title: string;
  created: string;
  isDone: boolean;
};

export type TasksInfo = {
  all: number;
  completed: number;
  inWork: number;
};

export type UserRegistration = {
  email: string;
  login: string;
  password: string;
  phoneNumber: string;
  username: string;
};

export type AuthData = {
  login: string;
  password: string;
};

export type RefreshToken = {
  refreshToken: string;
};

export type Profile = {
  date: string;
  email: string;
  id: number;
  isAdmin: boolean;
  isBlocked: boolean;
  phoneNumber: string;
  username: string;
};

export type ProfileRequest = {
  username: string;
  email: string;
  phoneNumber: string;
};

export type User = {
  id: number;
  username: string;
  email: string;
  date: string;
  isBlocked: boolean;
  roles: string[];
  phoneNumber: string;
};
